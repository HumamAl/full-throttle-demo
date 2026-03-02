# Domain Knowledge Brief — Multi-Brand Powersport Dealership (Facebook Marketplace Automation)

## Sub-Domain Classification

Independent multi-brand powersport dealership (50–300 units on-lot, 2–8 sales staff) using a DMS system (Lightspeed EVO, DX1, DealerClick, or ZiiDMS) with FTP inventory exports. The operation sells new and used motorcycles, ATVs, UTVs, PWC, and snowmobiles. The pain: manually posting each unit to Facebook Marketplace is tedious and inconsistent. Full Throttle is a desktop app (Tauri + Svelte + Playwright) that reads the DMS FTP feed and automates Facebook Marketplace listings.

---

## Job Analyst Vocabulary — Confirmed and Extended

The Job Analyst vocabulary is accurate. Below is the expanded and confirmed set.

### Confirmed Primary Entity Names

These are the words that must appear in every UI label — sidebar nav, table headers, KPI card titles, status badges, search placeholders.

- Primary record type: **unit** (not "vehicle", not "listing", not "product" — dealers call everything a "unit")
- Secondary record: **listing** (a unit that has been posted to Facebook Marketplace becomes a "listing")
- Inventory location: **lot** or **floor** (not "warehouse" or "store")
- People roles: **sales rep** or **floor rep** (not "employee"); **desk manager** or **F&I manager** (Finance & Insurance); **BDC rep** (Business Development Center — handles internet leads)
- Unit identifier: **stock number** or **stock #** (dealer-assigned, format: `STK-XXXXX`, e.g. `STK-24817`) — distinct from VIN
- Incoming unit: **acquisition** or **trade-in** (used units arriving from customers)
- Unit leaving lot: **sold unit** or **retailed unit**
- Aged unit: a unit on lot 60+ days, tracked as **aged inventory**
- DMS export file: **inventory feed** or **FTP feed** (the CSV/XML drop from the DMS)
- Posting the unit: **list**, **push to Marketplace**, or **post** — not "publish" or "upload"

### Expanded KPI Vocabulary

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Units On Lot | Total inventory count at any moment | count |
| Units Posted | Count of units with active FB Marketplace listings | count |
| Posting Rate | Units Posted / Units On Lot | % |
| Days to Post | Calendar days from unit arriving on lot to first FB listing | days (avg) |
| Aged Units | Count of units on lot 60+ days | count |
| Aged % | Aged Units / Total Units On Lot | % |
| Turn Rate | Units sold annually / avg units on lot | ratio (e.g. 8x) |
| Days to Sell | Calendar days from lot arrival to retail sale | days (avg) |
| Sync Freshness | Minutes since last FTP feed pull | minutes / "Live" |
| Posting Success Rate | Successful posts / total attempted posts | % |
| Post Queue Depth | Units staged and ready to post, not yet submitted | count |
| Leads Generated | Facebook Marketplace inquiries attributed to listings | count |
| Cost per Lead | Facebook ad spend / leads (if boosted listings) | $ |
| Avg Unit Price | Total inventory value / units on lot | $ |
| F&I PVR | Finance & Insurance profit per unit retailed | $ ($800–$2,000) |

### Status Label Vocabulary

Exact status strings for inventory unit lifecycle — use verbatim in data tables, badges, and filter dropdowns:

**Active states (unit on lot and available):**
- `In Stock` — arrived, in DMS, not yet posted
- `Queued` — staged in Full Throttle posting queue, pending automation run
- `Posting` — Playwright session actively filling form fields (transient state)
- `Posted` — active listing live on FB Marketplace
- `Relisted` — listing was refreshed / reposted after expiry
- `Demo Unit` — staff or customer test-ride unit, not listed publicly

