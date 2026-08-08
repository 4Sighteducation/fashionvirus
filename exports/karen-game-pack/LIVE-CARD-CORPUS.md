# Fashion Virus — live card corpus (as implemented)

Exported from `src/game/cards.ts` on 2026-08-08.

**Counts:** 43 total · 30 standard · 7 dilemma · 6 crisis

This is what players see in the build today. Karen's original seeds live in `docs/fashion-virus-30-cards.md` and `docs/fashion-virus-dilemma-cards.md`; numbers and copy may differ slightly where the PoC was tuned.

---

## Standard cards (30)

### 1. The signature colour (`dye_signature_colour`) — STANDARD

- **Category:** materials · **Stage:** 1 (bedroom/indie / high street / global)

The dye house sends swatches. The reactive crimson is extraordinary — it photographs like nothing else and will sell itself. The low-impact alternative is softer, chalkier.

**LEARN MORE (depth):** The colour is achieved with heavy metals; the wastewater is untreated. The mill has been fined twice — both fines cheaper than treatment.

**THE RECORD (fact):** Textile dyeing and finishing is estimated to cause around one fifth of global industrial water pollution. — World Bank

**ART prompt:** extreme close-up of liquid crimson dye rippling in a steel vat, glossy surface reflection, jewel-like saturation


**Choices:**

**A) Take the saturated colour**
- Surface: cash +8k, heat +12
- Hidden: water +2
- Fuses: toxic_discharge
- Whisper: _"The river below the mill is running an unusual colour this week."_
- Follow-up ping: 70% from Mill — night shift

**B) The low-impact dye**
- Surface: cash -2k, heat +3, social +2
- Hidden: water +0.4

---

### 2. Leather (`leather_sourcing`) — STANDARD

- **Category:** materials · **Stage:** 1 (bedroom/indie / high street / global)

Your bestseller needs leather. One tannery's price you can't ignore; vegetable-tanned costs triple; the synthetic will be called plastic.

**LEARN MORE (depth):** Chromium salts in the water table; cattle on newly cleared land. Nobody in the chain will confirm provenance, and nobody is asking.

**THE RECORD (fact):** In tannery districts like Hazaribagh, Dhaka, untreated chrome effluent — some 21,000 cubic metres a day at its peak — left local water unfit to drink. — Human Rights Watch, 2012

**ART prompt:** a single exquisite tan leather jacket on a wooden hanger against raw concrete, soft window light


**Choices:**

**A) Cheap chrome leather**
- Surface: cash +14k
- Hidden: water +1.5; land +40; carbon +90
- Fuses: supply_chain_opacity

**B) Vegetable-tanned, traceable**
- Surface: cash -7k, heat +6, social +3
- Hidden: carbon +20

**C) Reclaimed offcuts from the furniture trade**
- Surface: cash -1k, heat +5, novelty +4, social +2
- Hidden: carbon +5
- Reaction: _"Every piece is slightly different. Customers start asking for "the one-offs"."_

**D) The synthetic**
- Surface: cash +9k, heat -4
- Hidden: microplastics +300

---

### 3. The blend (`polyester_blend`) — STANDARD

- **Category:** materials · **Stage:** 1 (bedroom/indie / high street / global)

Virgin polyester is cheap, drapes beautifully, never creases. Recycled costs more and the colour varies. Organic cotton costs more still — and drinks water.

**THE RECORD (fact):** A single 6 kg wash of polyester fabric can shed up to 700,000 microplastic fibres. — Napper & Thompson, University of Plymouth, 2016

**ART prompt:** bolts of flowing fabric mid-air in a studio, frozen in motion, silvery drape catching light


**Choices:**

**A) Virgin polyester**
- Surface: cash +7k
- Hidden: microplastics +800; carbon +60
- Whisper: _"A customer emails: the fabric feels 'a bit plasticky'. You archive it."_

**B) Recycled polyester**
- Surface: cash +2k, heat +4, social +2
- Hidden: microplastics +500

**C) Organic cotton**
- Surface: cash -3k, heat +8, social +2
- Hidden: water +2.6; land +15

---

### 4. Plant-based (`viscose_forest`) — STANDARD

- **Category:** materials · **Stage:** 1 (bedroom/indie / high street / global)

A viscose supplier offers a silk-soft feel at a cotton price. "Plant-based," the brochure says, over a photograph of leaves.

**LEARN MORE (depth):** The pulp is dissolved with carbon disulphide. Workers at the plant report neurological symptoms. The forest in the brochure is not the forest being cut.

**THE RECORD (fact):** Hundreds of millions of trees are logged every year to be dissolved into cellulosic fabrics like viscose. — Canopy

**ART prompt:** silk-like sage-green fabric cascading over a plinth, botanical shadow play on the backdrop


**Choices:**

**A) Take it**
- Surface: cash +10k, heat +6
- Hidden: land +25; water +1
- Fuses: supply_chain_opacity

**B) Certified closed-loop lyocell instead**
- Surface: cash -3k, heat +4, social +2

---

### 5. The worn-in look (`sandblasted_denim`) — STANDARD

- **Category:** materials · **Stage:** 2 (bedroom/indie / high street / global)

