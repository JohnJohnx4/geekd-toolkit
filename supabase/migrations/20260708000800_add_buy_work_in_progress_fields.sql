alter table public.loot_buy_transactions
  add column if not exists priced_card_count integer not null default 0
    check (priced_card_count >= 0),
  add column if not exists pricing_notes text;

drop view if exists public.loot_buy_transaction_summary;

create or replace view public.loot_buy_transaction_summary
with (security_invoker = true) as
select
  tx.id,
  tx.transaction_date,
  tx.submitted_at,
  tx.buy_type,
  tx.appraised_value,
  tx.cash_offer,
  tx.bulk_appraised_value,
  tx.bulk_cash_offer,
  tx.total_appraised_value,
  tx.total_cash_offer,
  tx.payout_percentage,
  tx.store_margin,
  tx.check_number,
  tx.notes,
  tx.priced_card_count,
  tx.pricing_notes,
  tx.is_in_progress,
  tx.cash_ready,
  tx.contact_status,
  tx.customer_decision,
  tx.intake_completed_at,
  tx.pricing_completed_at,
  tx.decision_recorded_at,
  c.id as customer_id,
  c.name as customer_name,
  c.phone as customer_phone,
  c.government_id_number as customer_id_number,
  coalesce(
    array_agg(distinct accepted.staff_id) filter (where accepted.staff_id is not null),
    array[]::uuid[]
  ) as accepted_by_staff_ids,
  coalesce(
    array_agg(distinct priced.staff_id) filter (where priced.staff_id is not null),
    array[]::uuid[]
  ) as priced_by_staff_ids,
  coalesce(
    array_agg(distinct purchaser.staff_id) filter (where purchaser.staff_id is not null),
    array[]::uuid[]
  ) as purchaser_staff_ids,
  coalesce(
    array_agg(distinct photos.public_url) filter (where photos.public_url is not null),
    array[]::text[]
  ) as photo_urls
from public.loot_buy_transactions tx
join public.loot_customers c on c.id = tx.customer_id
left join public.loot_buy_transaction_staff accepted
  on accepted.transaction_id = tx.id and accepted.role = 'accepted_by'
left join public.loot_buy_transaction_staff priced
  on priced.transaction_id = tx.id and priced.role = 'priced_by'
left join public.loot_buy_transaction_staff purchaser
  on purchaser.transaction_id = tx.id and purchaser.role = 'purchaser'
left join public.loot_buy_transaction_photos tx_photos
  on tx_photos.transaction_id = tx.id
left join public.loot_photos photos on photos.id = tx_photos.photo_id
group by tx.id, c.id;

notify pgrst, 'reload schema';