**Problem states:**
- `Post Failed` — automation attempted but FB rejected or errored
- `Aged` — on lot 60+ days without sale, flagged for price reduction or promo
- `Pending Recon` — recently acquired, undergoing reconditioning before listing
- `On Hold` — internally reserved or under sales offer
- `Floor Plan Expired` — unit's financing term approaching, priority to sell

**Terminal states:**
- `Sold` — retail sale completed, removed from listing
- `Wholesale` — sold to another dealer or at auction (never listed publicly)
- `Transferred` — moved to another rooftop/location

### Workflow and Action Vocabulary

Verbs used in this domain — these become button labels, action menu items, and empty state messages:

**Primary actions:**
- `Sync Feed` — pull latest inventory from DMS FTP server
- `Post` — send unit through Playwright to FB Marketplace
- `Relist` — refresh an expired or stale listing
- `Retire Listing` — mark a sold unit and remove from FB
- `Flag for Recon` — mark unit as needing service before listing
- `Boost Listing` — apply Facebook Ads budget to an existing listing

**Secondary actions:**
- `Preview Listing` — show what the FB post will look like before submitting
- `Edit Description` — override auto-generated description text
- `Reprice` — update asking price and push updated listing
- `Export Report` — download posting activity as CSV
- `Skip Unit` — exclude a unit from auto-posting (manual hold)
- `Mark Sold` — trigger sold workflow: retire listing, update DMS status

### Sidebar Navigation Candidates

These use domain vocabulary — not generic "Dashboard / Analytics / Settings":

- `Inventory` (units on lot, sync status, filter by type/status)
- `Post Queue` (units staged to post, bulk actions, run automation)
- `Active Listings` (live FB Marketplace listings, relist / boost actions)
- `Sync History` (FTP pull log, last sync time, delta report)
- `Settings` (FTP credentials, FB session, posting delays, templates)

A `Reports` page is secondary; most dealers want the operational queue view, not analytics.

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

Powersport dealerships live in a world of raw machinery — engines, chrome, mud, track days, and octane. The practitioners (sales reps, desk managers, BDC reps) who would use Full Throttle are NOT office workers. They are gearheads who happen to run a business. The software aesthetic must match that identity while remaining functional.

The gold standard for this domain is dark, dense, and purposeful. Think: a truck driver's GPS display, a Garmin head unit, or the DMS login screens that Lightspeed EVO and DX1 actually use — not polished consumer apps. These practitioners respond to tools that feel like they were "built for the shop floor, not a boardroom." Orange and amber accents are deeply authentic here — they map directly to the color language of OEM brands (KTM is orange, Husqvarna is yellow-orange, warning indicators are amber) and the general gearhead palette.

A desktop Tauri app has more latitude than a browser app — it can go full dark, use tighter chrome, and pack more density into a screen. Think Samsara fleet management meets McLeod TMS meets a DJI drone controller UI. Status indicators, live sync pulses, and automation progress bars are expected features, not decorations. A practitioner seeing a pulsing "Syncing FTP..." indicator with amber dot animation will immediately recognize it as a tool that "gets" their world.

### Real-World Apps Clients Would Recognize as "Premium"

1. **Samsara Fleet Dashboard** — Dark, amber-accented, dense tabular data with real-time status pulses. Exactly what a powersport inventory ops dashboard should feel like. Practitioners in the transportation-adjacent space know Samsara as the "good tool."

2. **DX1 DMS** — The industry-native DMS UI is functional but dated. Full Throttle's demo should feel like "what DX1 would look like if a modern dev team rebuilt it." Practitioners immediately recognize the vocabulary (stock numbers, unit types, recon status) and appreciate a cleaner execution.

3. **Lightspeed EVO** — The dominant DMS for powersports. Heavy, dense, data-rich. Full Throttle should feel like a specialized companion app that Lightspeed users would reach for when Lightspeed's own FB posting workflow fails or doesn't exist.

### Aesthetic Validation