The distressed finish is the look of the season. Sandblasting delivers it at scale for pennies. Laser finishing needs new machinery.

**THE RECORD (fact):** Turkey banned denim sandblasting in 2009 after workers died of silicosis — incurable, entirely preventable. The practice moved to other countries rather than ending.

**ART prompt:** perfectly faded denim jeans laid flat, sculptural creases, dust motes in a shaft of light


**Choices:**

**A) Sandblast**
- Surface: cash +12k, heat +9, social -2
- Hidden: labour +40
- Fuses: worker_grievance, sandblast
- Whisper: _"A finishing-house invoice includes a line for 'respiratory PPE'. It is very small."_

**B) Invest in laser finishing**
- Surface: cash -24k, social +3

---

### 6. The angora moment (`angora_moment`) — STANDARD

- **Category:** materials · **Stage:** 2 (bedroom/indie / high street / global)

A single knit goes viral — the softness is the story. Angora at volume is suddenly very available and very cheap.

**LEARN MORE (depth):** The volume price exists because the fibre is plucked, not sheared. There is footage. It has not surfaced. Yet.

**THE RECORD (fact):** After undercover footage of live-plucking surfaced in 2013, hundreds of brands dropped angora within months — one of the fastest supply-chain reversals on record.

**ART prompt:** an impossibly soft pale knit sweater on a stone surface, single strand of fibre lifting in air


**Choices:**

**A) Scale the knit**
- Surface: cash +15k, heat +14
- Fuses: undisclosed_animal_research

**B) Switch to brushed lambswool, keep the silhouette**
- Surface: cash +3k, social +2

---

### 7. The deadstock find (`deadstock_find`) — STANDARD

- **Category:** materials · **Stage:** 1 (bedroom/indie / high street / global)

A mill closure floods the market with gorgeous deadstock fabric — limited, characterful, effectively free of new impact. But quantities are fixed: no reorders, ever.

**THE RECORD (fact):** Roughly 15% of fabric produced for clothing is lost as offcuts or never used at all. — Reverse Resources

**ART prompt:** shelves of assorted vintage fabric rolls in unrepeatable colours, archive-room stillness


**Choices:**

**A) Build a collection on deadstock**
- Surface: cash +5k, heat +8, novelty +10, social +3

**B) Pass; you need repeatable supply**
- Surface: none

---

### 8. The agent’s price (`offshore_decision`) — STANDARD

- **Category:** manufacturing · **Stage:** 1 (bedroom/indie / high street / global)

An agent offers a unit price a third of what you pay now. The factory is accredited. The photographs look clean.

**LEARN MORE (depth):** The accreditation covers the primary site. Overflow is subcontracted to unaudited units during peak season — which is most of the year.

**THE RECORD (fact):** Only around 2% of the world’s garment workers are estimated to earn a living wage. — widely cited industry estimate

**ART prompt:** a pristine factory floor of white sewing stations receding in one-point perspective, empty of people


**Choices:**

**A) Sign**
- Surface: cash +22k, heat +8, social -3
- Hidden: labour +180; carbon +140
- Fuses: supply_chain_opacity
- Whisper: _"Your agent is slow to answer which factory made the last run."_

**B) Visit the factory yourself first — costs the turn**
- Surface: cash -3k
- Special: inspect

**C) Stay local, small-batch**
- Surface: cash -1k, heat +5, social +5
- Hidden: carbon +15
- Recurring: cash 2k/turn, rest of run, Local wholesale accounts
- Reaction: _"Three local shops take the line on standing order. Small, steady, yours."_

---

### 9. Piecework (`piecework_pay`) — STANDARD

- **Category:** manufacturing · **Stage:** 1 (bedroom/indie / high street / global)
- **Character:** Li Pengjian

Li Pengjian proposes paying per garment. Productivity jumps. He mentions, in passing, that Yan Rong and Yao Lin — older, slower, the best work in the building — will earn less.

**THE RECORD (fact):** Labour is typically 2–4% of a garment’s retail price. Doubling a machinist’s wage adds pennies to the shelf price. — Oxfam

**ART prompt:** two tin cups of tea steaming on a workbench beside folded garments, warm side light


**Choices:**

**A) Switch to piecework**
- Surface: cash +11k, social -4
- Hidden: labour +60
- Fuses: worker_grievance
- Whisper: _"Li Pengjian asks whether you might meet the workers to discuss the pay structure."_
- Follow-up ping: 75% from Yan Rong

**B) Meet the workers; offer them tea**
- Surface: cash +13k, heat +3, social +5
- Reaction: _"Yan Rong shows you a seam technique you have never seen. You keep the pay structure and gain a design."_
- Follow-up ping: 55% from Yan Rong

**C) Simply raise pay a little**
- Surface: cash +3k, social +3

---

### 10. The deadline (`the_deadline`) — STANDARD

- **Category:** manufacturing · **Stage:** 2 (bedroom/indie / high street / global)

The retailer moves your delivery date up three weeks. Miss it and lose the account. The factory says it’s possible — "with overtime."

**THE RECORD (fact):** Excessive overtime is the most commonly found violation in garment-factory audits worldwide. — ILO Better Work

