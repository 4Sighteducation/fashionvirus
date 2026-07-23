# FASHION VIRUS — 30-card seed corpus
### Game data + card artwork prompts

**How this file works.** Each card carries its game data (offer, options, effects, fuse, whisper) in the format Cursor converts straight into `cards.ts`, plus an **ART** line — a Flow prompt for the image that appears on the card when it pops up. Effects are first-pass balance numbers; tune in playtesting. `V:` = visible effects the player sees, `H:` = hidden ledger effects they don't.

**Card art style token — append to every ART prompt:**
> shot on medium format camera, high-fashion editorial photography, clean studio or location lighting, muted luxury palette with one saturated accent, shallow depth of field, no text, no logos, no faces in close-up, 4:3 crop, photorealistic

The card art lives in the glossy Act 1 register — seductive product photography. The wrongness stays *out* of the art and *in* the mechanics, with the few marked exceptions where a subtle tell is the point.

---

## MATERIALS (7)

**01 · dye_signature_colour** — from BEDROOM
Offer: The dye house sends swatches. The reactive crimson is extraordinary — it photographs like nothing else and will sell itself. The low-impact alternative is softer, chalkier.
A) Take the saturated colour → V: +12 heat, +£8k rev · H: 2M L water polluted · FUSE: toxic_discharge · WHISPER: "The river below the mill is running an unusual colour this week."
B) Low-impact dye → V: +3 heat, +£2k rev, −£4k cap · H: 0.4M L water used
DEPTH (1 turn): The colour is achieved with heavy metals; the wastewater is untreated. The mill has been fined twice — both fines cheaper than treatment.
ART: extreme close-up of liquid crimson dye rippling in a steel vat, glossy surface reflection, jewel-like saturation

**02 · leather_sourcing** — from INDIE
Offer: Your bestseller needs leather. One tannery's price you can't ignore; vegetable-tanned costs triple; the synthetic will be called plastic.
A) Cheap chrome leather → V: +£14k rev · H: 1.5M L polluted, 40 ha land, 90t CO₂ · FUSE: supply_chain_opacity
B) Vegetable-tanned, traceable → V: +£5k rev, −£12k cap, +6 heat · H: 20t CO₂
C) Synthetic → V: +£9k rev, −4 heat · H: 300kg microplastics
DEPTH: Chromium salts in the water table; cattle on newly cleared land. Nobody in the chain will confirm provenance, and nobody is asking.
ART: a single exquisite tan leather jacket on a wooden hanger against raw concrete, soft window light

**03 · polyester_blend** — from BEDROOM
Offer: Virgin polyester is cheap, drapes beautifully, never creases. Recycled costs more and the colour varies. Organic cotton costs more still — and drinks water.
A) Virgin polyester → V: +£7k rev · H: 800kg microplastics, 60t CO₂ · WHISPER: "A customer emails: the fabric feels 'a bit plasticky'. You archive it."
B) Recycled polyester → V: +£4k rev, +4 heat, −£2k cap · H: 500kg microplastics
C) Organic cotton → V: +£3k rev, +8 heat, −£6k cap · H: 2.6M L water, 15 ha land
ART: bolts of flowing fabric mid-air in a studio, frozen in motion, silvery drape catching light

**04 · viscose_forest** — from INDIE
Offer: A viscose supplier offers a silk-soft feel at a cotton price. "Plant-based," the brochure says, over a photograph of leaves.
A) Take it → V: +£10k rev, +6 heat · H: 25 ha land, 1M L polluted · FUSE: supply_chain_opacity
B) Certified closed-loop lyocell instead → V: +£4k rev, −£7k cap, +4 heat · H: minimal
DEPTH: The pulp is dissolved with carbon disulphide. Workers at the plant report neurological symptoms. The forest in the brochure is not the forest being cut.
ART: silk-like sage-green fabric cascading over a plinth, botanical shadow play on the backdrop

