-- The editing test, as a view (see docs/fashion-virus-dilemma-cards.md):
-- a dilemma card is working when choices split near the middle.
-- 80%+ consensus = a lecture wearing a costume; rewrite it.
--
-- security_invoker so the view respects RLS: anon (write-only) sees nothing;
-- query it from the dashboard / service role.

create view public.card_choice_splits
  with (security_invoker = true) as
select
  card_id,
  choice_id,
  count(*) as picks,
  round(100.0 * count(*) / sum(count(*)) over (partition by card_id), 1) as pct
from public.run_events
where event_type = 'choice'
group by card_id, choice_id
order by card_id, pct desc;