- **Job Analyst chose**: Dark Premium
- **Domain validation**: Confirmed strongly. Powersport dealer operations are a dark-UI native environment. The industry's own tools (DMS systems, floor management boards) lean toward dark-on-dark with colored status indicators. Dark Premium is exactly right. Amber/orange as the primary accent color is more authentic than electric blue — orange is the industry's own accent (KTM, warning states, "go" signals on dashboards).
- **One adjustment**: Lean the primary accent toward **amber-orange** (`oklch(0.72 0.18 55)` range) rather than default blue-violet Dark Premium. This is a mechanical/industrial dark tool, not an AI/cybersecurity app.

### Format Validation

- **Job Analyst chose**: `dashboard-app` (sidebar layout)
- **Domain validation**: Confirmed — this is a desktop utility app. A sidebar navigation model with an operational main panel is exactly right. The sidebar gives dealers quick access to Inventory / Post Queue / Active Listings without a page reload. No phone frame, no landing page — this is a power-user tool.
- **Format-specific design notes for Demo Screen Builder**: The main dashboard should feel like an ops center — stat bar at top (units on lot, posted count, aged count, last sync time), a large inventory table below with inline status badges and action buttons. A "Run Post Queue" CTA with automation progress visualization is the hero interaction. Real-time or simulated animation of Playwright posting (typing into fields, clicking submit) would be a standout feature for the demo.

### Density and Layout Expectations

**Dense, but not chaotic.** Powersport dealers need to see the full inventory list at a glance — 50-150 rows is normal. They need compact rows with key fields visible: Stock #, Year, Make, Model, Type, Price, Status, Days on Lot, Actions.

The layout is **list-heavy** (inventory tables are the primary surface) with a secondary card area for posting queue. Think: stock status grid + action queue + sync status bar. Not card-based profiles — these are units, not people.

---

## Entity Names (10+ realistic names)

### Dealership / Company Names

Real naming conventions for multi-brand powersport dealers:

1. Ridgeline Powersports — Bozeman, MT
2. Thunder Basin Motorsports — Gillette, WY
3. High Desert PowerSports — Albuquerque, NM
4. Cascade Powersports — Bend, OR
5. Bayou Motorsports — Baton Rouge, LA
6. Iron Horse Powersports — Knoxville, TN
7. Peak Performance Motorsports — Colorado Springs, CO
8. Badlands PowerSports — Rapid City, SD
9. Suncoast Motorsports — Tampa, FL
10. Frontier Powersports — Billings, MT

### People Names (Sales Reps, BDC Reps, Desk Managers)

Workforce demographics skew male-dominated with regional variety:

1. Travis Holt (Sales Rep)
2. Jordan Kessler (Sales Rep)
3. Mike Delgado (Desk Manager)
4. Amber Fowler (BDC Rep)
5. Cody Barnett (Sales Rep)
6. Layla Simmons (F&I Manager)
7. Derek Pruitt (Sales Rep)
8. Heather Vu (BDC Rep)
9. Shane Whitfield (Service Manager)
10. Carlos Mendez (Parts Manager)

### Vehicle Units — Realistic Models Per Type

**Motorcycles:**
- 2024 Harley-Davidson Street Glide Special (STK-24201) — $26,999
- 2023 Yamaha MT-09 (STK-23847) — $9,399 used
- 2024 Kawasaki Ninja ZX-6R (STK-24315) — $10,999
- 2022 Honda CB500F (STK-22091) — $5,799 used
- 2024 Indian Scout Bobber (STK-24188) — $14,249
- 2024 BMW R 1250 GS Adventure (STK-24412) — $22,495
- 2023 Ducati Monster (STK-23554) — $11,795 used
- 2025 Triumph Tiger 900 (STK-25002) — $15,600

**ATVs:**
- 2024 Polaris Sportsman 570 (STK-24307) — $8,199
- 2024 Can-Am Outlander 700 (STK-24388) — $11,299
- 2023 Honda FourTrax Foreman (STK-23901) — $7,599 used
- 2024 Yamaha Grizzly 700 EPS (STK-24229) — $10,699

