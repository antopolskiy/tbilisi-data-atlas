export type IdeaLens =
  | "Everyday life"
  | "Care & access"
  | "Civic accountability"
  | "Environment & memory";

export type IdeaTempo = "Live" | "Mixed cadence" | "Reference-led";

export interface Idea {
  slug: string;
  title: string;
  lens: IdeaLens;
  tempo: IdeaTempo;
  question: string;
  summary: string;
  connection: string;
  reveal: string;
  mvp: string;
  boundary: string;
  sourceSlugs: string[];
  featured?: boolean;
}

export const ideas: Idea[] = [
  {
    slug: "protection-exists-on-paper",
    title: "Protection Exists on Paper",
    lens: "Environment & memory",
    tempo: "Mixed cadence",
    question: "Which protected place deserves a closer human inspection?",
    summary:
      "Place a monument’s legal status beside its most recent public photographs, map edits, and news signals—without turning those traces into an automated damage verdict.",
    connection:
      "Legal protection is a static administrative fact. Photographs, infrastructure edits, and reporting are imperfect but more recent public traces. Their different clocks make missing observation visible.",
    reveal:
      "Select one familiar site and compare three panels: protected in law, last publicly photographed, and recent public signals nearby—each labeled with time, distance, and provenance.",
    mvp:
      "Ten curated Tbilisi sites, bundled registry rows and photographs, one evidence timeline, and a map. AI may translate or summarize retrieved evidence but may not decide whether a monument is damaged.",
    boundary:
      "A news mention or OpenStreetMap edit is not evidence of physical harm. An upload date may not be a photograph’s capture date, and registration is not inspection.",
    sourceSlugs: [
      "cultural-heritage-registry",
      "wikimedia-commons-geosearch",
      "osm-tbilisi-changesets",
      "gdelt-doc-tbilisi-news",
    ],
    featured: true,
  },
  {
    slug: "home-before-the-lights",
    title: "Home Before the Lights",
    lens: "Everyday life",
    tempo: "Live",
    question: "Will electricity probably return before I arrive home?",
    summary:
      "Compare a commuter’s live journey time with the estimated restoration time for a listed Telasi interruption.",
    connection:
      "An outage notice and a bus journey are two unrelated operational clocks. Their difference turns utility data into an immediate household decision.",
    reveal:
      "A moving journey estimate changes an on-screen ‘dark-home gap’: arrival at 17:42, estimated restoration at 18:00, an 18-minute gap.",
    mvp:
      "Three pre-geocoded interruption notices, three origin stops, one itinerary, source timestamps, and cached fixtures. No citywide Georgian-address matcher.",
    boundary:
      "Telasi’s restoration time is an estimate. A street in a notice does not prove that a particular building is disconnected.",
    sourceSlugs: ["telasi-power-outages", "ttc-passenger-information"],
    featured: true,
  },
  {
    slug: "tomorrows-seat",
    title: "Tomorrow’s Seat",
    lens: "Care & access",
    tempo: "Reference-led",
    question: "What might the next two education transitions look like for this family?",
    summary:
      "Connect reported kindergarten places by age with first-grade capacity by language and shift, turning two registration systems into one forward timeline.",
    connection:
      "Capacity is published institution by institution. A family experiences it as a sequence: a usable place now and a plausible next step later.",
    reveal:
      "Choose age, language, and district; a timeline links nearby reported kindergarten availability to next-stage school capacity and shows where the official link is missing.",
    mvp:
      "One district, ten kindergartens, ten schools, deterministic filters, and a single family timeline. No accounts, applications, or child identity.",
    boundary:
      "Reported free places have no trustworthy source timestamp and do not guarantee admission. There is no official catchment link between a kindergarten and a school.",
    sourceSlugs: [
      "tbilisi-kindergarten-capacity",
      "tbilisi-kindergarten-directory",
      "emis-first-grade-capacity",
    ],
    featured: true,
  },
  {
    slug: "job-after-the-commute",
    title: "Job After the Commute",
    lens: "Care & access",
    tempo: "Mixed cadence",
    question: "Which vacancy is actually compatible with daily life without a car?",
    summary:
      "Re-rank public vacancies using transit time, transfers, final departures, and walking burden instead of salary and title alone.",
    connection:
      "A vacancy’s hidden cost is the daily journey. The officially advertised job and the operational transport network describe one real decision only when joined.",
    reveal:
      "A better-paid role falls below another when the user switches from nominal salary to ‘salary after commute’; a finish-time slider can expose a missing ride home.",
    mvp:
      "Three validated vacancies, one home origin, curated workplace coordinates, schedule-based journeys, and one transparent ranking equation controlled by the user.",
    boundary:
      "Vacancies may not state exact shifts. Elevation is not an accessibility verdict, and every travel time must say whether it is scheduled or live.",
    sourceSlugs: [
      "hr-gov-ge-public-vacancies",
      "transitous-tbilisi-api",
      "tbilisi-gtfs-static",
      "open-meteo-tbilisi-weather-history-elevation",
    ],
  },
  {
    slug: "promise-to-pavement",
    title: "Promise to Pavement",
    lens: "Civic accountability",
    tempo: "Mixed cadence",
    question: "What public evidence appeared after a civic proposal?",
    summary:
      "Trace a possible chain from a sanitized municipal idea through procurement records to later infrastructure or map evidence.",
    connection:
      "Participation, spending, and visible-world updates are published as separate bureaucratic streams. A provenance graph can expose both possible links and important gaps.",
    reveal:
      "Expand one curated idea into a graph whose edges say ‘direct match’, ‘human-reviewed possible match’, or ‘missing’ rather than hiding uncertainty behind a score.",
    mvp:
      "Two or three hand-reviewed chains, bundled allowlisted records, quotes and dates from sources, and one intentionally visible unknown. No citywide entity matching.",
    boundary:
      "The municipal-ideas backend can expose personal data and must be sanitized. A map edit is not proof that contracted work was completed; the procurement archive may be stale.",
    sourceSlugs: [
      "tbilisi-municipal-ideas",
      "spa-ocds-procurement",
      "osm-tbilisi-changesets",
      "georoad-restrictions-html",
    ],
  },
  {
    slug: "better-rates-commute",
    title: "The Better Rate’s Commute",
    lens: "Everyday life",
    tempo: "Live",
    question: "Is traveling for the numerically better exchange rate actually worthwhile?",
    summary:
      "Compare live bank offers by channel with the time required to reach a curated branch and return.",
    connection:
      "The best displayed exchange rate may be economically worse after a round trip. Channel-specific offers and transit time turn a price table into a personal tradeoff.",
    reveal:
      "As the user drags the exchange amount, the choice flips: 18 GEL extra after a 42-minute trip becomes 26 GEL per hour of travel.",
    mvp:
      "USD only, three banks, one manually curated branch per bank, one origin, current rates, and one round-trip journey calculation.",
    boundary:
      "Offers are bank and channel level, not guaranteed at every branch. The user—not the app—must set the value of their time and verify the rate with the bank.",
    sourceSlugs: ["nbg-commercial-bank-exchange-offers", "transitous-tbilisi-api"],
  },
  {
    slug: "basement-margin",
    title: "Basement Margin",
    lens: "Environment & memory",
    tempo: "Mixed cadence",
    question: "What changes when a basement’s protective pump may have no power?",
    summary:
      "Place the Vere gauge and weather context beside a current power interruption to reveal a compound household vulnerability.",
    connection:
      "River conditions and electricity interruptions are normally separate. An electric sump pump makes their overlap materially relevant to a resident or small business.",
    reveal:
      "Toggle ‘basement with electric pump’ to compare the current gauge with published thresholds, the weather trend, and a curated interruption area.",
    mvp:
      "One gauge, its published thresholds, one weather trend, one saved interruption, and a user-controlled basement/pump toggle.",
    boundary:
      "The tested gauge is daily, not minute telemetry. One gauge and an outage notice cannot produce a building-level flood forecast or safety verdict.",
    sourceSlugs: [
      "nea-river-gauges",
      "nea-weather-warning-map",
      "open-meteo-tbilisi-weather-history-elevation",
      "telasi-power-outages",
    ],
  },
  {
    slug: "last-600-metres",
    title: "The Last 600 Metres",
    lens: "Everyday life",
    tempo: "Mixed cadence",
    question: "Which similarly fast route has the more tolerable final walk today?",
    summary:
      "Compare transit alternatives by the heat, vegetation, slope, and walking geometry of their last segment—not vehicle time alone.",
    connection:
      "The physically hardest part of a trip may begin after the bus. Coarse environmental context makes that ignored final segment visible.",
    reveal:
      "Two routes arrive within three minutes, but one ends in a shorter, hotter uphill walk. The recommendation changes when the user prioritizes heat or exertion.",
    mvp:
      "One origin-destination pair, two precomputed alternatives, current apparent temperature, and a transparent comparison of the final walking segment.",
    boundary:
      "Satellite surface temperature is coarse and is not current pedestrian shade. Elevation is not accessibility, and the result is context rather than health advice.",
    sourceSlugs: [
      "transitous-tbilisi-api",
      "planetary-computer-modis-lst-tbilisi",
      "planetary-computer-modis-vegetation-tbilisi",
      "open-meteo-tbilisi-weather-history-elevation",
    ],
  },
  {
    slug: "my-building-or-the-grid",
    title: "My Building or the Grid?",
    lens: "Everyday life",
    tempo: "Live",
    question: "Does the public evidence point to a listed local interruption or a wider system event?",
    summary:
      "Explain the difference between a Telasi distribution interruption and the national electricity system’s live operating state.",
    connection:
      "One source describes the last distribution mile; the other describes the national system. Together they teach the grid hierarchy during a familiar moment of uncertainty.",
    reveal:
      "Select a street and see a listed local interruption beside the current national frequency and power balance, followed by a carefully bounded explanation.",
    mvp:
      "Five saved or current Telasi notices, a street selector, and a GSE poll every 60 seconds with retrieval timestamps.",
    boundary:
      "National readings cannot prove why an address is dark. Absence from a Telasi list does not prove a building has power.",
    sourceSlugs: ["telasi-power-outages", "gse-live-power-system"],
  },
  {
    slug: "officially-invisible-facility",
    title: "Officially Invisible Facility",
    lens: "Civic accountability",
    tempo: "Reference-led",
    question: "Why do public systems disagree about whether this facility exists?",
    summary:
      "Compare education registries, national geospatial reference data, and OpenStreetMap, then turn contradictions into a correction packet.",
    connection:
      "A school or kindergarten can have different names, locations, or existence states across official and collaborative systems. The mismatch itself is actionable civic data.",
    reveal:
      "One location receives three conflicting public answers; the user can inspect each record and export a source-linked human verification checklist.",
    mvp:
      "Five curated discrepancies, side-by-side source records, one map, and a copyable correction packet. No automated source-of-truth verdict.",
    boundary:
      "A missing or mismatched record may reflect update cadence, naming, geocoding, or actual closure. It needs human verification.",
    sourceSlugs: [
      "emis-school-catalog",
      "tbilisi-kindergarten-directory",
      "napr-nsdi-social-poi",
      "osm-social-infrastructure",
    ],
  },
  {
    slug: "school-promise-receipt",
    title: "School Promise Receipt",
    lens: "Civic accountability",
    tempo: "Mixed cadence",
    question: "What can be traced from a school’s stated need to public action?",
    summary:
      "Connect a school strategy document and reported capacity to a sanitized municipal proposal and possible procurement evidence.",
    connection:
      "Institutional plans, local requests, and spending evidence answer different parts of the same accountability question but rarely link to one another.",
    reveal:
      "Select one school and unfold a receipt containing a quoted plan, capacity row, related idea, tender record, and explicit missing links.",
    mvp:
      "Two manually reviewed schools and evidence chains. Every relationship is labeled and quotes remain attached to their original source.",
    boundary:
      "Text similarity is not proof that a proposal or tender implements a school plan. Municipal records must be stripped of personal information.",
    sourceSlugs: [
      "emis-school-catalog",
      "emis-first-grade-capacity",
      "tbilisi-municipal-ideas",
      "spa-ocds-procurement",
    ],
  },
  {
    slug: "species-without-addresses",
    title: "Species Without Addresses",
    lens: "Environment & memory",
    tempo: "Mixed cadence",
    question: "Which observations may point to habitat outside recognized green spaces?",
    summary:
      "Find biodiversity observations outside mapped parks and compare them with vegetation imagery to create a human review queue.",
    connection:
      "Species observations describe where people looked; park maps describe where the city recognizes green space. Their disagreement can surface overlooked habitat or data errors.",
    reveal:
      "Recent observations glow outside mapped green polygons, then split into possible overlooked habitat, map omission, duplicate, or noisy observation for review.",
    mvp:
      "One district, a bounded species set, recent observations, park polygons, and a review queue. No ecological importance score.",
    boundary:
      "Observer effort is highly biased, platforms can duplicate records, and sensitive species coordinates may need to be obscured.",
    sourceSlugs: [
      "inaturalist-observations",
      "gbif-occurrences",
      "osm-social-infrastructure",
      "planetary-computer-modis-vegetation-tbilisi",
    ],
  },
  {
    slug: "flood-line-family-album",
    title: "Flood Line in the Family Album",
    lens: "Environment & memory",
    tempo: "Mixed cadence",
    question: "How can a river measurement be understood through familiar places?",
    summary:
      "Connect the Vere gauge to historical public photographs and nearby heritage landmarks instead of drawing a false building-level flood map.",
    connection:
      "A gauge value is abstract. Familiar images and elevations make it emotionally legible while preserving the difference between measurement and inundation modeling.",
    reveal:
      "Move the gauge dial and watch familiar places and historical photographs appear by elevation and distance, each with a confidence label.",
    mvp:
      "One gauge, ten landmarks and photographs, current weather context, and a deliberately non-predictive visual timeline.",
    boundary:
      "Elevation and proximity do not establish a flood boundary. One gauge cannot describe the whole city or a building’s exposure.",
    sourceSlugs: [
      "nea-river-gauges",
      "wikimedia-commons-geosearch",
      "cultural-heritage-registry",
      "open-meteo-tbilisi-weather-history-elevation",
    ],
  },
  {
    slug: "smoke-has-a-memory",
    title: "Smoke Has a Memory",
    lens: "Environment & memory",
    tempo: "Mixed cadence",
    question: "When do several public observations align around a possible smoke episode?",
    summary:
      "Place satellite fire detections, wind, official air measurements, and nearby biodiversity observations on one timestamped evidence chain.",
    connection:
      "Each source sees a different part of an environmental event. Temporal alignment is useful evidence, but it is not causality.",
    reveal:
      "Scrub a time window: a fire detection, wind direction, and station measurement either align or visibly fail to align.",
    mvp:
      "One curated historical or current episode, one station, wind observations, and evidence cards ordered by timestamp.",
    boundary:
      "Spatial or temporal proximity cannot prove that a specific fire caused an air reading or ecological effect.",
    sourceSlugs: [
      "nasa-firms-viirs-active-fires-georgia",
      "open-meteo-tbilisi-weather-history-elevation",
      "air-gov-ge-hourly",
      "inaturalist-observations",
    ],
  },
  {
    slug: "before-you-bid-heritage-flag",
    title: "Before You Bid: Heritage Flag",
    lens: "Civic accountability",
    tempo: "Mixed cadence",
    question: "What public questions should be checked before bidding on this lot?",
    summary:
      "Add possible heritage proximity and channel-specific currency context to a state auction lot without pretending to provide legal due diligence.",
    connection:
      "Auction urgency, cadastral context, cultural status, and exchange channels live in separate systems but meet in one consequential purchase decision.",
    reveal:
      "A lot receipt shows deadline, price, address or cadastral evidence, possible heritage proximity, and the selected bank channel conversion.",
    mvp:
      "Five curated lots, heritage proximity checks, USD conversion, and source-linked questions. No automated title or legal-risk judgment.",
    boundary:
      "Proximity is not protected status or a legal restriction. Exchange offers must be verified, and the tool is not property advice.",
    sourceSlugs: [
      "eauction-active-property-lots",
      "cultural-heritage-registry",
      "nbg-commercial-bank-exchange-offers",
    ],
  },
  {
    slug: "medicine-availability-honesty",
    title: "Medicine Availability Honesty",
    lens: "Care & access",
    tempo: "Reference-led",
    question: "Which registered pharmacies should I call before making the trip?",
    summary:
      "Carry exact medicine identifiers into a shortlist of reachable registered pharmacies while stating plainly that public stock data does not exist.",
    connection:
      "The registers can resolve product identity and legitimate facilities but cannot answer inventory. A call-before-you-ride workflow is useful precisely because it respects that gap.",
    reveal:
      "Select a product, copy a Georgian call script containing its registration identifiers, and order phone-equipped facilities by travel time—not claimed availability.",
    mvp:
      "A saved product subset, eight Tbilisi facilities, phone and copy actions, and transit time. No chatbot diagnosis or inventory claim.",
    boundary:
      "There is no public stock, price, opening-hours, or real-time open-status feed. Registry status does not mean ‘open now’.",
    sourceSlugs: [
      "georgia-pharmaceutical-products-register",
      "georgia-pharmacy-facility-register",
      "transitous-tbilisi-api",
    ],
  },
  {
    slug: "civic-closing-bell",
    title: "Civic Closing Bell",
    lens: "Civic accountability",
    tempo: "Mixed cadence",
    question: "Which public opportunities disappear in the next 48 hours?",
    summary:
      "Put hearing times, job deadlines, auction closings, and civic submission deadlines onto one public-time interface.",
    connection:
      "Civic access is partly a problem of time. Separate portals publish opportunities that become unavailable at specific moments without a shared clock.",
    reveal:
      "Advance a 48-hour clock and watch different opportunities close, with one direct source link and freshness label on every item.",
    mvp:
      "A small hand-checked feed from four systems, server retrieval timestamps, and no personal reminders or accounts.",
    boundary:
      "Use only organization-level court rows and minimize retained data. Deadlines must be verified at the primary service before action.",
    sourceSlugs: [
      "tbilisi-appeals-court-daily-hearings",
      "hr-gov-ge-public-vacancies",
      "eauction-active-property-lots",
      "tbilisi-municipal-ideas",
    ],
  },
  {
    slug: "honest-park-or-bus",
    title: "The Honest Park-or-Bus Decision",
    lens: "Everyday life",
    tempo: "Mixed cadence",
    question: "Which option offers the certainty I need right now?",
    summary:
      "Place a confident live transit estimate beside a static parking-space count and make the missing occupancy data part of the decision.",
    connection:
      "Public data is asymmetrical: transit can be observed live, while parking is only a reference inventory. The product should expose that asymmetry instead of fabricating parity.",
    reveal:
      "Bus: 24 minutes, next vehicle live. Parking: 31 designated spaces, current availability unknown. A certainty preference changes the choice.",
    mvp:
      "One parking zone, one origin stop, one bus route, and a certainty toggle. No parking probability model.",
    boundary:
      "Designated capacity is not current occupancy and cannot estimate the chance of finding a space.",
    sourceSlugs: ["tbilisi-parking-reference-only", "ttc-passenger-information"],
  },
  {
    slug: "wait-inside",
    title: "Wait Inside",
    lens: "Everyday life",
    tempo: "Live",
    question: "How much longer can I remain indoors and still catch the bus?",
    summary:
      "Turn the live arrival countdown and walk time into an indoor waiting budget, with nearby official air and weather context.",
    connection:
      "Transit tells people when a vehicle arrives; environmental data describes conditions outside. Together they answer when to leave, not merely what the conditions are.",
    reveal:
      "Bus in 11 minutes, four-minute walk: leave in six. The countdown updates when the next prediction changes.",
    mvp:
      "One stop, one route, one nearby air station, current apparent temperature, and one large ‘leave in’ countdown.",
    boundary:
      "A sparse official station network cannot describe exact street-level exposure. The tool must not give medical advice.",
    sourceSlugs: [
      "ttc-passenger-information",
      "air-gov-ge-hourly",
      "open-meteo-tbilisi-weather-history-elevation",
    ],
  },
  {
    slug: "can-this-shift-get-me-home",
    title: "Can This Shift Get Me Home?",
    lens: "Care & access",
    tempo: "Mixed cadence",
    question: "Does public transport still operate after this job is likely to finish?",
    summary:
      "Compare a public vacancy’s location and a user-entered finish time with scheduled final departures and current vehicle evidence.",
    connection:
      "Employment portals describe work; transport feeds describe movement. Shift workers need to know whether those systems are compatible.",
    reveal:
      "Move the finish-time slider and watch the final realistic departure disappear; current positions can show whether today’s last vehicle has passed.",
    mvp:
      "One vacancy, one curated workplace, one home stop, one direct route, and a finish-time slider.",
    boundary:
      "The finish time is user-supplied unless the vacancy states it. Schedule exceptions and route directions must be tightly bounded.",
    sourceSlugs: [
      "hr-gov-ge-public-vacancies",
      "tbilisi-gtfs-static",
      "ttc-passenger-information",
    ],
  },
  {
    slug: "courtyard-climate-machine",
    title: "Courtyard Is a Climate Machine",
    lens: "Environment & memory",
    tempo: "Reference-led",
    question: "Which traditional courtyards should receive a real shade and heat survey?",
    summary:
      "Compare courtyard typology, vegetation and heat imagery, and public photographs to prioritize human field observation.",
    connection:
      "Heritage data describes form; environmental imagery offers coarse physical context; photographs reveal what the categories miss.",
    reveal:
      "Several apparently similar courtyards separate into very different public evidence profiles, producing a survey queue rather than a comfort score.",
    mvp:
      "Ten curated courtyards, recent available imagery, public photographs, and one transparent prioritization rule.",
    boundary:
      "Satellite pixels cannot measure courtyard-level comfort or shade, and photographs may be outdated or seasonally misleading.",
    sourceSlugs: [
      "cultural-heritage-registry",
      "planetary-computer-modis-lst-tbilisi",
      "planetary-computer-modis-vegetation-tbilisi",
      "wikimedia-commons-geosearch",
    ],
  },
  {
    slug: "last-photograph-before-change",
    title: "Last Photograph Before Change",
    lens: "Environment & memory",
    tempo: "Mixed cadence",
    question: "Which protected places lack recent visual documentation after a public change signal?",
    summary:
      "Compare photograph dates with map edits and news around heritage sites to identify documentation gaps.",
    connection:
      "The meaningful gap is not simply ‘old photograph’; it is old visual evidence after another public system reports nearby change.",
    reveal:
      "A timeline places the last known public image before a cluster of later map edits or reports, then asks for human documentation.",
    mvp:
      "Ten sites, curated public images, map-change metadata, news results, and a call-to-document queue.",
    boundary:
      "Upload time may differ from capture time, and neither map changes nor news prove that the site itself changed.",
    sourceSlugs: [
      "wikimedia-commons-geosearch",
      "cultural-heritage-registry",
      "osm-tbilisi-changesets",
      "gdelt-doc-tbilisi-news",
    ],
  },
  {
    slug: "unseen-landfill-gravity",
    title: "Unseen Landfill Gravity",
    lens: "Environment & memory",
    tempo: "Reference-led",
    question: "What lies geometrically downhill or downstream from a landfill parcel?",
    summary:
      "Connect official landfill parcels with terrain, river networks, and satellite imagery to make physical relationships inspectable.",
    connection:
      "Administrative parcels are hard to interpret. Topography and water geometry reveal possible pathways worth investigating without claiming measured pollution.",
    reveal:
      "Select a parcel and trace a clearly labeled geometric downhill path toward waterways and settlements, with imagery dates beside it.",
    mvp:
      "One or two parcels, coarse elevation, mapped waterways, one satellite scene, and a source-linked geometry explanation.",
    boundary:
      "A geometric path is not evidence of leachate, contamination, exposure, or actual flow under current conditions.",
    sourceSlugs: [
      "mepa-landfill-parcels",
      "open-meteo-tbilisi-weather-history-elevation",
      "cdse-sentinel-2-l2a-tbilisi",
      "open-meteo-flood-tbilisi",
    ],
  },
  {
    slug: "questions-before-disposal",
    title: "Questions Before Disposal",
    lens: "Civic accountability",
    tempo: "Mixed cadence",
    question: "What should residents ask before a public asset is sold?",
    summary:
      "Place an auction lot beside nearby public facilities, population context, and sanitized local proposals to generate evidence-backed questions.",
    connection:
      "A property sale has meaning beyond its reserve price when the site sits inside a neighborhood’s service and participation context.",
    reveal:
      "One lot becomes a compact context receipt: nearby public uses, local population measures, proposal history, deadline, and unanswered questions.",
    mvp:
      "Three curated lots, a bounded distance search, a few relevant statistics, and questions that link directly to their evidence.",
    boundary:
      "Nearby services or proposals do not prove that a sale is improper. The output is a question generator, not a legal or policy verdict.",
    sourceSlugs: [
      "eauction-active-property-lots",
      "napr-nsdi-social-poi",
      "geostat-pxweb-social",
      "tbilisi-municipal-ideas",
    ],
  },
];

export const ideaBySlug = new Map(ideas.map((idea) => [idea.slug, idea]));

export const ideaLenses: IdeaLens[] = [
  "Everyday life",
  "Care & access",
  "Civic accountability",
  "Environment & memory",
];

export const ideasForSource = (sourceSlug: string) =>
  ideas.filter((idea) => idea.sourceSlugs.includes(sourceSlug));

export const relatedIdeas = (idea: Idea) =>
  ideas
    .filter((candidate) => candidate.slug !== idea.slug)
    .map((candidate) => ({
      idea: candidate,
      overlap: candidate.sourceSlugs.filter((slug) => idea.sourceSlugs.includes(slug)).length,
    }))
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || a.idea.title.localeCompare(b.idea.title))
    .slice(0, 3)
    .map(({ idea: candidate }) => candidate);
