# WASTEWORLD — Image generation prompt pack (Google Flow)

Act 2 landscape art in two registers: the manufactured wasteland, and the repaired world.

---

## How to use this pack

**One craft note before the prompts.** Don't prompt "in the style of Edward Burtynsky" — naming a living artist is both less reliable in generators and worth avoiding for a funded project. Instead, these prompts describe the *visual language*: large-format documentary photography, elevated vantage, diffuse light, vast scale, tiny figures, deadpan neutrality. That register is what you're after, and describing it directly gets better results anyway.

**The critical decision in this pack: the utopian images use the SAME camera.** Same lens, same overcast light, same distance, same deadpan framing. If the good world gets golden-hour fantasy lighting, it stops being believable — it becomes a poster. Piercy's utopia is convincing because it's *ordinary*. One world, one camera, two outcomes. That's the game's argument, in the art.

**Style tokens to keep constant** (paste at the end of every prompt):

> shot on large-format 4x5 view camera, elevated vantage point, diffuse overcast daylight, no direct sun, deep depth of field, everything in focus, muted natural colour palette, documentary neutrality, no dramatic sky, no lens flare, tiny human figures for scale, photorealistic, 16:9

For the hinge sequence, Flow's video mode: generate the still first, then animate with *"extremely slow forward push, locked horizon, no camera shake, ambient movement only (smoke drift, water ripple, birds), 8 seconds"*.

---

## SET A — THE WASTEWORLD (growth player's Act 2)

### A1. The textile mountain
A vast landfill composed entirely of discarded clothing, compressed strata of fabric in faded commercial colours stretching to a hazy horizon, bulldozer tracks switchbacking up the slope, three tiny figures picking through garments near the summit, distant city skyline barely visible through smog, [style tokens]

### A2. The dye river
A wide slow river running an unnatural saturated crimson through an industrial valley, concrete outfall pipes along the bank, dead reeds stained pink at the waterline, a disused footbridge, one figure standing on the bank looking at the water, colour reflected on wet mud, overcast, [style tokens]

*(Variant: regenerate with "saturated cobalt blue" / "chemical violet" — in the game the river runs whatever colour the player shipped.)*

### A3. The sandblasted denim floor
Interior of an abandoned garment finishing factory, hundreds of workstations in perfect receding rows under fluorescent light, fine pale dust coating every surface, protective masks hanging on hooks, one distant doorway of white daylight, symmetrical one-point perspective, [style tokens]

### A4. The bale port
Thousands of compressed bales of second-hand clothing stacked like shipping containers across a dockside, wrapped in torn plastic sheeting, cranes idle in fog, seagulls, two workers dwarfed between the stacks, wet tarmac reflections, [style tokens]

### A5. The dry reservoir
A drained reservoir behind a textile mill, cracked lakebed patterned like broken tiles, a stranded jetty, water level marks like tree rings on the surrounding hills, pipework descending the slope into nothing, single bare tree, milky sky, [style tokens]

### A6. The unfinished megastore
An abandoned half-built flagship retail development, exposed concrete floors open to the weather, escalators rising into open sky, marble cladding stacked on pallets and never fitted, weeds in the atrium, one security hut with a light on, [style tokens]

### A7. The company town
A workers' dormitory settlement beside a shuttered factory complex, identical concrete blocks with washing lines strung between them, the factory chimneys cold, market stalls in the foreground selling salvaged fabric, hills terraced with debris behind, haze, [style tokens]

*(This is your uploaded reference's territory — habitation and demolition in one frame, life persisting inside the ruin.)*

---

## SET B — THE REPAIRED WORLD (sustainable player's Act 2 / Piercy register)

Same camera. Same weather. The difference is content, not light.

### B1. The repair hub
A converted brick mill building in a small town, ground floor open to the street, long workbenches visible inside with people mending garments at sewing machines, bicycles leaned outside, bolts of undyed cloth stacked in the window, ordinary overcast day, market square foreground with puddles, [style tokens]

### B2. The living river
A wide slow river running clear brown-green through a post-industrial valley, the same concrete outfall pipes now dry and moss-covered, dense reeds at the waterline, a heron, two children on a rebuilt footbridge, allotments on the far bank where a factory yard was, [style tokens]

*(Deliberately the same composition as A2. In the game these are literally the same shot, decades apart. Generate both from matching seeds if Flow allows.)*

### B3. The micro-mill
A small regional textile workshop in a converted barn, a handful of modern compact looms, skeins of naturally dyed wool in ochre and madder and indigo drying on racks outside, solar panels on the roof, sheep grazing a rewilded hillside behind, overcast, [style tokens]

### B4. The clothing commons
A public library of clothes inside a former department store, long open rails organised like book stacks, people browsing unhurried, a mending counter where staff repair garments, tall windows with plain daylight, worn parquet floor, [style tokens]

### B5. The rewilded lot
A former landfill site capped and returned to meadow, the ground still visibly mounded in unnatural terraces beneath wildflowers, a gravel path with two walkers, young birch woodland at the edges, one interpretive sign too distant to read, distant town, [style tokens]

*(The mounds matter — the land remembers. This is the asymmetry made visible: repaired, not erased.)*

### B6. The festival of mending
A town square during a repair fair, stalls with garments hung for alteration, long communal tables, bunting made from offcut fabric strips in faded colours, ordinary people in durable well-worn clothes that fit them, drizzle starting, umbrellas, [style tokens]

*(Piercy's note: clothing in the good world is ceremonial, communal, made to last — and still beautiful. Nobody wears sackcloth.)*

### B7. The quiet warehouse
A small distribution warehouse at half capacity, orderly shelves with modest stock, wide empty floor swept clean, roller door open onto fields, one electric cargo van loading, the emptiness reading as sufficiency rather than failure, [style tokens]

---

## The pair that sells the whole game

If you only generate two images for the pitch deck, make it **A2 and B2** — the same river, same framing, two futures. Put them side by side over the line:

> **The world remembers what you did.**

---

## Practical notes for Flow

- Generate at 16:9 minimum; the game wants wide. If Flow supports 21:9, use it for the hinge shots.
- Batch 4 per prompt and select — the register is fragile and maybe one in four will hold the deadpan tone without drifting cinematic.
- Reject anything with: dramatic god-rays, sunset, HDR sky, centred hero figures, or visible text/signage (generated text will be gibberish).
- Keep a consistent haze level across the set — atmospheric consistency is what makes separate generations feel like one world.
- For the PoC these are placeholder-grade anyway; the keepers go in the pitch deck and the hinge. Stone Productions inherits the art direction later — this pack doubles as the brief you hand them.