**UTVs / Side-by-Sides:**
- 2024 Polaris RZR Pro XP (STK-24501) — $24,799
- 2024 Can-Am Maverick X3 (STK-24488) — $26,199
- 2023 Yamaha Wolverine RMAX4 (STK-23712) — $21,499 used
- 2025 Honda Pioneer 1000-6 Crew (STK-25011) — $19,990
- 2024 Kawasaki Teryx KRX4 1000 (STK-24633) — $23,299

**PWC (Personal Watercraft):**
- 2024 Sea-Doo RXP-X 325 (STK-24801) — $17,299
- 2024 Yamaha WaveRunner FX SVHO (STK-24822) — $18,599
- 2023 Kawasaki Jet Ski Ultra 310R (STK-23980) — $16,899 used

**Snowmobiles:**
- 2024 Ski-Doo Renegade X-RS 850 (STK-24901) — $16,799
- 2025 Polaris PRO RMK 850 (STK-25101) — $17,199
- 2023 Arctic Cat ZR 9000 Thundercat (STK-23771) — $12,999 used

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Units on lot (small dealer) | 35 | 80 | 150 | Multi-brand, all types |
| Units on lot (medium dealer) | 100 | 200 | 350 | Multi-rooftop possible |
| Avg motorcycle sale price (new) | $6,500 | $13,200 | $30,000+ | Excludes Harley touring |
| Avg motorcycle sale price (used) | $3,200 | $7,800 | $16,000 | Post-2022 depreciation |
| Avg UTV sale price (new) | $12,000 | $19,500 | $28,000 | Can-Am/Polaris flagships |
| Avg ATV sale price (new) | $5,500 | $9,200 | $14,000 | |
| Avg PWC sale price (new) | $9,000 | $14,500 | $20,000 | Sea-Doo, Yamaha, Kawasaki |
| Avg snowmobile price (new) | $11,000 | $15,500 | $22,000 | |
| Days to sell (used unit) | 12 | 34 | 75+ | 60+ = aged |
| Aged inventory % | 8% | 18% | 35%+ | Needs Work threshold: >25% |
| Unit turn rate (motorcycle/year) | 6x | 8x | 12x | Scooters turn fastest |
| Unit turn rate (UTV/year) | 4x | 6x | 8x | |
| FTP sync frequency | 4h | 1–2h | Real-time | Depends on DMS tier |
| FB Marketplace posting time (manual) | 8 min | 12 min | 20 min | Per unit, with photos |
| FB Marketplace posting time (automated) | 45 sec | 90 sec | 3 min | Playwright with delays |
| Units posted per day (manual staff) | 3 | 6 | 12 | |
| Units posted per day (Full Throttle) | 15 | 30 | 60 | With rate limiting |
| Lead-to-sale conversion (FB Marketplace) | 4% | 8% | 15% | Used units convert higher |
| F&I PVR | $650 | $1,100 | $2,000 | Per retailed unit |
| Inventory floor plan cost (monthly) | — | ~$65/unit | — | Daily interest accrual |

---

## Industry Terminology Glossary

