create or replace function public.update_loot_customer_with_event(
  p_customer_id uuid,
  p_name text,
  p_phone text,
  p_government_id_number text,
  p_notes text,
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
begin
  if auth.role() <> 'authenticated' then
    raise exception 'Authentication is required to edit customers.';
  end if;

  if length(trim(coalesce(p_name, ''))) = 0 then
    raise exception 'Customer name is required.';
  end if;

  select to_jsonb(summary.*)
    into v_before
  from public.loot_customer_summary summary
  where summary.id = p_customer_id;

  if v_before is null then
    raise exception 'Customer % was not found.', p_customer_id;
  end if;

  update public.loot_customers
  set
    name = trim(p_name),
    phone = nullif(regexp_replace(coalesce(p_phone, ''), '\D', '', 'g'), ''),
    government_id_number = nullif(trim(coalesce(p_government_id_number, '')), ''),
    notes = nullif(trim(coalesce(p_notes, '')), ''),
    updated_at = now()
  where id = p_customer_id;

  select to_jsonb(summary.*)
    into v_after
  from public.loot_customer_summary summary
  where summary.id = p_customer_id;

  insert into public.loot_activity_events (
    action,
    description,
    actor_label,
    customer_id,
    metadata
  )
  values (
    'customer_edited',
    'Customer edited',
    nullif(trim(coalesce(p_actor_label, '')), ''),
    p_customer_id,
    jsonb_build_object(
      'before', v_before,
      'after', v_after
    )
  );
end;
$$;

grant execute on function public.update_loot_customer_with_event(
  uuid,
  text,
  text,
  text,
  text,
  text
) to authenticated;

notify pgrst, 'reload schema';
