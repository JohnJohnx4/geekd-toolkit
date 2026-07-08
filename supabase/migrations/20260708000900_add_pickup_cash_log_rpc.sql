alter table public.loot_safe_cash_entries
  add column if not exists buy_transaction_id uuid
    references public.loot_buy_transactions(id) on delete set null;

create unique index if not exists loot_safe_cash_entries_buy_transaction_id_idx
  on public.loot_safe_cash_entries (buy_transaction_id)
  where buy_transaction_id is not null;

create or replace function public.complete_loot_buy_pickup(
  p_transaction_id uuid,
  p_actor_label text
)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_summary public.loot_buy_transaction_summary%rowtype;
  v_amount numeric(12, 2);
begin
  if auth.role() <> 'authenticated' then
    raise exception 'Authentication is required to complete buy pickups.';
  end if;

  select *
    into v_summary
  from public.loot_buy_transaction_summary
  where id = p_transaction_id;

  if v_summary.id is null then
    raise exception 'Buy transaction % was not found.', p_transaction_id;
  end if;

  v_amount := coalesce(v_summary.total_cash_offer, 0);

  if v_amount <= 0 then
    raise exception 'Buy transaction % does not have a payout amount to log.', p_transaction_id;
  end if;

  update public.loot_buy_transactions
  set
    cash_ready = true,
    contact_status = 'picked_up',
    customer_decision = 'accepted',
    is_in_progress = false,
    decision_recorded_at = coalesce(decision_recorded_at, now()),
    updated_at = now()
  where id = p_transaction_id;

  insert into public.loot_safe_cash_entries (
    staff_label,
    entry_at,
    direction,
    amount,
    reason,
    notes,
    buy_transaction_id
  )
  values (
    nullif(trim(coalesce(p_actor_label, '')), ''),
    now(),
    'out',
    v_amount,
    'Buy',
    concat(
      'Customer buy payout for ',
      v_summary.customer_name,
      case
        when v_summary.customer_phone is not null
        then concat(' (', v_summary.customer_phone, ')')
        else ''
      end
    ),
    p_transaction_id
  )
  on conflict (buy_transaction_id)
  where buy_transaction_id is not null
  do nothing;

  insert into public.loot_activity_events (
    action,
    description,
    actor_label,
    customer_id,
    buy_transaction_id,
    metadata
  )
  values (
    'pickup_completed',
    v_summary.customer_name || ' picked up their payment',
    nullif(trim(coalesce(p_actor_label, '')), ''),
    v_summary.customer_id,
    p_transaction_id,
    jsonb_build_object(
      'cash_log_direction', 'out',
      'cash_log_reason', 'Buy',
      'cash_log_amount', v_amount
    )
  );
end;
$$;

grant execute on function public.complete_loot_buy_pickup(uuid, text) to authenticated;

notify pgrst, 'reload schema';