| Term | Definition | Usage Context |
|------|-----------|---------------|
| Unit | Any powersport vehicle (motorcycle, ATV, UTV, PWC, snowmobile) | Universal at dealership — "how many units do we have?" |
| Stock # / STK | Dealer-assigned identifier, format STK-XXXXX | Primary key in DMS and all listing systems |
| VIN | Vehicle Identification Number (17 chars, NHTSA standard) | Unit identification for title, registration, lien checks |
| Floor Plan | Short-term credit line from lender to fund new unit inventory | Interest accrues daily; aged units = expensive floor plan cost |
| Recon / Reconditioning | Service work on a used/trade unit before sale: inspect, clean, repair | Used units go through recon before listing |
| Time-to-Line | Days from unit arrival to first public listing | KPI: excellent < 3 days, good < 5 days |
| Aged Unit | Unit on lot 60+ days without sale | Price reduction candidates; floor plan cost pressure |
| Demo Unit | Showroom or test-ride unit not available for immediate sale | Marked as Demo Unit status, usually excluded from FB posts |
| Trade-In / Trade | Used unit acquired from a customer in exchange for a new purchase | Arrives unreconditioned; must go through recon workflow |
| Wholesale | Selling a unit to another dealer or at auction, not to end consumer | Used for aged or damaged units that won't retail profitably |
| F&I / Finance & Insurance | Department that sells financing, extended warranties, accessories | F&I PVR = per-unit revenue from F&I products |
| BDC | Business Development Center — team that handles internet/phone leads | BDC rep responds to FB Marketplace inquiries |
| MSRP | Manufacturer's Suggested Retail Price | Starting price on new units; used units priced via KBB or NADA |
| OTD / Out the Door | Final price including all fees, taxes, registration | What buyers actually pay; FB listing shows "asking price" |
| Holdback | Manufacturer rebate paid to dealer after a unit sells | 2–3% of MSRP; part of dealer gross calculation |
| Desk / Work a Deal | Finance manager's process of structuring the sale terms | "Desking a deal" = working payment/trade/price combinations |
| Pack | Internal cost added to a unit before calculating sales commission | e.g. "there's a $200 pack on that unit" |
| FTP Feed | Automated file transfer from DMS to third-party platforms | CSV/XML with all inventory fields; scheduled pull |
| DMS | Dealer Management System — the core dealership ERP | Lightspeed EVO, DX1, DealerClick, ZiiDMS, EverLogic |
| OEM | Original Equipment Manufacturer — Harley, Yamaha, Polaris, BRP, etc. | "OEM-provided specs", "OEM price files" |
| BRP | Bombardier Recreational Products — makes Can-Am, Sea-Doo, Ski-Doo | Major powersport OEM; multi-brand across UTV, PWC, snowmobile |
| Year/Make/Model | The three-field identifier for any unit (e.g. 2024 / Kawasaki / Ninja ZX-6R) | Standard across all DMS and FB Marketplace forms |
| CC | Cubic centimeters — engine displacement, primary spec for motorcycles/ATVs | "650cc bike", "1000cc UTV" |
| Hours | Engine hours logged on UTVs/ATVs/PWC (replaces mileage) | UTVs under 200 hours = low; over 600 hours = high |

---

## Common Workflows

### Workflow 1: FTP Sync + Auto-Post (Core Full Throttle Flow)

1. Full Throttle connects to dealer's DMS FTP server on schedule (every 1–2 hours)
2. DMS drops updated inventory CSV/XML (fields: StockNum, VIN, Year, Make, Model, Trim, Type, Color, Price, Mileage/Hours, Condition, Description, PhotoURLs, Status)
3. Full Throttle diffs the new feed against its local inventory cache — identifies new units, price changes, sold units
4. New units (status = In Stock) are added to the Post Queue with status `Queued`
5. Sold units (status = Sold in DMS) trigger listing retirement workflow
6. User reviews Post Queue, can override price or description before posting
7. User clicks "Run Queue" — Full Throttle launches Playwright, navigates to FB Marketplace
8. For each queued unit: navigates to Create Listing → Vehicles for Sale → fills Year, Make, Model, Price, Mileage, Condition, Description, uploads photos, submits
9. Status updates to `Posted`, listing URL is stored
10. Dashboard reflects updated counts: posted, queued, failed

### Workflow 2: Manual Relist / Reprice

1. Dealer notices aged unit (60+ days, shown in Aged Inventory list)
2. Decides to reduce price by $500 and relist
3. Opens unit in Full Throttle, edits asking price
4. Clicks "Relist" — Playwright updates existing FB listing or creates new one
5. Status updates to `Relisted`, new timestamp recorded
6. Days on Lot counter resets on the listing (FB surfaces fresh listings)