**ART prompt:** a loading bay at dusk, sealed boxes stacked to the ceiling, one strip light flickering


**Choices:**

**A) Take the overtime**
- Surface: cash +16k, heat +8, social -2
- Hidden: labour +90
- Fuses: worker_grievance
- Follow-up ping: 80% from Buyer — Selfridges

**B) Negotiate a partial delivery**
- Surface: cash +6k, heat -3

**C) Refuse; lose the account**
- Surface: cash -12k, heat -10, social +2

---

### 11. The sea or the sky (`air_freight`) — STANDARD

- **Category:** manufacturing · **Stage:** 2 (bedroom/indie / high street / global)

Sea freight lands the drop three weeks after the campaign breaks. Air lands it on time. Nobody will ever see the difference.

**THE RECORD (fact):** Air freight emits roughly 50 times more CO₂ per tonne-kilometre than sea freight. — ICCT / IMO figures

**ART prompt:** aircraft cargo hold interior stacked with shrink-wrapped garment cartons, cold blue light


**Choices:**

**A) Fly it**
- Surface: cash -9k, heat +8
- Hidden: carbon +340
- Follow-up ping: 55% from Freight broker

**B) Move the campaign, ship by sea**
- Surface: heat -6, novelty -12, social +1
- Hidden: carbon +18

---

### 12. The audit (`the_audit`) — STANDARD

- **Category:** manufacturing · **Stage:** 2 (bedroom/indie / high street / global)

A buyer requires a social audit of your supply chain. Your agent offers to "arrange the paperwork" for a fee. A genuine audit costs five times more and might find things.

**THE RECORD (fact):** The factories in Rana Plaza had been audited. Social audits routinely miss unauthorised subcontracting and coached interviews. — Clean Clothes Campaign

**ART prompt:** a thick document bound in white, embossed cover, on a glass desk — pristine, unopened


**Choices:**

**A) Arrange the paperwork**
- Surface: cash -4k, social -2
- Fuses: supply_chain_opacity
- Reaction: _"The deal proceeds. The document is beautiful."_

**B) Commission the real audit**
- Surface: cash -20k, social +5
- Special: audit

---

### 13. One exit (`factory_fire_warning`) — STANDARD

- **Category:** manufacturing · **Stage:** 3 (bedroom/indie / high street / global)

A worker at a subcontracted unit writes to you directly. The building has one exit. She has attached a photograph. She has cc’d nobody.

**THE RECORD (fact):** When Rana Plaza collapsed in 2013, killing 1,134 garment workers, cracks had been reported the day before. Workers were ordered back in.

**ART prompt:** a phone face-down on a marble desk beside an espresso, notification light glowing


**Choices:**

**A) Forward to the agent; move on**
- Surface: social -5
- Fuses: worker_grievance, worker_grievance
- Whisper: _"You never hear back about the email."_

**B) Halt production; audit the site**
- Surface: cash -90k, novelty -20, social +6

---

### 14. When’s the next drop? (`novelty_pressure`) — STANDARD

- **Category:** volume · **Stage:** 1 (bedroom/indie / high street / global)

Engagement is falling. The comments are one sentence, over and over: when’s the next drop? Your collection is four weeks old. Four weeks is a long time.

**THE RECORD (fact):** Clothing production roughly doubled between 2000 and 2015, while the average number of times a garment is worn fell by 36%. — Ellen MacArthur Foundation

**ART prompt:** a phone screen glow on a dark bedroom ceiling at 2am


**Choices:**

**A) Weekly micro-drops**
- Surface: cash +18k, heat +10, novelty +40
- Hidden: waste +12; carbon +80
- Whisper: _"Warehouse flags last month's stock hasn't moved. You approve a markdown."_

**B) Hold: two collections a year**
- Surface: cash -4k, heat -6, novelty -10, social +2

**C) Launch repair & resale instead**
- Surface: cash -6k, heat +7, novelty +12, social +6

---

### 15. The collab (`the_collab`) — STANDARD

- **Category:** volume · **Stage:** 2 (bedroom/indie / high street / global)

A streetwear label wants a collab: limited run, midnight release, resale prices guaranteed to triple. Pure hype, engineered scarcity.

**ART prompt:** a queue of expensive trainers and umbrellas on wet pavement before dawn, shopfront light


**Choices:**

**A) Do the drop**
- Surface: cash +25k, heat +20, novelty +30
- Hidden: waste +8; carbon +40

**B) Decline; protect the main line**
- Surface: heat -4, social +1

---

### 16. The size run (`size_run_gamble`) — STANDARD

- **Category:** volume · **Stage:** 2 (bedroom/indie / high street / global)

Data says cutting the extended size range lifts margin 8% — fewer patterns, cleaner racks. The customers it cuts are loyal and vocal.

**ART prompt:** a rail of identical garments in graded sizes, one empty hanger at the end


**Choices:**

**A) Cut the range**
- Surface: cash +9k, social -5
- Fuses: greenwashing_claim

**B) Keep full range; eat the margin**
- Surface: cash -5k, heat +5, social +5

---

### 17. Fashion week (`fashion_week`) — STANDARD

- **Category:** volume · **Stage:** 3 (bedroom/indie / high street / global)