**05 · sandblasted_denim** — from HIGH_STREET
Offer: The distressed finish is the look of the season. Sandblasting delivers it at scale for pennies. Laser finishing needs new machinery.
A) Sandblast → V: +£12k rev, +9 heat · H: 40k poverty-wage hrs, worker lung exposure · FUSE: worker_grievance · WHISPER: "A finishing-house invoice includes a line for 'respiratory PPE'. It is very small."
B) Invest in laser finishing → V: −£30k cap, +£6k rev · H: none
ART: perfectly faded denim jeans laid flat, sculptural creases, dust motes in a shaft of light *(the dust is the tell)*

**06 · angora_moment** — from HIGH_STREET
Offer: A single knit goes viral — the softness is the story. Angora at volume is suddenly very available and very cheap.
A) Scale the knit → V: +£15k rev, +14 heat · H: animal welfare exposure · FUSE: undisclosed_animal_research
B) Switch to brushed lambswool, keep the silhouette → V: +£7k rev, −£4k cap · H: minor
DEPTH: The volume price exists because the fibre is plucked, not sheared. There is footage. It has not surfaced. Yet.
ART: an impossibly soft pale knit sweater on a stone surface, single strand of fibre lifting in air

**07 · deadstock_find** — from BEDROOM
Offer: A mill closure floods the market with gorgeous deadstock fabric — limited, characterful, effectively free of new impact. But quantities are fixed: no reorders, ever.
A) Build a collection on deadstock → V: +8 heat, +£5k rev, novelty +10 · H: none — genuinely
B) Pass; you need repeatable supply → V: none · H: none
ART: shelves of assorted vintage fabric rolls in unrepeatable colours, archive-room stillness
*(NOTE: this is a "sometimes the decent thing pays" card — deliberately no downside.)*

---

## MANUFACTURING (6)

**08 · offshore_decision** — from INDIE
Offer: An agent offers a unit price a third of what you pay now. The factory is accredited. The photographs look clean.
A) Sign → V: +£22k rev, +6 share · H: 180k poverty-wage hrs, 140t CO₂ · FUSE: supply_chain_opacity · WHISPER: "Your agent is slow to answer which factory made the last run."
B) Visit the factory yourself first → V: −£3k cap, costs the turn · reveals depth free
C) Stay local, small-batch → V: +£4k rev, −£5k cap, +5 heat · H: 15t CO₂
DEPTH: The accreditation covers the primary site. Overflow is subcontracted to unaudited units during peak season — which is most of the year.
ART: a pristine factory floor of white sewing stations receding in one-point perspective, empty of people

**09 · piecework_pay** — from INDIE
Offer: Li Pengjian proposes paying per garment. Productivity jumps. He mentions, in passing, that Yan Rong and Yao Lin — older, slower, the best work in the building — will earn less.
A) Switch to piecework → V: +£11k rev · H: 60k poverty-wage hrs · FUSE: worker_grievance · WHISPER: "Li Pengjian asks whether you might meet the workers to discuss the pay structure."
B) Meet the workers; offer them tea → V: +£13k rev, +3 heat · H: none *(the World Factory card: the decent thing pays more)*
C) Simply raise pay a little → V: +£6k rev, −£3k cap · H: none
ART: two tin cups of tea steaming on a workbench beside folded garments, warm side light

**10 · the_deadline** — from HIGH_STREET
Offer: The retailer moves your delivery date up three weeks. Miss it and lose the account. The factory says it's possible — "with overtime."
A) Take the overtime → V: +£16k rev, +4 share · H: 90k excess hrs · FUSE: worker_grievance
B) Negotiate a partial delivery → V: +£6k rev, −3 heat · H: none
C) Refuse; lose the account → V: −£12k rev, −5 share · H: none
ART: a loading bay at dusk, sealed boxes stacked to the ceiling, one strip light flickering

**11 · air_freight** — from HIGH_STREET
Offer: Sea freight lands the drop three weeks after the campaign breaks. Air lands it on time. Nobody will ever see the difference.
A) Fly it → V: +£16k rev, +8 heat, −£25k cap · H: 340t CO₂
B) Move the campaign, ship by sea → V: −6 heat, novelty −12 · H: 18t CO₂
ART: aircraft cargo hold interior stacked with shrink-wrapped garment cartons, cold blue light