### Workflow 3: Post Failed Recovery

1. Playwright session encounters FB rate limit, login challenge, or form field error
2. Unit status → `Post Failed`, error reason logged (e.g., "Photo upload timeout", "Session expired — re-authenticate")
3. Dashboard shows failed units in a red-badged alert panel
4. User sees one-click "Retry" action for each failed unit
5. For session expiry: user re-authenticates FB in settings panel, then retries
6. Full Throttle retries with exponential backoff: wait 5 min → 15 min → 30 min

---

## Common Edge Cases

1. **Session Expired** — Facebook requires re-authentication mid-queue run. Posting halts, user must re-auth in the Settings FB Session panel. Affects all queued units in that run.
2. **Duplicate Listing** — Unit was already posted manually by a staff member. Full Throttle detects conflict on submission (FB returns "similar listing found"). Status = `Post Failed`, reason = "Possible duplicate".
3. **Missing Photos** — DMS feed includes a unit with no photo URLs. Full Throttle flags it as `Pending Photos` — won't post without images (FB requires minimum 1 photo; listings without photos get minimal visibility).
4. **Sold Mid-Queue** — Unit sells while it's in the Post Queue. Full Throttle detects DMS status change on next sync and removes from queue before posting.
5. **Aged Flood** — End of season (September for motorcycles, April for snowmobiles) brings 20–30 units crossing 60-day threshold at once. Aged % spikes, dashboard shows red warning indicator.
6. **Rate Limited by FB** — Posting too many units per hour triggers Facebook temporary lockout. Error: "You're posting too quickly." Full Throttle needs configurable delay between posts (default: 90-second delay, configurable 45–300 seconds).
7. **Price Below Floor Plan** — Unit's current asking price is less than the floor plan payoff. Shows `Price Warning` badge. Dealer should not post until price is corrected.
8. **New OEM Model Year Drop** — October/November: OEM pushes new model year data. DMS feed may include units with year+1 (e.g. 2026 model arriving in fall 2025). Full Throttle must handle future-year model data without errors.

---

## What Would Impress a Domain Expert

1. **Floor Plan Awareness**: Showing "Days on Floor Plan" alongside "Days on Lot" is something only someone who knows dealer operations would include. Floor plan interest accrues daily — a unit that's been on floor plan 90 days has cost the dealer real money. A badge showing `Floor Plan: 87 days / ~$182 accrued` would make a dealer's eyes light up.

2. **FB Session Health Indicator**: Every dealer who has tried to automate FB knows the #1 failure mode is session expiry and CAPTCHA challenges. A dedicated "FB Session: Active / Needs Re-auth" status widget in the sidebar — with a pulsing green dot when healthy — shows the developer understands where automation breaks.

3. **Photo Count Validation**: FB Marketplace listing quality is directly tied to photo count. Industry best practice is 8-15 photos per unit. Full Throttle showing a `Photos: 3 / 8 recommended` warning on a unit before posting signals deep knowledge of what makes an effective FB listing vs. a dead one.

4. **Posting Delay Configuration**: Dealers who've tried manual automation quickly learn that posting 30 units in a row gets their account flagged. The concept of "posting cadence" — spreading posts over hours with random delays to appear human — is an insider technique. A settings panel with `Delay between posts: 90 seconds (recommended: 45–300)` proves the developer has actually thought through FB's rate-limit behavior.

5. **Type-Specific FB Categories**: FB Marketplace has different listing flows for "Motorcycles" vs. "Powersports" vs. "Boats & PWC". A dealer posting a Sea-Doo in the wrong category gets zero traffic. Full Throttle mapping unit types to the correct FB category (Motorcycle → "Motorcycles", UTV/ATV → "Powersport Vehicles", Sea-Doo → "Boats & Watercraft") is non-obvious and high-value.