A slot opens at fashion week. The show is 12 minutes long, costs a fortune, and is the industry’s front page.

**THE RECORD (fact):** Travel for one year of the four fashion weeks emits an estimated 241,000 tonnes of CO₂e. — Zero to Market, Ordre, 2020

**ART prompt:** an empty runway one hour before the show, rows of white chairs, a single spotlight warming up


**Choices:**

**A) Stage the show**
- Surface: cash -80k, heat +25
- Hidden: carbon +60

**B) Digital presentation instead**
- Surface: cash -15k, heat +8, social +1
- Hidden: carbon +4

---

### 18. The term sheet (`hedge_fund_offer`) — STANDARD

- **Category:** funding · **Stage:** 1 (bedroom/indie / high street / global)
- **Character:** Marcus Vaile, Halloran Capital

Halloran Capital offers £500,000. Marcus Vaile has circled for months. Generous terms, fast money, no board seat. He’d like an answer by Friday.

**LEARN MORE (depth):** Halloran's second fund — not on the website — majority-backs a contract research organisation with three open welfare investigations. Nothing illegal. Nothing anyone has noticed. Yet.

**ART prompt:** a fountain pen resting on an unsigned term sheet, heavy paper, low golden side light


**Choices:**

**A) Take the money**
- Surface: cash +500k, heat +5
- Fuses: undisclosed_animal_research
- Whisper: _"A follower replies to your announcement with a single question mark. It gets 40 likes."_

**B) Decline; grow on revenue**
- Surface: heat -4, social +2

---

### 19. Thursday’s board meeting (`growth_pressure`) — STANDARD

- **Category:** funding · **Stage:** 2 (bedroom/indie / high street / global)

The board meeting is Thursday. They want 40% growth. They have not asked how.

**THE RECORD (fact):** On its current growth path, fashion could consume a quarter of the world’s remaining carbon budget by 2050. — Ellen MacArthur Foundation, 2017

**ART prompt:** an empty boardroom, long walnut table, twelve chairs, city haze through floor-to-ceiling glass


**Choices:**

**A) Promise 40%**
- Surface: cash +80k, heat +10, novelty +25, social -2
- Hidden: labour +120; carbon +200
- Fuses: worker_grievance

**B) Offer the truth: 12%, sustainably**
- Surface: cash -40k, heat -6, social +4

---

### 20. The covenant (`the_bank_covenant`) — STANDARD

- **Category:** funding · **Stage:** 2 (bedroom/indie / high street / global)

Your working-capital facility is up for renewal. The bank offers better terms if you hit quarterly revenue covenants — a ratchet that rewards constant growth.

**ART prompt:** a bank's brass plaque beside a revolving door, reflections of hurrying figures


**Choices:**

**A) Take the ratchet**
- Surface: cash +60k, novelty +15
- Novelty decay +4/turn (permanent)
- Reaction: _"The terms are excellent. The quarter never ends now."_

**B) Renew flat; keep flexibility**
- Surface: cash +20k, social +1

---

### 21. The green bond (`green_bond`) — STANDARD

- **Category:** funding · **Stage:** 3 (bedroom/indie / high street / global)

An ESG fund offers cheap capital against sustainability KPIs. The KPIs, on inspection, are ones you already meet.

**ART prompt:** a glass award trophy engraved with a leaf motif, catching green-tinted light on a white shelf


**Choices:**

**A) Take it and change nothing**
- Surface: cash +150k, heat +4, social -2
- Fuses: greenwashing_claim
- Follow-up ping: 65% from ESG analyst — LinkedIn

**B) Take it and actually raise the bar**
- Surface: cash +60k, heat +2, social +4
- Hidden: carbon -80; microplastics -200

**C) Decline**
- Surface: none

---

### 22. The Conscious Collection (`greenwash_campaign`) — STANDARD

- **Category:** marketing · **Stage:** 2 (bedroom/indie / high street / global)

Your agency proposes "The Conscious Collection": eight styles, recycled content, earth-toned campaign, a hang tag with a leaf. Two percent of output. The campaign runs across everything.

**THE RECORD (fact):** A 2021 European Commission sweep found 42% of online environmental claims were exaggerated, false or deceptive.

**ART prompt:** a kraft-paper hang tag with an embossed leaf, on a linen background, artfully lit


**Choices:**

**A) Launch it**
- Surface: cash -11k, heat +20, social -3
- Hidden: waste +2
- Fuses: greenwashing_claim
- Whisper: _"A sustainability blogger posts a thread. It has 200 views."_
- Follow-up ping: 70% from Journalist — The Guardian

**B) Actually reformulate the main line**
- Surface: cash -100k, heat +2, social +5
- Hidden: microplastics -400; carbon -80

**C) Say nothing**
- Surface: none

---

### 23. The seeding list (`influencer_seeding`) — STANDARD

- **Category:** marketing · **Stage:** 1 (bedroom/indie / high street / global)

Send product to 200 influencers. Most will bin it. Twelve will post. Two will make it explode.

**ART prompt:** a tower of identical unopened courier boxes in a bright hallway, one open with tissue paper spilling


**Choices:**