**12 · the_audit** — from HIGH_STREET
Offer: A buyer requires a social audit of your supply chain. Your agent offers to "arrange the paperwork" for a fee. A genuine audit costs five times more and might find things.
A) Arrange the paperwork → V: −£4k cap, deal proceeds · H: opacity deepens · FUSE: supply_chain_opacity
B) Commission the real audit → V: −£20k cap, costs a turn · reveals ALL currently planted supply-chain fuses to the player
ART: a thick document bound in white, embossed cover, on a glass desk — pristine, unopened

**13 · factory_fire_warning** — from GLOBAL
Offer: A worker at a subcontracted unit writes to you directly. The building has one exit. She has attached a photograph. She has cc'd nobody.
A) Forward to the agent; move on → V: none · H: +1 incident risk · FUSE: worker_grievance (high severity) · WHISPER: "You never hear back about the email."
B) Halt production; audit the site → V: −£60k cap, −£30k rev, novelty −20 · H: none
ART: a phone face-down on a marble desk beside an espresso, notification light glowing *(the wrongness is what's ignored)*

---

## VOLUME — the novelty trap (4)

**14 · novelty_pressure** — from INDIE
Offer: Engagement is falling. The comments are one sentence, over and over: *when's the next drop?* Your collection is four weeks old. Four weeks is a long time.
A) Weekly micro-drops → V: novelty +40, +£18k rev, +10 heat · H: 12t waste, 80t CO₂ · WHISPER: "Warehouse flags last month's stock hasn't moved. You approve a markdown."
B) Hold: two collections a year → V: novelty −10, −£4k rev, −6 heat · H: none
C) Launch repair & resale instead → V: novelty +12, +£2k rev, −£8k cap, +7 heat · H: none
ART: a phone screen glow on a dark bedroom ceiling at 2am *(shot from below, screen unreadable)*

**15 · the_collab** — from HIGH_STREET
Offer: A streetwear label wants a collab: limited run, midnight release, resale prices guaranteed to triple. Pure hype, engineered scarcity.
A) Do the drop → V: +20 heat, novelty +30, +£25k rev · H: 8t waste (unsold split), 40t CO₂
B) Decline; protect the main line → V: −4 heat · H: none
ART: a queue of expensive trainers and umbrellas on wet pavement before dawn, shopfront light

**16 · size_run_gamble** — from HIGH_STREET
Offer: Data says cutting the extended size range lifts margin 8% — fewer patterns, cleaner racks. The customers it cuts are loyal and vocal.
A) Cut the range → V: +£9k rev · H: exclusion cost · FUSE: greenwashing_claim (brand-values exposure)
B) Keep full range; eat the margin → V: −£5k rev, +5 heat · H: none
ART: a rail of identical garments in graded sizes, one empty hanger at the end

**17 · fashion_week** — from GLOBAL
Offer: A slot opens at fashion week. The show is 12 minutes long, costs a fortune, and is the industry's front page.
A) Stage the show → V: +25 heat, +8 share, −£80k cap · H: 60t CO₂ (logistics, set build, flights)
B) Digital presentation instead → V: +8 heat, −£15k cap · H: 4t CO₂
ART: an empty runway one hour before the show, rows of white chairs, a single spotlight warming up

---

## FUNDING (4)

**18 · hedge_fund_offer** — from INDIE *(the exemplar)*
Offer: Halloran Capital offers £500,000. Marcus Vaile has circled for months. Generous terms, fast money, no board seat. He'd like an answer by Friday.
A) Take the money → V: +£500k cap, +5 heat · H: none directly · FUSE: undisclosed_animal_research · WHISPER: "A follower replies to your announcement with a single question mark. It gets 40 likes."
B) Decline; grow on revenue → V: −2 share · H: none
DEPTH: Halloran's second fund — not on the website — majority-backs a contract research organisation with three open welfare investigations. Nothing illegal. Nothing anyone has noticed. Yet.
ART: a fountain pen resting on an unsigned term sheet, heavy paper, low golden side light