---

## Common Systems & Tools Used

| System | Role |
|---|---|
| **Lightspeed EVO** | Primary DMS for powersports (dominant market share) — inventory, parts, service, accounting |
| **DX1** | All-in-one DMS + website for powersport dealers — popular with smaller multi-brand stores |
| **DealerClick** | Cloud DMS with built-in FTP export; popular for independent dealers |
| **ZiiDMS** | Powersports + marine DMS with modern UI; growing share |
| **EverLogic** | DMS targeting small independent powersport dealers |
| **Cycle Trader / ATV Trader / PWC Trader** | Classified listing sites (like Cars.com for powersports); DMS often auto-posts here |
| **Facebook Marketplace** | Primary free lead source for used units; organic traffic, no listing fees |
| **Craigslist** | Secondary free classifieds; still used by many small dealers |
| **CycleTrader Media** | Industry KPI and analytics publication; dealers use for benchmarking |
| **NCM Associates** | Dealer 20-group benchmarking; publishes powersports performance standards |
| **KBB Powersports / NADA Guides** | Used unit valuation tools; used to price trades and listings |
| **Snowmobile Trader / Boat Trader** | Segment-specific classifieds; separate from the main ATV/Motorcycle platforms |

---

## Geographic / Cultural Considerations

Powersport dealership density and seasonality is strongly regional:

- **Sun Belt (FL, TX, AZ, CA)**: Year-round riding, high PWC sales, snowmobile is irrelevant. Highest inventory velocity.
- **Mountain West (CO, MT, WY, UT, ID)**: Strong snowmobile + ATV/UTV market, seasonal but intense peak.
- **Midwest (MN, WI, MI)**: Snowmobile-strong, spring motorcycle rush, hunting ATV/UTV demand.
- **Pacific Northwest (OR, WA)**: Moderate motorcycle market, adventure/dual-sport focus (BMW, KTM).
- **Southeast (TN, GA, NC)**: Strong cruiser/Harley market, ATV trail riding, no snowmobile.

Seasonal patterns for mock data:
- **Q1 (Jan–Mar)**: Slow. Floor plan pressure. Used unit price bottoms. Dealers acquire inventory for spring.
- **Q2 (Apr–Jun)**: Peak season. FB Marketplace lead volume highest. Post queue max depth. Posting automation most valuable.
- **Q3 (Jul–Sep)**: Strong sales but inventory thinning. Trade-ins arrive. Used listings peak.
- **Q4 (Oct–Dec)**: New model year arrivals. Snowmobile peaks (northern dealers). Motorcycle/ATV slows. Aged unit clearance pressure.

Default demo context: mid-sized multi-brand dealer in the Mountain West or Southeast, ~120 units on lot, active spring/summer season (Q2), high posting velocity.

---

## Data Architect Notes

