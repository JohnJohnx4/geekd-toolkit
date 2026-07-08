create or replace view public.loot_customer_summary
with (security_invoker = true) as
select
  c.id,
  c.name,
  c.phone,
  c.government_id_number,
  c.notes,
  c.created_at,
  c.updated_at,
  count(tx.id)::integer as buy_count,
  count(tx.id) filter (
    where tx.contact_status is distinct from 'picked_up'
      and tx.customer_decision is distinct from 'declined'
  )::integer as open_buy_count,
  max(tx.transaction_date) as latest_buy_date
from public.loot_customers c
left join public.loot_buy_transactions tx on tx.customer_id = c.id
group by c.id;

notify pgrst, 'reload schema';
