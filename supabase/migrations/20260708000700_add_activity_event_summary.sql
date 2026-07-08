create or replace view public.loot_activity_event_summary
with (security_invoker = true) as
select
  events.id,
  events.action,
  events.description,
  events.actor_user_id,
  events.actor_label,
  events.customer_id,
  customers.name as customer_name,
  events.buy_transaction_id,
  events.card_show_transaction_id,
  events.metadata,
  events.created_at
from public.loot_activity_events events
left join public.loot_customers customers on customers.id = events.customer_id;

notify pgrst, 'reload schema';