- **Primary entity**: `Unit` with fields: `stockNumber` (format: `STK-XXXXX`), `vin`, `year`, `make`, `model`, `trim`, `type` (enum: `Motorcycle | ATV | UTV | PWC | Snowmobile | Scooter`), `condition` (enum: `New | Used | Demo`), `color`, `price`, `mileage` (for motos), `hours` (for UTVs/ATVs/PWC), `daysOnLot`, `status` (enum: `In Stock | Queued | Posting | Posted | Relisted | Post Failed | Pending Recon | On Hold | Sold | Wholesale`), `postedAt`, `listingUrl`, `photoCount`, `floorPlanDays`, `description`
- **Secondary entity**: `PostingLog` — a record per posting attempt: `unitId`, `attemptedAt`, `success`, `errorReason`, `durationSeconds`, `listingUrl`
- **Sync entity**: `SyncEvent` — each FTP pull: `syncedAt`, `newUnits`, `updatedUnits`, `soldUnits`, `duration`, `status`
- Revenue per unit: use price ranges from the metric table above. Avoid round numbers. E.g. `$9,847` not `$10,000`.
- Mileage for used motorcycles: low = 1,200–4,500 mi, medium = 5,000–15,000 mi, high = 16,000–35,000 mi
- Hours for UTVs/ATVs: low = 45–150 hrs, medium = 200–500 hrs, high = 600–1,200 hrs
- Status distribution for a realistic 120-unit lot: ~45% In Stock (unposted), ~35% Posted, ~8% Queued, ~5% Post Failed, ~4% Pending Recon, ~2% Demo Unit, ~1% On Hold
- Edge cases to include: 3–5 units with `Post Failed`, 2–3 units with `photoCount < 3`, 4–6 units with `daysOnLot > 60` (Aged), 1–2 units with `floorPlanDays > 90`, 1 unit with `Pending Recon`
- Use STK prefix for all stock numbers: `STK-24817`, `STK-23091`, etc. Year prefix convention (STK-24xxx = 2024 acquisition)
- Date patterns: daysOnLot is derived from `arrivedAt` date. Mix: fresh arrivals (1–5 days), normal (15–45 days), aged (60–95 days)

## Layout Builder Notes

- **Density**: Compact. Practitioners work in DMS systems all day — dense rows are normal and expected. Use `--content-padding: 1rem`, `--card-padding: 0.875rem`. Inventory table rows should be tight: 36–40px row height.
- **Sidebar**: Standard width (16rem). Nav items are 5 — fits without overflow.
- **Color system**: Primary = amber-orange (`oklch(0.72 0.18 55)` — warm amber). Background = near-black (`oklch(0.08 0.015 55)`). Cards = dark surface (`oklch(0.12 0.02 55)`). Borders = subtle (`oklch(0.20 0.025 55)`).
- **Status badge colors**: `Posted` = green, `Queued` = blue, `Post Failed` = destructive red, `Aged` = amber, `Pending Recon` = gray, `Posted` = success green, `In Stock` = muted white/silver
- **Sidebar accent**: Use amber-orange for active nav item, pulsing dot on "Sync" status
- **Typography**: Geist Mono for stock numbers, prices, VINs, timestamps — monospace makes these scan faster in a table
- **Motion**: 100–150ms snappy. No theatrical animations. This is a utility, not a marketing app.
- **Borders**: Subtle — `border-border/30` on cards. Table row dividers `border-border/20`.
- **Frame**: No frame component — this is a dashboard-app format. Full sidebar layout.

## Demo Screen Builder Notes

- **Hero metric** (largest stat card): `Units Posted` count with percentage coverage (e.g., "87 Posted / 73% of lot")
- **Second most important**: `Post Queue` — count of units ready to post, with a "Run Queue" CTA button. This is the core action of the app.
- **Third**: `Post Failed` — red badge count with alert styling
- **Fourth**: `Sync Freshness` — "Last sync: 8 min ago" with pulsing amber dot when syncing
- **Primary chart**: Posting activity over time — bar chart by day, last 30 days, showing `units posted` (green) and `post failed` (red). X-axis = date, Y-axis = count. This shows the automation is actually working.
- **Secondary panel**: Inventory status breakdown — a donut or horizontal stacked bar showing In Stock / Posted / Queued / Failed / Other. Quick visual of lot coverage.
- **Domain-specific panel**: The "Post Queue" panel is the killer feature — a table of queued units with preview of the FB listing data (photo thumbnail, unit name, price, status badge) and inline "Post Now" / "Skip" actions. This is what makes the demo feel real and operational.
- **Animation idea**: Simulate a live Playwright posting run — progress bar with status text cycling through "Navigating to Marketplace... Filling Year/Make/Model... Uploading photos (3/8)... Submitting... Posted!" — this is the visceral demo moment.
- **Bottom banner**: "This is a working demo of the Full Throttle inventory automation tool built for your project" — link to /challenges and /proposal
