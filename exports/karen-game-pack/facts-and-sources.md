# Facts and sources

Every "THE RECORD" line in the game, the figure it uses, and where it comes from.
These are the standard, widely-cited figures in fashion-sustainability research — but several
are estimates or have been contested, so **verify before print / funding submissions**.
Notes flag anything that needs care.

## In-game facts

| Card | Figure in game | Source | Notes |
| --- | --- | --- | --- |
| The signature colour | Dyeing/finishing ≈ ⅕ of global industrial water pollution | World Bank (widely cited, orig. 2012 estimate) | Ubiquitous stat; original methodology is old. Safe with "estimated". |
| The leather question | Hazaribagh tanneries: ~21,000 m³ untreated effluent/day | Human Rights Watch, *Toxic Tanneries* (2012) | Solid, on-the-record report. Tanneries have since partially relocated. |
| The performance fabric | Up to 700,000 microfibres per 6 kg polyester wash | Napper & Thompson, University of Plymouth (2016), *Marine Pollution Bulletin* | Peer-reviewed. "Up to" is important — range varies by fabric. |
| The forest fabric | Hundreds of millions of trees logged yearly for cellulosics | Canopy (canopyplanet.org) | Canopy's current figure is 300M+/yr; "hundreds of millions" is safe. |
| The perfect fade | Turkey banned sandblasting in 2009 after silicosis deaths | Turkish Ministry of Health ban, widely reported | Solid. Practice documented afterwards in Bangladesh, China, Egypt. |
| The softest thing | Hundreds of brands dropped angora after 2013 footage | PETA investigation (2013); brand announcements | 300+ brands is the commonly reported tally. |
| The deadstock find | ~15% of fabric lost as offcuts/unused | Reverse Resources (2016 study) | Estimate; some studies say up to 25%. Conservative figure used. |
| The offshore decision | ~2% of garment workers earn a living wage | Widely cited industry estimate (orig. Deloitte Access Economics) | **Weakest sourcing in the set** — flagged as "estimate" in-game. Consider replacing with a Fashion Checker (CCC) stat. |
| The piecework rate | Labour = 2–4% of retail price | Oxfam Australia, *What She Makes* | Solid for typical fast-fashion garments. |
| The deadline | Excessive overtime = most common audit violation | ILO Better Work programme reporting | Consistent across Better Work annual reports. |
| The air freight decision | Air ≈ 50× sea freight CO₂ per tonne-km | ICCT / IMO GHG studies | Range is ~20–50×+ depending on aircraft/ship; "roughly 50×" is defensible for typical airfreight vs container. |
| The audit | Rana Plaza factories had been audited | Clean Clothes Campaign; AFL-CIO *Responsibility Outsourced* | Well documented — audits (incl. BSCI at two suppliers) preceded collapse. |
| The 2am phone call | Rana Plaza: 1,134 dead; cracks reported day before | ILO; Bangladesh government figures | Established record. |
| The algorithm's appetite | Production ~doubled 2000–2015; wears per garment −36% | Ellen MacArthur Foundation, *A New Textiles Economy* (2017) | EMF's flagship stats. |
| Fashion week | Fashion-month travel ≈ 241,000 tCO₂e/yr | *Zero to Market*, Ordre × Carbon Trust (2020) | Pre-pandemic study of buyer/designer travel. |
| The growth board | Fashion could use ¼ of world carbon budget by 2050 | Ellen MacArthur Foundation (2017) | Scenario projection, not a forecast — keep the "could". |
| The green story | 42% of online green claims exaggerated/false/deceptive | European Commission website sweep (Jan 2021) | Official Commission press release. |
| The takedown request | EU anti-SLAPP directive adopted 2024 | Directive (EU) 2024/1069 | Fact. |
| The warehouse problem | Burberry burned £28.6m of stock (2017); France ban (2020) | Burberry annual report 2017/18; French AGEC law | Both on the record. AGEC destruction ban phased in from 2022. |
| The returns policy | US returns → ~2.6 million tonnes landfill/yr | Optoro (2019/2020 estimates) | Industry estimate from a returns-logistics firm — decent but commercial source. |
| The export offer | Kantamanto: ~15M garments/week, ~40% become waste | The OR Foundation (Accra, field research) | The standard citation for Ghana's second-hand trade. |
| The rental pivot | +9 months active use → footprints −20–30% | WRAP, *Valuing Our Clothes* | Solid UK research. |
| No clean fabric | Cotton shirt ≈ 2,700 litres of water | WWF | The classic figure; a global average with wide regional variance. |
| Dirty money | <1% of clothing recycled into new clothing | Ellen MacArthur Foundation (2017) | Refers to fibre-to-fibre recycling. Still current. |
| The whistleblower | Bangladesh Accord: 1,600+ factories, 120,000+ hazards fixed | Bangladesh Accord / International Accord reporting | Cumulative figures from Accord progress reports. |
| Access or purity | Doubling wears ≈ halves footprint per wear | WRAP lifecycle analysis | Rounded framing of use-phase dominance; defensible. |
| Crisis: the river ran crimson | Xintang sediment: cadmium, chromium, lead | Greenpeace, *Dirty Laundry / The Dark Side of Denim* (2010) | Documented sampling. |
| Crisis: the fire | Tazreen fire (2012): 112+ dead, exits blocked | Bangladesh government inquiry; press record | Established record. |

## End-screen conversion factors

| Ledger unit | Conversion | Basis |
| --- | --- | --- |
| Water (million litres) | ÷ 2.5 → Olympic pools | FINA pool = 2,500 m³ = 2.5 ML |
| Carbon (tonnes CO₂e) | ÷ 0.6 → London–NY passenger flights | ~0.6 tCO₂e/passenger one-way economy (ICCT-order figures; higher with radiative forcing) |
| Waste (tonnes) | ÷ 10 → bin lorries | Typical UK refuse collection vehicle payload ~8–11 t |
| Microplastics (kg) | ÷ 0.005 → carrier bags | Standard HDPE carrier bag ≈ 5 g |
| Labour (thousand hours) | ÷ 80 → working lives | ~45 yr × 48 wk × 37 h ≈ 80,000 h per working life |
| Land (hectares) | ÷ 0.7 → football pitches | FIFA pitch ≈ 0.714 ha |

## House rules for facts

- Every in-game figure carries its attribution **in the displayed text** — the player never sees an unsourced number.
- Prefer "estimated / up to / roughly" where the underlying research is a range.
- Crisis cards may use documented historical events (Tazreen, Xintang, Rana Plaza) — the game's fiction sits beside the record, never claims to be it.
- If a figure gets challenged, the fix is one string in `src/game/cards.ts` (`fact:` field) plus this table.