**A) Seed widely**
- Surface: cash -12k, heat +18, novelty +28
- Hidden: waste +3; carbon +12
- Whisper: _"180 parcels are never opened. You don't know this."_
- Follow-up ping: 50% from Intern — PR
- Requires social ≥ 12

**B) Seed narrowly, to people who'll wear it**
- Surface: cash -3k, heat +7, novelty +2, social +3
- Hidden: carbon +2

---

### 24. The takedown (`the_takedown`) — STANDARD

- **Category:** marketing · **Stage:** 2 (bedroom/indie / high street / global)

A small journalist publishes a piece on your subcontracting. It's accurate. Legal says a cease-and-desist would probably work — she can't afford to fight it.

**THE RECORD (fact):** Lawsuits designed to silence critics who cannot afford to fight have a name — SLAPPs. The EU adopted an anti-SLAPP directive in 2024.

**ART prompt:** a printed news article on a desk, a red pen resting across it, unsigned letterhead beneath


**Choices:**

**A) Send the letter**
- Surface: heat +2, social -6
- Fuses: supply_chain_opacity, supply_chain_opacity
- Whisper: _"The article quietly disappears. Its author does not."_

**B) Respond publicly, honestly**
- Surface: heat -4, social +6
- Clears fuses: supply_chain_opacity
- Reaction: _"It costs you a news cycle. It buys you a witness."_

**C) Ignore it**
- Surface: heat -2

---

### 25. Generated (`ai_models`) — STANDARD

- **Category:** marketing · **Stage:** 2 (bedroom/indie / high street / global)

Generated models cut campaign costs 70% — no shoots, no fees, infinite diversity on demand. The photographers and models you've used since the bedroom years are on the other side of that saving.

**ART prompt:** a studio cyclorama, lighting rig on, no one in the room, a coffee cup left on an apple box


**Choices:**

**A) Go generated**
- Surface: cash +14k, heat +4, social -4
- Fuses: worker_grievance

**B) Keep human shoots**
- Surface: cash -10k, heat +1, social +4

---

### 26. The documentary (`documentary_request`) — STANDARD

- **Category:** marketing · **Stage:** 3 (bedroom/indie / high street / global)

A respected filmmaker requests access for a documentary on your supply chain. Full access, no editorial control. Decline and the film happens anyway — about the industry, with your logo in the b-roll.

**ART prompt:** a broadcast camera on a tripod facing an empty interview chair, softbox glow


**Choices:**

**A) Grant access**
- Surface: social +6
- Special: documentary_grant

**B) Decline**
- Surface: heat -2, social -2
- Special: documentary_decline

---

### 27. 40,000 units (`unsold_stock`) — STANDARD

- **Category:** endoflife · **Stage:** 2 (bedroom/indie / high street / global)

The warehouse holds 40,000 units of last season. Discounting damages the brand. Donating raises questions about why you made them. There is a third option nobody puts in writing.

**LEARN MORE (depth):** The "disposal contractor" incinerates. Standard practice, entirely legal, completely undocumented — and the reason your brand holds its price.

**THE RECORD (fact):** Burberry admitted to destroying £28.6 million of unsold stock in 2017. France made destroying unsold goods illegal in 2020.

**ART prompt:** shrink-wrapped garment pallets in a dark warehouse aisle, one bay door open to white light


**Choices:**

**A) Dispose quietly**
- Surface: cash -2k, social -2
- Hidden: waste +30; carbon +120
- Fuses: greenwashing_claim
- Whisper: _"An invoice arrives from a contractor whose name you don't recognise."_

**B) Deep discount**
- Surface: cash +6k, heat -12

**C) Take-back & recycle programme**
- Surface: cash -14k, heat +9, social +6
- Hidden: waste +4

---

### 28. Free returns (`returns_policy`) — STANDARD

- **Category:** endoflife · **Stage:** 2 (bedroom/indie / high street / global)

Free returns lift conversion 30%. Customers order three sizes and keep one.

**LEARN MORE (depth):** A significant share of returns are never resold — processing costs more than the item is worth. They are baled and exported, and what happens next is somebody else's country.

**THE RECORD (fact):** In the US alone, returned goods send an estimated 2.6 million tonnes to landfill every year. — Optoro

**ART prompt:** a returns conveyor of open parcels and spilling tissue, receding into industrial gloom


**Choices:**

**A) Free returns forever**
- Surface: cash +21k, heat +13
- Hidden: waste +18; carbon +70
- Fuses: greenwashing_claim
- Follow-up ping: 60% from Warehouse lead

**B) Paid returns, better sizing tools**
- Surface: cash -1k, heat -3, social +2
- Hidden: waste +2

---

### 29. The broker (`export_offer`) — STANDARD

- **Category:** endoflife · **Stage:** 3 (bedroom/indie / high street / global)

A broker offers to take all surplus textile — yours and your returns stream — for export as "second-hand goods." Cash positive. Warehouse solved. Papers in order.

**THE RECORD (fact):** Ghana’s Kantamanto market receives around 15 million used garments every week. Roughly 40% leave as waste. — The OR Foundation

**ART prompt:** shipping containers in fog, doors sealed, customs stamps fresh, gulls on the top edge


**Choices:**