**19 · growth_pressure** — from HIGH_STREET
Offer: The board meeting is Thursday. They want 40% growth. They have not asked how.
A) Promise 40% → V: +£80k cap, novelty +25, +5 share · H: 120k poverty-wage hrs, 200t CO₂ · FUSE: worker_grievance
B) Offer the truth: 12%, sustainably → V: −£40k cap, −4 share, +2 heat · H: none
ART: an empty boardroom, long walnut table, twelve chairs, city haze through floor-to-ceiling glass

**20 · the_bank_covenant** — from HIGH_STREET
Offer: Your working-capital facility is up for renewal. The bank offers better terms if you hit quarterly revenue covenants — a ratchet that rewards constant growth.
A) Take the ratchet → V: +£60k cap, novelty +15 permanent pressure · H: structural growth compulsion
B) Renew flat; keep flexibility → V: +£20k cap · H: none
ART: a bank's brass plaque beside a revolving door, reflections of hurrying figures
*(NOTE: this card mechanically raises novelty decay for the rest of the run — the system tightening, Wiener made visible.)*

**21 · green_bond** — from GLOBAL
Offer: An ESG fund offers cheap capital against sustainability KPIs. The KPIs, on inspection, are ones you already meet.
A) Take it and change nothing → V: +£150k cap, sentiment +10 · H: none changed · FUSE: greenwashing_claim
B) Take it and actually raise the bar → V: +£150k cap, −£90k spend, sentiment +6 · H: genuine reductions
C) Decline → V: none
ART: a glass award trophy engraved with a leaf motif, catching green-tinted light on a white shelf

---

## MARKETING (5)

**22 · greenwash_campaign** — from HIGH_STREET *(the lever)*
Offer: Your agency proposes "The Conscious Collection": eight styles, recycled content, earth-toned campaign, a hang tag with a leaf. Two percent of output. The campaign runs across everything.
A) Launch it → V: sentiment +25, +14 heat, +£9k rev, −£20k cap · H: 2t waste — nothing else changes · FUSE: greenwashing_claim · WHISPER: "A sustainability blogger posts a thread. It has 200 views."
B) Actually reformulate the main line → V: sentiment +6, −£95k cap, −£8k rev · H: −400kg microplastics, −80t CO₂
C) Say nothing → V: none · H: none
ART: a kraft-paper hang tag with an embossed leaf, on a linen background, artfully lit *(beautiful and empty)*

**23 · influencer_seeding** — from INDIE
Offer: Send product to 200 influencers. Most will bin it. Twelve will post. Two will make it explode.
A) Seed widely → V: +18 heat, +40k followers, novelty +20, −£12k cap · H: 3t waste, 12t CO₂ · WHISPER: "180 parcels are never opened. You don't know this."
B) Seed narrowly, to people who'll wear it → V: +7 heat, +8k followers, −£3k cap · H: 2t CO₂
ART: a tower of identical unopened courier boxes in a bright hallway, one open with tissue paper spilling

**24 · the_takedown** — from HIGH_STREET
Offer: A small journalist publishes a piece on your subcontracting. It's accurate. Legal says a cease-and-desist would probably work — she can't afford to fight it.
A) Send the letter → V: sentiment +5 now · H: suppression · FUSE: supply_chain_opacity (severity +2) · WHISPER: "The article quietly disappears. Its author does not."
B) Respond publicly, honestly → V: sentiment −10 now, +8 heat later · defuses one supply-chain fuse at half severity
C) Ignore it → V: sentiment −4 · H: none
ART: a printed news article on a desk, a red pen resting across it, unsigned letterhead beneath

**25 · ai_models** — from HIGH_STREET
Offer: Generated models cut campaign costs 70% — no shoots, no fees, infinite diversity on demand. The photographers and models you've used since the bedroom years are on the other side of that saving.
A) Go generated → V: −costs +£14k margin, +4 heat · H: livelihoods displaced · FUSE: worker_grievance (creative-sector variant)
B) Keep human shoots → V: −£10k cap, +3 sentiment · H: none
ART: a studio cyclorama, lighting rig on, no one in the room, a coffee cup left on an apple box

