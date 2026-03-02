import type {
  Unit,
  PostingQueueItem,
  PostingLog,
  DashboardStats,
  PostingActivityDataPoint,
  UnitsByTypeDataPoint,
  DMSConfig,
  FacebookConnection,
  PostingRules,
} from "@/lib/types";

// ─── Date helpers (relative to 2026-03-01) ───────────────────────────────────

const daysAgo = (n: number): string => {
  const d = new Date("2026-03-01T00:00:00Z");
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

// ─── Units on Lot (18 records) ───────────────────────────────────────────────

export const units: Unit[] = [
  {
    id: "unit_x4m7r",
    stockNumber: "STK-24801",
    vin: "1HD1KBM14PB612341",
    year: 2024,
    make: "Harley-Davidson",
    model: "Pan America 1250 Special",
    trim: "Adventure",
    type: "Motorcycle",
    price: 21_495.00,
    mileage: 847,
    mileageUnit: "mi",
    condition: "Used",
    status: "Posted",
    photos: [
      "/photos/stk-24801-1.jpg",
      "/photos/stk-24801-2.jpg",
      "/photos/stk-24801-3.jpg",
      "/photos/stk-24801-4.jpg",
    ],
    description:
      "2024 Harley-Davidson Pan America 1250 Special in Gunship Gray. Former demo unit with full dealer service history. Adaptive ride height, cornering ABS, Android Auto compatible.",
    color: "Gunship Gray",
    dateArrived: daysAgo(34),
    datePosted: daysAgo(29),
    dateSold: null,
    fbListingId: "fb_lst_9812344",
    fbListingUrl: "https://www.facebook.com/marketplace/item/9812344",
    daysOnLot: 34,
  },
  {
    id: "unit_p9k2n",
    stockNumber: "STK-24802",
    vin: "JYARJ18EXS0019022",
    year: 2025,
    make: "Yamaha",
    model: "MT-09 SP",
    trim: undefined,
    type: "Motorcycle",
    price: 11_299.00,
    mileage: 0,
    mileageUnit: "mi",
    condition: "New",
    status: "Posted",
    photos: [
      "/photos/stk-24802-1.jpg",
      "/photos/stk-24802-2.jpg",
      "/photos/stk-24802-3.jpg",
    ],
    description:
      "Brand new 2025 Yamaha MT-09 SP. CP3 890cc engine, Öhlins semi-active suspension, Yamaha Quickshifter+. Darkish Gray/Ion Gray colorway. In stock now — financing available.",
    color: "Darkish Gray",
    dateArrived: daysAgo(18),
    datePosted: daysAgo(14),
    dateSold: null,
    fbListingId: "fb_lst_9827411",
    fbListingUrl: "https://www.facebook.com/marketplace/item/9827411",
    daysOnLot: 18,
  },
  {
    id: "unit_q1f8t",
    stockNumber: "STK-24803",
    vin: "JKAEXMF17RA027841",
    year: 2023,
    make: "Kawasaki",
    model: "KLR 650",
    trim: "Adventure",
    type: "Motorcycle",
    price: 7_249.00,
    mileage: 4_211,
    mileageUnit: "mi",
    condition: "Used",
    status: "Posted",
    photos: [
      "/photos/stk-24803-1.jpg",
      "/photos/stk-24803-2.jpg",
    ],
    description:
      "2023 Kawasaki KLR 650 Adventure — the go-anywhere dual-sport. 652cc single-cylinder, revised suspension, updated ergonomics. Trade-in, one owner, no accidents.",
    color: "Lime Green",
    dateArrived: daysAgo(47),
    datePosted: daysAgo(43),
    dateSold: null,
    fbListingId: "fb_lst_9801923",
    fbListingUrl: "https://www.facebook.com/marketplace/item/9801923",
    daysOnLot: 47,
  },
  {
    id: "unit_w3b6s",
    stockNumber: "STK-24804",
    vin: "3JBLBMAU4RF004712",
    year: 2024,
    make: "Can-Am",
    model: "Maverick X3",
    trim: "X RS Turbo RR",
    type: "UTV",
    price: 34_799.00,
    mileage: 312,
    mileageUnit: "mi",
    condition: "Used",
    status: "Posted",
    photos: [
      "/photos/stk-24804-1.jpg",
      "/photos/stk-24804-2.jpg",
      "/photos/stk-24804-3.jpg",
      "/photos/stk-24804-4.jpg",
      "/photos/stk-24804-5.jpg",
    ],
    description:
      "2024 Can-Am Maverick X3 X RS Turbo RR. 200hp Rotax engine, Fox Live Valve suspension, Smart-Lok front differential. Desert tan wrap, 15\" wheels. Low hours — barely broken in.",
    color: "Desert Tan",
    dateArrived: daysAgo(22),
    datePosted: daysAgo(17),
    dateSold: null,
    fbListingId: "fb_lst_9831044",
    fbListingUrl: "https://www.facebook.com/marketplace/item/9831044",
    daysOnLot: 22,
  },
  {
    id: "unit_r7c4v",
    stockNumber: "STK-24805",
    vin: "4XASFE574PA119834",
    year: 2023,
    make: "Polaris",
    model: "Sportsman 570 EPS",
    trim: undefined,
    type: "ATV",
    price: 7_899.00,
    mileage: 118,
    mileageUnit: "mi",
    condition: "Used",
    status: "Queued",
    photos: [
      "/photos/stk-24805-1.jpg",
      "/photos/stk-24805-2.jpg",
      "/photos/stk-24805-3.jpg",
    ],
    description:
      "2023 Polaris Sportsman 570 EPS. Electronic Power Steering, 570cc ProStar engine, 3,500 lb winch. Barely used — previous owner upgraded to 850. Ready to ride.",
    color: "Titanium Metallic",
    dateArrived: daysAgo(8),
    datePosted: null,
    dateSold: null,
    fbListingId: null,
    fbListingUrl: null,
    daysOnLot: 8,
  },
  {
    id: "unit_h2m9p",
    stockNumber: "STK-24806",
    vin: "YDV08500R525A0093",
    year: 2025,
    make: "Sea-Doo",
    model: "RXP-X 325",
    trim: undefined,
    type: "PWC",
    price: 18_299.00,
    mileage: 0,
    mileageUnit: "hrs",
    condition: "New",
    status: "Posted",
    photos: [
      "/photos/stk-24806-1.jpg",
      "/photos/stk-24806-2.jpg",
      "/photos/stk-24806-3.jpg",
      "/photos/stk-24806-4.jpg",
    ],
    description:
      "2025 Sea-Doo RXP-X 325 — the fastest production PWC on the market. 325hp Rotax engine, Ergolock seating system, launch control, Variable Trim System. Coral Blazing Orange.",
    color: "Coral Blazing Orange",
    dateArrived: daysAgo(11),
    datePosted: daysAgo(7),
    dateSold: null,
    fbListingId: "fb_lst_9844211",
    fbListingUrl: "https://www.facebook.com/marketplace/item/9844211",
    daysOnLot: 11,
  },
  {
    id: "unit_n5x1q",
    stockNumber: "STK-24807",
    vin: "2BPSSDB14SV000372",
    year: 2024,
    make: "Ski-Doo",
    model: "Summit X Expert",
    trim: "165 3.0 PowderMax E-TEC",
    type: "Snowmobile",
    price: 18_899.00,
    mileage: 0,
    mileageUnit: "hrs",
    condition: "New",
    status: "In Stock",
    photos: [
      "/photos/stk-24807-1.jpg",
      "/photos/stk-24807-2.jpg",
    ],
    description:
      "2024 Ski-Doo Summit X Expert 165 3.0 PowderMax. Rotax 850 E-TEC engine, REV Gen5 chassis, mountain-specific suspension geometry. Best deep-snow sled on the market.",
    color: "Sunburst Yellow",
    dateArrived: daysAgo(3),
    datePosted: null,
    dateSold: null,
    fbListingId: null,
    fbListingUrl: null,
    daysOnLot: 3,
  },
  {
    id: "unit_k6d3w",
    stockNumber: "STK-24808",
    vin: "56KTRAAA6L3014092",
    year: 2024,
    make: "Indian",
    model: "Scout Bobber",
    trim: "Twenty",
    type: "Motorcycle",
    price: 12_799.00,
    mileage: 1_440,
    mileageUnit: "mi",
    condition: "Used",
    status: "Relisted",
    photos: [
      "/photos/stk-24808-1.jpg",
      "/photos/stk-24808-2.jpg",
      "/photos/stk-24808-3.jpg",
    ],
    description:
      "2024 Indian Scout Bobber Twenty. 1133cc V-twin, mini-apes, blacked-out finish. Financing from $199/month. Relisted at reduced price — was $13,499.",
    color: "Black Metallic",
    dateArrived: daysAgo(58),
    datePosted: daysAgo(52),
    dateSold: null,
    fbListingId: "fb_lst_9789023",
    fbListingUrl: "https://www.facebook.com/marketplace/item/9789023",
    daysOnLot: 58,
  },
  {
    id: "unit_z8e5u",
    stockNumber: "STK-24809",
    vin: "VBKSA4429PM013877",
    year: 2023,
    make: "KTM",
    model: "890 Adventure R",
    trim: "Rally Edition",
    type: "Motorcycle",
    price: 14_499.00,
    mileage: 6_872,
    mileageUnit: "mi",
    condition: "Used",
    status: "Post Failed",
    photos: [],
    description:
      "2023 KTM 890 Adventure R Rally Edition. WP XACT suspension, 12-spoke cast wheels, Brembo brakes, TFT dash. Needs photos taken — was staged but photographer cancelled.",
    color: "Orange / Black",
    dateArrived: daysAgo(14),
    datePosted: null,
    dateSold: null,
    fbListingId: null,
    fbListingUrl: null,
    daysOnLot: 14,
  },
  {
    id: "unit_f4j7y",
    stockNumber: "STK-24810",
    vin: "4UF24ATK1PT014498",
    year: 2023,
    make: "Arctic Cat",
    model: "ZR 9000 Thundercat",
    trim: "137",
    type: "Snowmobile",
    price: 15_249.00,
    mileage: 412,
    mileageUnit: "hrs",
    condition: "Used",
    status: "Post Failed",
    photos: [
      "/photos/stk-24810-1.jpg",
    ],
    description:
      "2023 Arctic Cat ZR 9000 Thundercat 137. 998cc C-TEC2 engine, Fox Float QS3 shocks. Fast, nimble, trail-ready. One previous owner — well-maintained.",
    color: "Arctic White",
    dateArrived: daysAgo(19),
    datePosted: null,
    dateSold: null,
    fbListingId: null,
    fbListingUrl: null,
    daysOnLot: 19,
  },
  {
    id: "unit_a9g2l",
    stockNumber: "STK-24811",
    vin: "1HD1NHB10RB410012",
    year: 2024,
    make: "Harley-Davidson",
    model: "Road Glide",
    trim: "ST",
    type: "Motorcycle",
    price: 29_495.00,
    mileage: 2_104,
    mileageUnit: "mi",
    condition: "Used",
    status: "Aged",
    photos: [
      "/photos/stk-24811-1.jpg",
      "/photos/stk-24811-2.jpg",
      "/photos/stk-24811-3.jpg",
      "/photos/stk-24811-4.jpg",
    ],
    description:
      "2024 Harley-Davidson Road Glide ST. Milwaukee-Eight 117 V-twin, Screamin' Eagle exhaust, Milwaukee-Eight Stage 1 kit installed. Has been on lot 78 days — motivated seller, all offers considered.",
    color: "Vivid Black",
    dateArrived: daysAgo(78),
    datePosted: daysAgo(71),
    dateSold: null,
    fbListingId: "fb_lst_9762884",
    fbListingUrl: "https://www.facebook.com/marketplace/item/9762884",
    daysOnLot: 78,
  },
  {
    id: "unit_t3s8c",
    stockNumber: "STK-24812",
    vin: "JKAENEF12RB018723",
    year: 2024,
    make: "Kawasaki",
    model: "Z900",
    trim: "ABS",
    type: "Motorcycle",
    price: 9_749.00,
    mileage: 224,
    mileageUnit: "mi",
    condition: "Used",
    status: "Queued",
    photos: [
      "/photos/stk-24812-1.jpg",
      "/photos/stk-24812-2.jpg",
      "/photos/stk-24812-3.jpg",
    ],
    description:
      "2024 Kawasaki Z900 ABS. 948cc inline-four, Sugomi-style naked aggression, smartphone connectivity. Demo unit — dealer serviced, clean title.",
    color: "Metallic Spark Black / Metallic Flat Spark Black",
    dateArrived: daysAgo(6),
    datePosted: null,
    dateSold: null,
    fbListingId: null,
    fbListingUrl: null,
    daysOnLot: 6,
  },
  {
    id: "unit_m1v4b",
    stockNumber: "STK-24813",
    vin: "1HD4CAM10NC411748",
    year: 2025,
    make: "Harley-Davidson",
    model: "Nightster",
    trim: "Special",
    type: "Motorcycle",
    price: 14_899.00,
    mileage: 0,
    mileageUnit: "mi",
    condition: "New",
    status: "Pending Recon",
    photos: [
      "/photos/stk-24813-1.jpg",
    ],
    description:
      "2025 Harley-Davidson Nightster Special — arriving from recon this week. Revolution Max 975T engine. Reserve now, first come first served.",
    color: "Redline Red",
    dateArrived: daysAgo(4),
    datePosted: null,
    dateSold: null,
    fbListingId: null,
    fbListingUrl: null,
    daysOnLot: 4,
  },
  {
    id: "unit_c7r3h",
    stockNumber: "STK-24814",
    vin: "3JBPEAU27RF013021",
    year: 2024,
    make: "Can-Am",
    model: "Renegade 1000R",
    trim: "X XC",
    type: "ATV",
    price: 13_149.00,
    mileage: 74,
    mileageUnit: "mi",
    condition: "Used",
    status: "Posted",
    photos: [
      "/photos/stk-24814-1.jpg",
      "/photos/stk-24814-2.jpg",
      "/photos/stk-24814-3.jpg",
    ],
    description:
      "2024 Can-Am Renegade 1000R X XC. 91hp Rotax V-twin, TTA (True Trac) front differential, sport-tuned suspension. Like new — previous owner bought a Maverick instead.",
    color: "Hyper Silver",
    dateArrived: daysAgo(25),
    datePosted: daysAgo(20),
    dateSold: null,
    fbListingId: "fb_lst_9828741",
    fbListingUrl: "https://www.facebook.com/marketplace/item/9828741",
    daysOnLot: 25,
  },
  {
    id: "unit_e5u2k",
    stockNumber: "STK-24815",
    vin: "YDV08240P425B0018",
    year: 2024,
    make: "Sea-Doo",
    model: "Spark Trixx",
    trim: "3-Up",
    type: "PWC",
    price: 8_749.00,
    mileage: 38,
    mileageUnit: "hrs",
    condition: "Used",
    status: "Sold",
    photos: [
      "/photos/stk-24815-1.jpg",
      "/photos/stk-24815-2.jpg",
    ],
    description:
      "2024 Sea-Doo Spark Trixx 3-Up. 900 ACE engine, adjustable handlebar riser, surf racks. This unit is SOLD — listing retired from FB Marketplace.",
    color: "Reef Blue / Dazzling White",
    dateArrived: daysAgo(41),
    datePosted: daysAgo(36),
    dateSold: daysAgo(5),
    fbListingId: "fb_lst_9812909",
    fbListingUrl: null,
    daysOnLot: 41,
  },
  {
    id: "unit_b6p1m",
    stockNumber: "STK-24816",
    vin: "5XYAE3AF0GG112983",
    year: 2025,
    make: "Polaris",
    model: "RZR Pro R",
    trim: "Ultimate",
    type: "UTV",
    price: 38_995.00,
    mileage: 0,
    mileageUnit: "mi",
    condition: "New",
    status: "Queued",
    photos: [
      "/photos/stk-24816-1.jpg",
      "/photos/stk-24816-2.jpg",
      "/photos/stk-24816-3.jpg",
      "/photos/stk-24816-4.jpg",
    ],
    description:
      "2025 Polaris RZR Pro R Ultimate. 225hp ProStar 4-cylinder engine, Fox 3.0 Live Valve QS3 suspension, premium audio, 15\" aluminum beadlock wheels. The most powerful Polaris ever built.",
    color: "Ghost Gray",
    dateArrived: daysAgo(5),
    datePosted: null,
    dateSold: null,
    fbListingId: null,
    fbListingUrl: null,
    daysOnLot: 5,
  },
  {
    id: "unit_g8q5f",
    stockNumber: "STK-24817",
    vin: "SMTD16HF9G8641022",
    year: 2024,
    make: "Triumph",
    model: "Tiger 1200 GT Explorer",
    trim: undefined,
    type: "Motorcycle",
    price: 19_995.00,
    mileage: 3_381,
    mileageUnit: "mi",
    condition: "Used",
    status: "Posted",
    photos: [
      "/photos/stk-24817-1.jpg",
      "/photos/stk-24817-2.jpg",
      "/photos/stk-24817-3.jpg",
    ],
    description:
      "2024 Triumph Tiger 1200 GT Explorer. Triple-cylinder 1160cc, semi-active suspension, cornering ABS, heated grips + seats. Excellent touring ADV — price reduced from $21,495.",
    color: "Caspian Blue",
    dateArrived: daysAgo(36),
    datePosted: daysAgo(31),
    dateSold: null,
    fbListingId: "fb_lst_9807812",
    fbListingUrl: "https://www.facebook.com/marketplace/item/9807812",
    daysOnLot: 36,
  },
  {
    id: "unit_j2t9d",
    stockNumber: "STK-24818",
    vin: "JYARJB3E4SA029014",
    year: 2025,
    make: "Yamaha",
    model: "Grizzly 700 EPS XT-R",
    trim: undefined,
    type: "ATV",
    price: 11_499.00,
    mileage: 0,
    mileageUnit: "mi",
    condition: "New",
    status: "In Stock",
    photos: [
      "/photos/stk-24818-1.jpg",
      "/photos/stk-24818-2.jpg",
    ],
    description:
      "2025 Yamaha Grizzly 700 EPS XT-R. 686cc fuel-injected single, 3-mode 4WD, Maxxis Ceros tires, cast aluminum wheels. In-stock for spring. Aggressive pricing available.",
    color: "Tactical Black",
    dateArrived: daysAgo(2),
    datePosted: null,
    dateSold: null,
    fbListingId: null,
    fbListingUrl: null,
    daysOnLot: 2,
  },
];

// ─── Posting Queue (10 records) ───────────────────────────────────────────────

export const postingQueue: PostingQueueItem[] = [
  {
    id: "pq_a7m2r",
    unitId: "unit_r7c4v", // STK-24805 Polaris Sportsman 570 — Queued
    status: "queued",
    priority: 1,
    scheduledAt: daysAgo(-0),
    startedAt: null,
    completedAt: null,
    retryCount: 0,
    maxRetries: 3,
    errorMessage: null,
    errorType: null,
  },
  {
    id: "pq_b3k9s",
    unitId: "unit_t3s8c", // STK-24812 Kawasaki Z900 — Queued
    status: "queued",
    priority: 2,
    scheduledAt: daysAgo(-0),
    startedAt: null,
    completedAt: null,
    retryCount: 0,
    maxRetries: 3,
    errorMessage: null,
    errorType: null,
  },
  {
    id: "pq_c1n4p",
    unitId: "unit_b6p1m", // STK-24816 Polaris RZR Pro R — Queued
    status: "queued",
    priority: 3,
    scheduledAt: daysAgo(-0),
    startedAt: null,
    completedAt: null,
    retryCount: 0,
    maxRetries: 3,
    errorMessage: null,
    errorType: null,
  },
  {
    id: "pq_d8x7q",
    unitId: "unit_z8e5u", // STK-24809 KTM 890 — Post Failed (photo_upload — 0 photos)
    status: "failed",
    priority: 4,
    scheduledAt: daysAgo(2),
    startedAt: daysAgo(2),
    completedAt: daysAgo(2),
    retryCount: 3,
    maxRetries: 3,
    errorMessage: "Photo upload failed — no photos attached to this unit. Minimum 1 photo required.",
    errorType: "photo_upload",
  },
  {
    id: "pq_e5f3w",
    unitId: "unit_f4j7y", // STK-24810 Arctic Cat ZR — Post Failed (captcha)
    status: "failed",
    priority: 5,
    scheduledAt: daysAgo(1),
    startedAt: daysAgo(1),
    completedAt: daysAgo(1),
    retryCount: 3,
    maxRetries: 3,
    errorMessage: "CAPTCHA challenge triggered during Facebook Marketplace listing flow. Session paused — manual verification required.",
    errorType: "captcha",
  },
  {
    id: "pq_f9h6v",
    unitId: "unit_x4m7r", // STK-24801 HD Pan America — already posted, relist run
    status: "posted",
    priority: 1,
    scheduledAt: daysAgo(29),
    startedAt: daysAgo(29),
    completedAt: daysAgo(29),
    retryCount: 0,
    maxRetries: 3,
    errorMessage: null,
    errorType: null,
  },
  {
    id: "pq_g2l5u",
    unitId: "unit_p9k2n", // STK-24802 Yamaha MT-09 SP — posted
    status: "posted",
    priority: 1,
    scheduledAt: daysAgo(14),
    startedAt: daysAgo(14),
    completedAt: daysAgo(14),
    retryCount: 0,
    maxRetries: 3,
    errorMessage: null,
    errorType: null,
  },
  {
    id: "pq_h7j8t",
    unitId: "unit_k6d3w", // STK-24808 Indian Scout — relisted
    status: "posted",
    priority: 2,
    scheduledAt: daysAgo(7),
    startedAt: daysAgo(7),
    completedAt: daysAgo(7),
    retryCount: 1,
    maxRetries: 3,
    errorMessage: null,
    errorType: null,
  },
  {
    id: "pq_i4q1n",
    unitId: "unit_e5u2k", // STK-24815 Sea-Doo Spark — sold, listing retired
    status: "cancelled",
    priority: 99,
    scheduledAt: daysAgo(5),
    startedAt: daysAgo(5),
    completedAt: daysAgo(5),
    retryCount: 0,
    maxRetries: 1,
    errorMessage: "Unit marked Sold in DMS — listing retire action triggered automatically.",
    errorType: null,
  },
  {
    id: "pq_j6m3c",
    unitId: "unit_a9g2l", // STK-24811 HD Road Glide Aged — currently posting (live run)
    status: "posting",
    priority: 1,
    scheduledAt: daysAgo(0),
    startedAt: daysAgo(0),
    completedAt: null,
    retryCount: 0,
    maxRetries: 3,
    errorMessage: null,
    errorType: null,
  },
];

// ─── Posting Logs (18 records) ────────────────────────────────────────────────

export const postingLogs: PostingLog[] = [
  {
    id: "log_r1m9x",
    unitId: "unit_x4m7r", // STK-24801 HD Pan America
    action: "post",
    status: "success",
    timestamp: daysAgo(29),
    duration: 41_230,
    errorMessage: null,
    selectorsFailed: null,
    screenshotUrl: null,
  },
  {
    id: "log_s4k7p",
    unitId: "unit_p9k2n", // STK-24802 Yamaha MT-09
    action: "post",
    status: "success",
    timestamp: daysAgo(14),
    duration: 38_874,
    errorMessage: null,
    selectorsFailed: null,
    screenshotUrl: null,
  },
  {
    id: "log_t8n2q",
    unitId: "unit_q1f8t", // STK-24803 Kawasaki KLR
    action: "post",
    status: "success",
    timestamp: daysAgo(43),
    duration: 44_102,
    errorMessage: null,
    selectorsFailed: null,
    screenshotUrl: null,
  },
  {
    id: "log_u2b6w",
    unitId: "unit_w3b6s", // STK-24804 Can-Am Maverick X3
    action: "post",
    status: "success",
    timestamp: daysAgo(17),
    duration: 52_440,
    errorMessage: null,
    selectorsFailed: null,
    screenshotUrl: null,
  },
  {
    id: "log_v5f3e",
    unitId: "unit_z8e5u", // STK-24809 KTM 890 — photo_upload fail (attempt 1)
    action: "post",
    status: "failed",
    timestamp: daysAgo(4),
    duration: 8_312,
    errorMessage: "Photo upload step failed — unit has 0 photos attached. Playwright could not proceed past photo upload gate.",
    selectorsFailed: null,
    screenshotUrl: "/screenshots/log_v5f3e_fail.png",
  },
  {
    id: "log_w9h1v",
    unitId: "unit_z8e5u", // STK-24809 KTM 890 — photo_upload fail (attempt 2)
    action: "post",
    status: "failed",
    timestamp: daysAgo(3),
    duration: 7_984,
    errorMessage: "Photo upload step failed — unit has 0 photos attached. Retry 2/3.",
    selectorsFailed: null,
    screenshotUrl: "/screenshots/log_w9h1v_fail.png",
  },
  {
    id: "log_x3j4u",
    unitId: "unit_z8e5u", // STK-24809 KTM 890 — photo_upload fail (attempt 3 = final)
    action: "post",
    status: "failed",
    timestamp: daysAgo(2),
    duration: 8_018,
    errorMessage: "Photo upload step failed — unit has 0 photos attached. Max retries reached. Unit status set to Post Failed.",
    selectorsFailed: null,
    screenshotUrl: "/screenshots/log_x3j4u_fail.png",
  },
  {
    id: "log_y7l2d",
    unitId: "unit_f4j7y", // STK-24810 Arctic Cat — captcha fail (attempt 1)
    action: "post",
    status: "failed",
    timestamp: daysAgo(2),
    duration: 22_710,
    errorMessage: "CAPTCHA triggered at Facebook Marketplace listing form. Playwright session halted — manual session restoration required.",
    selectorsFailed: null,
    screenshotUrl: "/screenshots/log_y7l2d_captcha.png",
  },
  {
    id: "log_z1c8r",
    unitId: "unit_f4j7y", // STK-24810 Arctic Cat — captcha fail (attempt 2)
    action: "post",
    status: "failed",
    timestamp: daysAgo(1),
    duration: 19_430,
    errorMessage: "CAPTCHA triggered again after session restore attempt. Retry 2/3.",
    selectorsFailed: null,
    screenshotUrl: "/screenshots/log_z1c8r_captcha.png",
  },
  {
    id: "log_a4n5s",
    unitId: "unit_f4j7y", // STK-24810 Arctic Cat — captcha fail (attempt 3 = final)
    action: "post",
    status: "failed",
    timestamp: daysAgo(1),
    duration: 21_093,
    errorMessage: "CAPTCHA triggered — max retries reached. Unit status set to Post Failed. Manual Marketplace login required to restore session.",
    selectorsFailed: null,
    screenshotUrl: "/screenshots/log_a4n5s_captcha.png",
  },
  {
    id: "log_b8p9f",
    unitId: "unit_h2m9p", // STK-24806 Sea-Doo RXP-X
    action: "post",
    status: "success",
    timestamp: daysAgo(7),
    duration: 45_211,
    errorMessage: null,
    selectorsFailed: null,
    screenshotUrl: null,
  },
  {
    id: "log_c2q6g",
    unitId: "unit_k6d3w", // STK-24808 Indian Scout — first post attempt (session_expired)
    action: "post",
    status: "failed",
    timestamp: daysAgo(53),
    duration: 14_820,
    errorMessage: "Session cookie expired mid-run. Facebook login session was 31 days old — re-authentication required.",
    selectorsFailed: null,
    screenshotUrl: "/screenshots/log_c2q6g_session.png",
  },
  {
    id: "log_d6r3h",
    unitId: "unit_k6d3w", // STK-24808 Indian Scout — relist after session fix
    action: "relist",
    status: "success",
    timestamp: daysAgo(7),
    duration: 39_714,
    errorMessage: null,
    selectorsFailed: null,
    screenshotUrl: null,
  },
  {
    id: "log_e9s7k",
    unitId: "unit_a9g2l", // STK-24811 HD Road Glide — initial post
    action: "post",
    status: "success",
    timestamp: daysAgo(71),
    duration: 47_033,
    errorMessage: null,
    selectorsFailed: null,
    screenshotUrl: null,
  },
  {
    id: "log_f3t1l",
    unitId: "unit_a9g2l", // STK-24811 HD Road Glide — relist (aged trigger)
    action: "relist",
    status: "success",
    timestamp: daysAgo(14),
    duration: 41_880,
    errorMessage: null,
    selectorsFailed: null,
    screenshotUrl: null,
  },
  {
    id: "log_g7u4m",
    unitId: "unit_e5u2k", // STK-24815 Sea-Doo Spark — original post
    action: "post",
    status: "success",
    timestamp: daysAgo(36),
    duration: 36_912,
    errorMessage: null,
    selectorsFailed: null,
    screenshotUrl: null,
  },
  {
    id: "log_h1v8n",
    unitId: "unit_e5u2k", // STK-24815 Sea-Doo Spark — retire on sale
    action: "retire",
    status: "success",
    timestamp: daysAgo(5),
    duration: 12_340,
    errorMessage: null,
    selectorsFailed: null,
    screenshotUrl: null,
  },
  {
    id: "log_i5w2p",
    unitId: "unit_c7r3h", // STK-24814 Can-Am Renegade
    action: "post",
    status: "success",
    timestamp: daysAgo(20),
    duration: 43_571,
    errorMessage: null,
    selectorsFailed: null,
    screenshotUrl: null,
  },
];

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export const dashboardStats: DashboardStats = {
  unitsOnLot: 17,            // 18 total minus 1 sold
  unitsOnLotChange: 2.4,
  unitsPosted: 9,
  unitsPostedChange: 12.5,
  postingRate: 52.9,         // 9 / 17 * 100
  postingRateChange: 4.7,
  postQueueDepth: 3,         // queued + currently posting
  postQueueDepthChange: -1,
  postsFailed: 2,            // 2 units in Post Failed status
  postsFailedChange: 1,
  soldToday: 1,
  soldTodayChange: 0,
  agedUnits: 1,              // STK-24811 at 78 days
  agedUnitsChange: 0,
  syncFreshness: daysAgo(0), // synced today
  lastPostTime: daysAgo(0),  // posting run active
};

// ─── Posting Activity — 12 months (March 2025 – Feb 2026) ────────────────────
// Seasonality: spring spike (PWC/ATV season), Q4 dip (snowmobile inventory shift),
// holiday slowdown December, strong January-February for snowmobile postings.

export const postingActivity: PostingActivityDataPoint[] = [
  { month: "Mar", posted: 28, failed: 2, relisted: 4 },   // spring season opens
  { month: "Apr", posted: 34, failed: 3, relisted: 6 },   // peak ATV/UTV buying
  { month: "May", posted: 39, failed: 1, relisted: 7 },   // peak PWC season
  { month: "Jun", posted: 31, failed: 2, relisted: 5 },   // summer plateau
  { month: "Jul", posted: 29, failed: 4, relisted: 6 },   // mid-summer stability
  { month: "Aug", posted: 26, failed: 2, relisted: 4 },   // late summer
  { month: "Sep", posted: 22, failed: 1, relisted: 3 },   // season winds down
  { month: "Oct", posted: 19, failed: 3, relisted: 2 },   // transitional — snowmobiles arriving
  { month: "Nov", posted: 17, failed: 5, relisted: 3 },   // sled inventory posting ramp
  { month: "Dec", posted: 14, failed: 4, relisted: 2 },   // holiday slowdown
  { month: "Jan", posted: 22, failed: 3, relisted: 5 },   // snowmobile peak + year-start bikes
  { month: "Feb", posted: 26, failed: 2, relisted: 4 },   // spring pre-season buying starts
];

// ─── Units by Type — inventory breakdown ─────────────────────────────────────

export const unitsByType: UnitsByTypeDataPoint[] = [
  { type: "Motorcycle", count: 8,  posted: 5 },
  { type: "UTV",        count: 3,  posted: 2 },
  { type: "ATV",        count: 3,  posted: 2 },
  { type: "PWC",        count: 2,  posted: 1 },
  { type: "Snowmobile", count: 2,  posted: 0 },
];

// ─── DMS Configuration ────────────────────────────────────────────────────────

export const dmsConfig: DMSConfig = {
  systemName: "Lightspeed EVO",
  host: "dms.dealership-internal.local",
  port: 5432,
  username: "lsevo_export",
  filePath: "/exports/inventory/lsevo_inventory_feed.csv",
  format: "CSV",
  lastSync: daysAgo(0),
  status: "connected",
  syncIntervalMinutes: 60,
};

// ─── Facebook Connection ──────────────────────────────────────────────────────

export const facebookConnection: FacebookConnection = {
  status: "connected",
  lastVerified: daysAgo(0),
  profileName: "Thunder Ridge Powersports",
  profileUrl: "https://www.facebook.com/thunderridgepowersports",
  marketplaceSellerId: "mp_seller_819234",
  captchaTriggered: true, // triggered during Arctic Cat run — not yet resolved
};

// ─── Posting Rules ────────────────────────────────────────────────────────────

export const postingRules: PostingRules = {
  autoPostEnabled: true,
  maxPostsPerDay: 12,
  delayBetweenPosts: 90,        // 90 seconds between runs — avoids rate limiting
  postingSchedule: {
    startHour: 8,               // 8 AM
    endHour: 20,                // 8 PM
    activeDays: [1, 2, 3, 4, 5, 6], // Mon–Sat (0=Sun)
  },
  autoRemoveSold: true,
  autoRelistExpired: true,
  photoMinimum: 2,
  agedThresholdDays: 60,        // relist units after 60 days on lot
};

// ─── Lookup Helpers ───────────────────────────────────────────────────────────

export const getUnitById = (id: string): Unit | undefined =>
  units.find((u) => u.id === id);

export const getUnitByStockNumber = (stockNumber: string): Unit | undefined =>
  units.find((u) => u.stockNumber === stockNumber);

export const getQueueItemsByUnit = (unitId: string): PostingQueueItem[] =>
  postingQueue.filter((q) => q.unitId === unitId);

export const getLogsByUnit = (unitId: string): PostingLog[] =>
  postingLogs.filter((l) => l.unitId === unitId);

export const getUnitsByStatus = (status: Unit["status"]): Unit[] =>
  units.filter((u) => u.status === status);

export const getUnitsByType = (type: Unit["type"]): Unit[] =>
  units.filter((u) => u.type === type);

export const getFailedQueueItems = (): PostingQueueItem[] =>
  postingQueue.filter((q) => q.status === "failed");

export const getAgedUnits = (): Unit[] =>
  units.filter((u) => u.daysOnLot >= 60 && u.status !== "Sold" && u.status !== "Wholesale");