**A) Sign the contract**
- Surface: social -3
- Fuses: greenwashing_claim, greenwashing_claim
- Recurring: cash 11k/turn, rest of run, Export broker contract
- Whisper: _"A geography teacher tags you in a photo of a beach. You don't open it."_
- Reaction: _"The warehouse empties. £11k a turn, ongoing."_
- Follow-up ping: 75% from OR Foundation — Accra

**B) Decline; fund a sorting & resale operation**
- Surface: cash -32k, social +6
- Hidden: waste +5

---

### 30. The rental pivot (`rental_pivot`) — STANDARD

- **Category:** endoflife · **Stage:** 3 (bedroom/indie / high street / global)

Your data team models a rental subscription for the premium line: lower volume, higher margin per garment, deep customer lock-in — and a fraction of the footprint. The board calls it "brand dilution."

**THE RECORD (fact):** Keeping a garment in active use just nine months longer cuts its carbon, water and waste footprints by 20–30%. — WRAP

**ART prompt:** a garment bag on a doorstep at dawn, reused shipping tag with many previous addresses visible


**Choices:**

**A) Launch rental**
- Surface: cash -30k, novelty +8, social +6
- Recurring: cash 8k/turn, rest of run, Rental subscription
- Reaction: _"Month two: the same coat, its third renter, still perfect."_
- Follow-up ping: 55% from Board WhatsApp

**B) Kill it**
- Surface: none

---


## Dilemma cards (7)

### 1. The mill town (`d_mill_town`) — DILEMMA

- **Category:** manufacturing · **Stage:** 2 (bedroom/indie / high street / global)

Your longest-standing supplier — the dye house from your first collection — fails its effluent test badly. The village has 300 jobs and this mill. You are 60% of its order book.

**LEARN MORE (depth):** The mill owner shows you the books. Remediation genuinely works — but only if you commit publicly, which ties your brand to the pollution story if it fails.

**ART prompt:** a terraced village street at dusk, mill chimney at its end, lights on in half the windows


**Choices:**

**A) Cut them off immediately**
- Surface: cash -8k, heat +2, social -4
- Hidden: water -0.3
- World states: mill_town_dies
- Reaction: _"The river begins to recover within the year. The town does not."_

**B) Stay and fund remediation over two years**
- Surface: cash -45k, social +6
- Fuses: toxic_discharge
- Recurring: cash -4k/turn, 6 turns, Mill remediation
- Reaction: _"You commit publicly. Your name is on the mill gate now, for better or worse."_
- Follow-up ping: 60% from Mill owner

**C) Quietly taper orders and say nothing**
- Surface: social -3
- Fuses: supply_chain_opacity
- Whisper: _"The mill's Christmas shutdown starts in October this year."_

---

### 2. Three quotes (`d_no_clean_fabric`) — DILEMMA

- **Category:** materials · **Stage:** 1 (bedroom/indie / high street / global)

The new line needs a base fabric. Three quotes on the desk. There is no fourth option.

**LEARN MORE (depth):** A lifecycle analyst's memo: "Each option externalises a different cost onto a different place. The question is not which is clean. The question is which harm you choose to own."

**THE RECORD (fact):** One cotton shirt takes about 2,700 litres of water to make — what one person drinks in two and a half years. — WWF

**ART prompt:** three fabric swatches pinned side by side on a studio wall, morning light, entirely neutral


**Choices:**

**A) Organic cotton**
- Surface: cash -5k, heat +6, social +1
- Hidden: water +2.6; land +15

**B) Recycled polyester**
- Surface: heat +3
- Hidden: microplastics +500

**C) Conventional viscose**
- Surface: cash +4k
- Hidden: land +20; water +0.5

---

### 3. The petition (`d_overtime_petition`) — DILEMMA

- **Category:** manufacturing · **Stage:** 2 (bedroom/indie / high street / global)
- **Character:** Li Pengjian

You move to cap hours at the factory after the deadline crunch. Li Pengjian brings you a petition — signed by 140 workers — against the cap. Peak-season overtime is school fees, medicine, remittances. "They are asking you not to protect them."

**LEARN MORE (depth):** Yan Rong, privately: "The young ones want the hours. I am tired. Both things are true."

**THE RECORD (fact):** For millions of garment workers, overtime is the only route from poverty pay toward a living income — the base wage is the problem, not the hours. — Clean Clothes Campaign

**ART prompt:** a folded paper petition on a workbench, many signatures visible as marks, not readable


**Choices:**

**A) Impose the cap anyway**
- Surface: cash -6k, social -3
- Hidden: labour -20
- Reaction: _"The cap holds. The remittances don't."_

**B) Keep overtime, add safeguards**
- Surface: cash -2k, social +2
- Hidden: labour +30
- Fuses: worker_grievance

**C) Raise base pay so overtime isn't needed**
- Surface: cash -22k, social +4
- Recurring: cash -5k/turn, rest of run
- Novelty decay +2/turn (permanent)
- Reaction: _"Unit economics now depend on selling more. The trap, seen from the other side."_

---

### 4. Dirty money, clean purpose (`d_dirty_money`) — DILEMMA

- **Category:** funding · **Stage:** 2 (bedroom/indie / high street / global)

