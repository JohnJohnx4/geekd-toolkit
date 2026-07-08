create or replace function public.update_loot_buy_transaction_with_event(
  p_transaction_id uuid,
  p_customer_name text,
  p_customer_phone text,
  p_transaction_date date,
  p_buy_type text,
  p_appraised_value numeric,
  p_cash_offer numeric,
  p_bulk_appraised_value numeric,
  p_bulk_cash_offer numeric,
  p_notes text,
  p_is_in_progress boolean,
  p_cash_ready boolean,
  p_contact_status text,
  p_customer_decision text,
  p_edit_reason text,
  p_actor_label text
)
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_before jsonb;
  v_after jsonb;
  v_customer_id uuid;
begin
  if auth.role() <> 'authenticated' then
    raise exception 'Authentication is required to edit buy transactions.';
  end if;

  if length(trim(coalesce(p_edit_reason, ''))) = 0 then
    raise exception 'An edit reason is required.';
  end if;

  select to_jsonb(summary.*)
    into v_before
  from public.loot_buy_transaction_summary summary
  where summary.id = p_transaction_id;

  if v_before is null then
    raise exception 'Buy transaction % was not found.', p_transaction_id;
  end if;

  v_customer_id := (v_before ->> 'customer_id')::uuid;

  update public.loot_customers
  set
    name = trim(p_customer_name),
    phone = nullif(regexp_replace(coalesce(p_customer_phone, ''), '\D', '', 'g'), ''),
    updated_at = now()
  where id = v_customer_id;

  update public.loot_buy_transactions
  set
    transaction_date = p_transaction_date,
    buy_type = trim(p_buy_type),
    appraised_value = coalesce(p_appraised_value, 0),
    cash_offer = coalesce(p_cash_offer, 0),
    bulk_appraised_value = coalesce(p_bulk_appraised_value, 0),
    bulk_cash_offer = coalesce(p_bulk_cash_offer, 0),
    notes = nullif(trim(coalesce(p_notes, '')), ''),
    is_in_progress = p_is_in_progress,
    cash_ready = p_cash_ready,
    contact_status = p_contact_status,
    customer_decision = p_customer_decision,
    pricing_completed_at = case
      when coalesce(p_appraised_value, 0) > 0
        or coalesce(p_bulk_appraised_value, 0) > 0
      then coalesce(pricing_completed_at, now())
      else pricing_completed_at
    end,
    decision_recorded_at = case
      when p_customer_decision is not null
      then coalesce(decision_recorded_at, now())
      else decision_recorded_at
    end,
    updated_at = now()
  where id = p_transaction_id;

  select to_jsonb(summary.*)
    into v_after
  from public.loot_buy_transaction_summary summary
  where summary.id = p_transaction_id;

  insert into public.loot_activity_events (
    action,
    description,
    actor_label,
    customer_id,
    buy_transaction_id,
    metadata
  )
  values (
    'buy_transaction_edited',
    'Buy transaction edited: ' || trim(p_edit_reason),
    nullif(trim(coalesce(p_actor_label, '')), ''),
    v_customer_id,
    p_transaction_id,
    jsonb_build_object(
      'reason', trim(p_edit_reason),
      'before', v_before,
      'after', v_after
    )
  );
end;
$$;

grant execute on function public.update_loot_buy_transaction_with_event(
  uuid,
  text,
  text,
  date,
  text,
  numeric,
  numeric,
  numeric,
  numeric,
  text,
  boolean,
  boolean,
  text,
  text,
  text,
  text
) to authenticated;

notify pgrst, 'reload schema';