**26 · the_documentary_request** — from GLOBAL
Offer: A respected filmmaker requests access for a documentary on your supply chain. Full access, no editorial control. Decline and the film happens anyway — about the industry, with your logo in the b-roll.
A) Grant access → if 2+ fuses active: they fire early at reduced severity; if clean: sentiment +20, heat +10
B) Decline → V: sentiment −5 · H: all active fuses +1 severity
ART: a broadcast camera on a tripod facing an empty interview chair, softbox glow
*(NOTE: this card reads the fuse state — the first card that makes hidden history tangible.)*

---

## END OF LIFE (4)

**27 · unsold_stock** — from HIGH_STREET
Offer: The warehouse holds 40,000 units of last season. Discounting damages the brand. Donating raises questions about why you made them. There is a third option nobody puts in writing.
A) Dispose quietly → V: −£2k cap · H: 40k incinerated, 120t CO₂, 30t waste · FUSE: greenwashing_claim · WHISPER: "An invoice arrives from a contractor whose name you don't recognise."
B) Deep discount → V: +£9k cap, −12 heat, −£3k rev · H: none
C) Take-back & recycle programme → V: −£14k cap, +9 heat · H: 4t waste
DEPTH: The "disposal contractor" incinerates. Standard practice, entirely legal, completely undocumented — and the reason your brand holds its price.
ART: shrink-wrapped garment pallets in a dark warehouse aisle, one bay door open to white light

**28 · returns_policy** — from HIGH_STREET
Offer: Free returns lift conversion 30%. Customers order three sizes and keep one.
A) Free returns forever → V: +£21k rev, +9 heat, +4 share · H: 18t waste, 70t CO₂ · FUSE: greenwashing_claim
B) Paid returns, better sizing tools → V: +£5k rev, −3 heat, −£6k cap · H: 2t waste
DEPTH: A significant share of returns are never resold — processing costs more than the item is worth. They are baled and exported, and what happens next is somebody else's country.
ART: a returns conveyor of open parcels and spilling tissue, receding into industrial gloom

**29 · the_export_offer** — from GLOBAL
Offer: A broker offers to take *all* surplus textile — yours and your returns stream — for export as "second-hand goods." Cash positive. Warehouse solved. Papers in order.
A) Sign the contract → V: +£11k rev/turn ongoing · H: 60t/turn waste exported · FUSE: greenwashing_claim (high) · WHISPER: "A geography teacher tags you in a photo of a beach. You don't open it."
B) Decline; fund a sorting & resale operation → V: −£35k cap, +£3k rev · H: 5t waste
ART: shipping containers in fog, doors sealed, customs stamps fresh, gulls on the top edge

**30 · rental_pivot** — from GLOBAL
Offer: Your data team models a rental subscription for the premium line: lower volume, higher margin per garment, deep customer lock-in — and a fraction of the footprint. The board calls it "brand dilution."
A) Launch rental → V: −£50k cap, +£8k rev/turn recurring, novelty +8 sustainable · H: −20t CO₂/turn vs baseline
B) Kill it → V: none · H: the system rolls on
ART: a garment bag on a doorstep at dawn, reused shipping tag with many previous addresses visible
*(NOTE: the late-game counterweight — proof a cleaner model can also be a business. Deliberately strong but capital-hungry.)*

---

## Corpus notes for Karen

- **Fuse spread:** toxic_discharge ×1, supply_chain_opacity ×6, worker_grievance ×6, undisclosed_animal_research ×2, greenwashing_claim ×7 — journalists and regulators have plenty to find whichever way a run goes.
- **"Ethics is complicated" cards:** 07 (deadstock), 09B (tea), 26 (documentary), 30 (rental) — decency that pays, per World Factory.
- **Cards that touch the fuse system in new ways:** 12 (audit reveals fuses), 20 (permanent pressure), 26 (reads fuse state). These three make the hidden machinery *felt*.
- Real figures welcome anywhere — replace my placeholder tonnages/litres with research-grade numbers and the QR layer inherits them.