A fast-fashion conglomerate — everything you're supposedly against — offers £400k for a 10% stake in your repair-and-resale arm. Their money would take circular fashion mainstream through their 900 stores. Your name stays off it.

**LEARN MORE (depth):** Their sustainability director, off the record: "I have a real budget for exactly three years, then I'm replaced. Use me or don't."

**THE RECORD (fact):** Less than 1% of the material used to make clothing is recycled into new clothing. — Ellen MacArthur Foundation, 2017

**ART prompt:** two coffee cups on a glass table between facing chairs, one branded lanyard just out of focus


**Choices:**

**A) Take it**
- Surface: cash +400k, social +1
- Fuses: greenwashing_claim
- Recurring: rest of run, Conglomerate circular rails
- Reaction: _"Circular rails appear in 900 stores. Your name is nowhere on them."_
- Follow-up ping: 55% from Youth ambassadors group chat

**B) Decline**
- Surface: none
- World states: circular_theatre

---

### 5. The whistleblower's choice (`d_whistleblower`) — DILEMMA

- **Category:** manufacturing · **Stage:** 3 (bedroom/indie / high street / global)

The worker who emailed about the single exit writes again. An audit is scheduled. If you act on her photograph, the subcontractor will know exactly who talked. She asks you to wait until she finds other work. The building is still the building.

**LEARN MORE (depth):** The fire-safety engineer's report: "Probability of incident: low per month. Not zero. Cumulative."

**THE RECORD (fact):** After Rana Plaza, the legally binding Bangladesh Accord inspected over 1,600 factories and fixed more than 120,000 safety hazards — because workers finally had a protected way to speak.

**ART prompt:** an inbox on a dark screen, one unread message, cursor hovering — nothing else lit


**Choices:**

**A) Act now**
- Surface: cash -40k
- Clears fuses: worker_grievance, worker_grievance
- World states: whistleblower_blacklisted
- Reaction: _"The building is made safe in a month. She is never hired in the sector again."_

**B) Wait, as she asks**
- Surface: none
- Fuses: worker_grievance, worker_grievance
- Whisper: _"Another month. The building is still the building."_
- Follow-up ping: 70% from Unknown number

**C) Move her family onto your payroll first, then act**
- Surface: cash -15k, social +4
- Fuses: worker_grievance
- Reaction: _"Two months of risk, then she is out, and the audit lands."_

---

### 6. Access or purity (`d_access_or_purity`) — DILEMMA

- **Category:** volume · **Stage:** 2 (bedroom/indie / high street / global)

Your sustainable line works — at £120 a garment. A buyer for a value chain offers to license a simplified version at £15: heavier polyester blend, offshore production, but genuinely durable and repairable. "Sustainability that only the rich can buy isn't sustainability. It's positioning."

**LEARN MORE (depth):** Lifecycle data: the £15 durable blend, worn for years, can out-perform the £120 organic piece worn twice. Ownership behaviour, not fibre, dominates the footprint.

**THE RECORD (fact):** How long a garment stays in use matters more than what it is made of: doubling wears roughly halves the footprint per wear. — WRAP

**ART prompt:** two identical white shirts on one rail, price tags turned away


**Choices:**

**A) License it**
- Surface: heat +8, social +4
- Recurring: cash 30k/turn, rest of run
- Reaction: _"400,000 people can now afford a garment built to last."_

**B) Refuse; protect the standard**
- Surface: heat +4
- Hidden: waste +10
- World states: someone_worse

---

### 7. The recall (`d_the_recall`) — DILEMMA

- **Category:** endoflife · **Stage:** 2 (bedroom/indie / high street / global)

A dye batch in 60,000 shipped garments shows trace contamination — well under the legal limit, above your own published standard. Nobody outside the lab knows. A recall is ruinous; silence is a bet.

**LEARN MORE (depth):** Toxicologist: "At these levels, risk is negligible. Reputationally, 'negligible' has never once survived a headline." The recall protects trust by generating waste.

**ART prompt:** a single folded garment in a specimen bag on a lab bench, fluorescent light


**Choices:**

**A) Full public recall**
- Surface: cash -120k, heat -15, social +6
- Hidden: carbon +180; waste +45
- Reaction: _"The letters go out under your signature. Honest, and enormous."_

**B) Quietly fix the process, say nothing**
- Surface: social -2
- Fuses: greenwashing_claim
- Whisper: _"The lab tech who ran the batch orders nothing from your site again."_

**C) Offer voluntary returns without stating why**
- Surface: cash -30k, heat -4, social +1
- Hidden: waste +10

---


## Crisis cards (6)

### 1. Yasmin Ade is calling (`c_expose`) — CRISIS

- **Category:** marketing · **Stage:** 2 (bedroom/indie / high street / global)
- **Character:** Yasmin Ade
- **Crisis trigger:** 3× tags [supply_chain_opacity, worker_grievance]

A journalist has spent four months on your supply chain. She has documents, payslips, photographs. She is offering you a right of reply before Sunday.

**LEARN MORE (depth):** Everything in her file is true. You know it is true because you decided it.


**Choices:**

**A) Deny everything — lawyer up**
- Surface: cash -25k, heat -10, social -6
- Fuses: greenwashing_claim
- Reaction: _"The story runs anyway. Your denial is the headline."_

**B) Crisis PR — pledge an inquiry**
- Surface: cash -40k, heat -4, social -2
- Fuses: greenwashing_claim
- Reaction: _"The inquiry is announced. Its findings are due after the news cycle ends."_

**C) Answer her questions honestly**
- Surface: heat -15, novelty -10, social +6
- Clears fuses: supply_chain_opacity
- Reaction: _"The piece is devastating and fair. Three suppliers cut you off. One customer writes: thank you."_

---

### 2. The river ran crimson (`c_fishkill`) — CRISIS

- **Category:** materials · **Stage:** 2 (bedroom/indie / high street / global)
- **Crisis trigger:** 1× tags [toxic_discharge]

A photo is trending: the river below your dye house, running your signature colour, dead fish at the outfall. Your name is not attached. Yet.

**LEARN MORE (depth):** The dye house serves four brands. The crimson is only yours.

**THE RECORD (fact):** In Xintang, China’s denim capital, the river below the mills ran indigo; sediment tests found cadmium, chromium and lead. — Greenpeace, 2010


**Choices:**

**A) "We are reviewing our suppliers"**
- Surface: cash -8k, heat -5, social -2
- Fuses: greenwashing_claim
- Follow-up ping: 85% from Breaking — local news

**B) Switch dye houses quietly**
- Surface: cash -12k, social -2
- Hidden: water +0.5
- Reaction: _"The new dye house is two rivers east."_

**C) Own it — fund the cleanup**
- Surface: cash -30k, heat +2, social +6
- Clears fuses: toxic_discharge

---

### 3. The fire (`c_fire`) — CRISIS

- **Category:** manufacturing · **Stage:** 3 (bedroom/indie / high street / global)
- **Crisis trigger:** 3× tags [worker_grievance]

A blaze on the third floor of a subcontracted unit, 2am, during the rush shift. Eleven injured. The fire doors were chained. Your agent is not answering his phone.

**LEARN MORE (depth):** The chains were on the doors because of the unit price. The rush shift existed because of the deadline you set.

**THE RECORD (fact):** The 2012 Tazreen Fashions fire killed at least 112 workers. Exits were blocked; managers told workers the alarm was a drill.


**Choices:**

**A) Cut ties, relocate production**
- Surface: cash -30k, heat -8, social -4
- Fuses: supply_chain_opacity
- Reaction: _"The order book barely notices. The eleven do."_

**B) Compensate the injured, fix the building**
- Surface: cash -60k, heat -3, social +7
- Clears fuses: worker_grievance

**C) "Our thoughts are with those affected"**
- Surface: cash -5k, heat -12, social -5
- Fuses: greenwashing_claim

---

### 4. #WearTheTruth (`c_boycott`) — CRISIS

- **Category:** marketing · **Stage:** 3 (bedroom/indie / high street / global)
- **Crisis trigger:** 3× tags [greenwashing_claim]

The receipts thread has 40k retweets: your pledges next to your practice, side by side, dated. A boycott is organising. It is very, very shareable.

**LEARN MORE (depth):** Every screenshot in the thread is real. The organisers include two of your earliest customers.


**Choices:**

**A) Ride it out — say nothing**
- Surface: heat -12, novelty -20, social -4

**B) Rebrand — new name, new story**
- Surface: cash -45k, novelty -6, social -5
- Fuses: greenwashing_claim
- Reaction: _"The internet finds the paperwork in nine days."_

**C) Publish everything, set real targets**
- Surface: cash -35k, heat +4, novelty -8, social +7
- Clears fuses: greenwashing_claim, greenwashing_claim

---

### 5. Follow the money (`c_fund_story`) — CRISIS

- **Category:** funding · **Stage:** 2 (bedroom/indie / high street / global)
- **Crisis trigger:** 1× tags [undisclosed_animal_research]

A finance blog has mapped your backers. Your 'conscious brand' is part-financed by a fund with three open animal-welfare investigations — and the angora footage just surfaced beside it.

**LEARN MORE (depth):** You knew. It cost one click to know, the day you signed. You did not click.


**Choices:**

**A) Buy the stake back**
- Surface: cash -80k, social +2
- Clears fuses: undisclosed_animal_research
- Reaction: _"The fund makes 60% in eighteen months. The story dies."_

**B) "Investors do not set our values"**
- Surface: heat -10, social -4
- Fuses: greenwashing_claim

---

### 6. The diagnosis (`c_silicosis`) — CRISIS

- **Category:** manufacturing · **Stage:** 3 (bedroom/indie / high street / global)
- **Crisis trigger:** 1× tags [sandblast]

Three finishing-house workers, all under forty, diagnosed with silicosis. A law firm is assembling a claim. The worn-in look is in the photographs, on the rail, in the claim.

**LEARN MORE (depth):** Silicosis is incurable and entirely preventable. The laser-finishing quote is still in your inbox.


**Choices:**

**A) Settle quietly, NDAs all round**
- Surface: cash -45k, social -4
- Fuses: greenwashing_claim

**B) Accept liability, fund treatment, ban the process**
- Surface: cash -65k, heat +3, social +7
- Clears fuses: worker_grievance

---

