import type { DataField, DataSource } from "./types";
import liveCivicData from "./generated/live-civic.json";
import mobilityData from "./generated/mobility.json";
import socialInstitutionalData from "./generated/social-institutional.json";
import globalGeospatialData from "./generated/global-geospatial.json";
import unexpectedOperationalData from "./generated/unexpected-operational.json";

const field = (
  fieldName: string,
  type: string,
  nullable: DataField["nullable"],
  example: string,
  meaning: string,
  freshness: DataField["freshness"],
  notes?: string,
): DataField => ({
  field: fieldName,
  type,
  nullable,
  example,
  meaning,
  freshness,
  notes,
});

const curatedSources: DataSource[] = [
  {
    slug: "ttc-passenger-information",
    name: "Tbilisi Transport Company passenger information",
    shortName: "TTC live transit",
    category: "Mobility",
    subcategory: "Public transport operations",
    executiveSummary:
      "TTC's passenger-information backend exposes the city's bus network and genuinely changing vehicle positions. It returns route and stop reference data, ordered stops and route shapes, route-specific bus coordinates with headings and next-stop IDs, stop-level live arrival predictions, and multimodal journey plans. The service is operationally rich but is not a documented open-data API: access was validated through a community TypeScript wrapper around the public passenger application.",
    provider: "Tbilisi Transport Company; community wrapper maintained by sxnney",
    sourceKind: "Official public-page backend",
    geography: "Tbilisi municipal public-transport network",
    freshness: "Live",
    updateCadence:
      "Vehicle coordinates changed within an eight-second observation window; arrival predictions are returned as minutes from request time. Reference routes, stops, and polylines change less frequently.",
    evidence: "Live-tested",
    testedAt: "2026-07-22 13:28–13:48 Asia/Tbilisi",
    accessSummary:
      "JSON over HTTPS. The community wrapper calls TTC's passenger gateway with an application credential. Use server-side requests, cache selected routes, and never copy the embedded credential into client code or public documentation.",
    license:
      "Underlying TTC data reuse terms were not found. The wrapper is MIT-licensed, but that software license does not establish a license for TTC data.",
    recordCount:
      "279 bus routes in the live route listing; route 301 had 14 observed vehicles across both directions during the check.",
    keyEntities: [
      "Routes",
      "Stops",
      "Vehicle positions",
      "Arrival predictions",
      "Route polylines",
      "Journey plans",
    ],
    accessPoints: [
      {
        label: "Community TypeScript wrapper",
        url: "https://github.com/sxnney/ttc-api",
        method: "Library methods wrapping GET requests",
        format: "JSON mapped to TypeScript types",
        authentication: "Wrapper contains the passenger application's credential; do not expose it",
        documentation: "README and source code",
      },
      {
        label: "Routes and stops API family",
        url: "https://transit.ttc.com.ge/pis-gateway/api/v2",
        method: "GET",
        format: "JSON",
        authentication: "Application API-key header required",
        notes:
          "Observed paths include /routes, /stops, /routes/1:{routeId}/stops and /stops/1:{stopId}/routes.",
      },
      {
        label: "Route positions",
        url: "https://transit.ttc.com.ge/pis-gateway/api/v2/routes/1:{routeId}/positions",
        method: "GET with forward=true|false",
        format: "JSON array",
        authentication: "Application API-key header required",
        notes: "Route-specific; no validated all-vehicle endpoint.",
      },
      {
        label: "Stop arrivals",
        url: "https://transit.ttc.com.ge/pis-gateway/api/v2/stops/1:{stopId}/arrival-times",
        method: "GET",
        format: "JSON array",
        authentication: "Application API-key header required",
        notes: "Accepts locale and ignoreScheduledArrivalTimes parameters.",
      },
      {
        label: "Journey planning",
        url: "https://transit.ttc.com.ge/pis-gateway/api/v2/plan",
        method: "GET",
        format: "JSON",
        authentication: "Application API-key header required",
        notes:
          "Observed parameters include fromPlace, toPlace, departMode, modes, optimize, and locale.",
      },
    ],
    schemas: [
      {
        name: "Route",
        description: "Reference record returned by the bus-route listing.",
        fields: [
          field("id", "string", "No", "1:R29981", "Namespaced internal route identifier.", "reference", "The wrapper adds a separate `1:` prefix to route-specific paths, so callers strip the returned prefix first."),
          field("shortName", "string", "No", "301", "Passenger-facing route number.", "reference"),
          field("longName", "string", "No", "Saint Barbare Ubani - Politkovskaya St", "Route endpoints or descriptive name in the requested locale.", "reference"),
          field("color", "hex-color string", "No", "00B38B", "Display color associated with the route family.", "reference"),
          field("mode", "enum string", "No", "BUS", "Transport mode.", "reference", "The tested route listing was requested with modes=BUS."),
        ],
      },
      {
        name: "Stop",
        description: "Stop reference record, also nested inside journey-plan legs.",
        fields: [
          field("id", "string", "No", "1:3482", "Namespaced internal stop identifier.", "reference"),
          field("code", "string", "Yes", "3482", "Passenger-facing or lookup stop code.", "reference"),
          field("name", "string", "No", "Dositeos Kutateli Street", "Localized stop name.", "reference", "Some English-locale plan responses still contained Georgian names."),
          field("lat", "number", "No", "41.659792", "Stop latitude in WGS84 decimal degrees.", "reference", "Unit: degrees north."),
          field("lon", "number", "No", "44.901204", "Stop longitude in WGS84 decimal degrees.", "reference", "Unit: degrees east."),
          field("vehicleMode", "enum string", "No", "BUS", "Mode served by the stop.", "reference", "Observed/documented values include BUS, GONDOLA, and SUBWAY."),
        ],
      },
      {
        name: "Vehicle position",
        description: "One vehicle observed on one route and direction at request time.",
        fields: [
          field("vehicleId", "string", "No", "1:3873", "Namespaced public-service vehicle identifier.", "live"),
          field("lat", "number", "No", "41.6767921", "Current reported vehicle latitude.", "live", "The record contains no source measurement timestamp."),
          field("lon", "number", "No", "44.8384666", "Current reported vehicle longitude.", "live", "The record contains no source measurement timestamp."),
          field("heading", "number", "Yes", "239.97084045410156", "Vehicle heading in degrees.", "live", "Null was observed for vehicles near terminals or without a current bearing."),
          field("nextStopId", "string", "Yes", "1:1490", "Namespaced identifier of the vehicle's next stop.", "live", "Null was observed for some vehicles near endpoints."),
        ],
      },
      {
        name: "Stop arrival prediction",
        description: "One route prediction returned for a selected stop.",
        fields: [
          field("shortName", "string", "No", "301", "Passenger-facing route number.", "reference"),
          field("color", "hex-color string", "No", "00B38B", "Route display color.", "reference"),
          field("headsign", "string", "No", "Politkovskaya St", "Destination/headsign for this arriving pattern.", "reference"),
          field("patternSuffix", "string", "Unknown", "1:01", "Internal route-pattern/direction suffix.", "reference", "Observed in live JSON but absent from the wrapper's published TypeScript interface."),
          field("vehicleMode", "enum string", "Unknown", "BUS", "Transport mode for the prediction.", "reference", "Observed in live JSON but absent from the wrapper's published arrival interface."),
          field("realtime", "boolean", "No", "true", "Whether the returned arrival is based on real-time information.", "live"),
          field("realtimeArrivalMinutes", "number", "No", "6", "Predicted minutes until arrival at request time.", "live", "Unit: minutes; relative to request time."),
          field("scheduledArrivalMinutes", "number", "No", "5", "Schedule-relative minutes returned beside the prediction.", "derived", "Negative values were observed on other routes; semantics should be validated before treating this as delay."),
        ],
      },
      {
        name: "Route polyline",
        description: "Direction-specific route geometry.",
        fields: [
          field("encodedValue", "string", "No", "qnr}FcgrpGKCY?a@…", "Google encoded-polyline representation of the route path.", "reference", "Decode before mapping or projecting positions onto route progress."),
        ],
      },
      {
        name: "Journey plan root",
        description: "Origin, destination, and alternative itineraries for a point-to-point request.",
        fields: [
          field("from", "Place object", "No", "{ lat: 41.7151, lon: 44.8271, name: 'Origin' }", "Resolved journey origin.", "derived"),
          field("to", "Place object", "No", "{ lat: 41.7099, lon: 44.7929, name: 'Destination' }", "Resolved journey destination.", "derived"),
          field("itineraries", "Itinerary[]", "No", "3 alternatives", "Alternative walk/bus itineraries.", "derived"),
        ],
      },
      {
        name: "Place",
        description: "A journey origin, destination, or leg endpoint.",
        fields: [
          field("lat", "number", "No", "41.7151", "Latitude in WGS84 decimal degrees.", "derived"),
          field("lon", "number", "No", "44.8271", "Longitude in WGS84 decimal degrees.", "derived"),
          field("name", "string", "No", "Origin", "Resolved or supplied place/stop name.", "derived"),
        ],
      },
      {
        name: "Itinerary",
        description: "One complete journey option.",
        fields: [
          field("startTime", "ISO-8601 datetime string", "No", "2026-07-22T09:48:39.000+00:00", "Planned start time.", "derived"),
          field("endTime", "ISO-8601 datetime string", "No", "2026-07-22T10:23:58.000+00:00", "Planned arrival time.", "derived"),
          field("duration", "number", "No", "2119", "Total itinerary duration.", "derived", "Unit: seconds."),
          field("walkTime", "number", "No", "894", "Total walking time.", "derived", "Unit: seconds."),
          field("walkDistance", "number", "No", "1116.57", "Total walking distance.", "derived", "Unit: metres."),
          field("legs", "Leg[]", "No", "3 legs", "Ordered walking and bus legs.", "derived"),
        ],
      },
      {
        name: "Journey leg",
        description: "One walk or transit segment within an itinerary.",
        fields: [
          field("from", "Place object", "No", "Origin", "Leg origin.", "derived"),
          field("to", "Place object", "No", "Tsaisi Street", "Leg destination.", "derived"),
          field("startTime", "ISO-8601 datetime string", "No", "2026-07-22T09:48:39.000+00:00", "Leg start time.", "derived"),
          field("endTime", "ISO-8601 datetime string", "No", "2026-07-22T09:53:51.000+00:00", "Leg end time.", "derived"),
          field("duration", "number", "No", "312", "Leg duration.", "derived", "Unit: seconds."),
          field("legPolyline", "object", "No", "{ encodedValue: '…', color: null }", "Encoded geometry and optional color for the leg.", "derived"),
          field("mode", "enum string", "No", "WALK", "Leg mode.", "derived", "Observed values: WALK and BUS."),
          field("steps", "Step[]", "No", "2 walking steps", "Turn-by-turn walking instructions; empty for the tested bus leg.", "derived"),
          field("intermediateStops", "Stop[]", "Yes", "20 bus stops", "Intermediate bus stops; null on walking legs.", "derived"),
          field("route", "Route object", "Yes", "{ shortName: '353', … }", "Transit route for bus legs; null on walking legs.", "reference"),
          field("realTime", "boolean", "No", "true", "Whether the leg uses real-time information.", "live"),
          field("arrivalDelay", "number", "No", "-1530", "Delay-like value returned by the planner.", "live", "Unit appears to be seconds, but large negative values were observed; do not present without validation."),
          field("distance", "number", "No", "5090.34", "Distance of the leg.", "derived", "Unit: metres."),
        ],
      },
      {
        name: "Walking step",
        description: "One turn-by-turn instruction inside a walking leg.",
        fields: [
          field("relativeDirection", "enum-like string", "No", "RIGHT", "Relative movement instruction.", "derived", "Observed values included DEPART, RIGHT, and CONTINUE."),
          field("distance", "number", "No", "200.83", "Instruction-segment distance.", "derived", "Unit: metres."),
          field("streetName", "string", "No", "road", "Street or path description.", "reference"),
          field("lat", "number", "No", "41.7164469", "Instruction-point latitude.", "derived"),
          field("lon", "number", "No", "44.8268461", "Instruction-point longitude.", "derived"),
        ],
      },
    ],
    samples: [
      {
        label: "Route 301 vehicle, arrival, and reference fragments",
        retrievedAt: "2026-07-22 13:28 Asia/Tbilisi",
        format: "JSON",
        value: JSON.stringify(
          {
            route: {
              id: "1:R29981",
              shortName: "301",
              longName: "Saint Barbare Ubani - Politkovskaya St",
              color: "00B38B",
              mode: "BUS",
            },
            vehiclePosition: {
              vehicleId: "1:3873",
              lat: 41.6767921,
              lon: 44.8384666,
              heading: 239.97084045410156,
              nextStopId: "1:1490",
            },
            stopArrival: {
              shortName: "301",
              color: "00B38B",
              headsign: "Politkovskaya St",
              patternSuffix: "1:01",
              vehicleMode: "BUS",
              realtime: true,
              realtimeArrivalMinutes: 6,
              scheduledArrivalMinutes: 5,
            },
          },
          null,
          2,
        ),
        note:
          "The route returned seven vehicles in each direction. Three of seven forward vehicles changed coordinates in an eight-second recheck.",
      },
      {
        label: "Journey-plan fragment",
        retrievedAt: "2026-07-22 13:48 Asia/Tbilisi",
        format: "JSON",
        value: JSON.stringify(
          {
            startTime: "2026-07-22T09:48:39.000+00:00",
            endTime: "2026-07-22T10:23:58.000+00:00",
            duration: 2119,
            walkTime: 894,
            walkDistance: 1116.57,
            busLeg: {
              mode: "BUS",
              route: { shortName: "353", longName: "კუკია - სადგურის მოედანი" },
              realTime: true,
              arrivalDelay: -1530,
              duration: 1225,
              distance: 5090.34,
              intermediateStopCount: 20,
            },
          },
          null,
          2,
        ),
        note:
          "English locale did not guarantee English names. The large negative arrivalDelay illustrates why field semantics need validation before display.",
      },
    ],
    caveats: [
      "The API is an undocumented passenger-application backend and may change without notice.",
      "No underlying TTC data license or public reuse terms were found during this pass.",
      "Position records have no source timestamp, speed, occupancy, rider identity, accessibility, or capacity fields.",
      "Vehicle positions are requested route by route and direction by direction; polling all 279 routes would be inappropriate.",
      "English locale responses can contain Georgian names.",
      "Some planner delay and schedule-relative values were unexpectedly negative and require semantic validation.",
    ],
    reliability: [
      "Coordinates changed across requests eight seconds apart, confirming live rather than schedule-only movement.",
      "Route 301 returned ordered stops, both route polylines, positions, and arrivals in the same session.",
      "A Transitous-listed GTFS-realtime mirror was unreachable during parallel checks; it is not currently a safer fallback.",
      "Bundle a small route fixture and apply short server-side caching for any demonstration.",
    ],
    privacy: [
      "The feed identifies public-service vehicles, not passengers.",
      "Do not attempt to infer occupancy, individual journeys, or passenger behavior from vehicle GPS.",
    ],
    citations: [
      {
        label: "ttc-api source and documentation",
        url: "https://github.com/sxnney/ttc-api",
        type: "Wrapper",
      },
      {
        label: "ttc-api package record",
        url: "https://www.npmjs.com/package/ttc-api",
        type: "Wrapper",
      },
      {
        label: "Official TTC iOS app description",
        url: "https://apps.apple.com/kg/app/tbilisi-transport-company/id927903973",
        type: "Primary",
      },
      {
        label: "Transitous Tbilisi source listing",
        url: "https://transitous.org/sources/",
        type: "Mirror",
      },
    ],
    snapshotPath:
      "/Users/santop/vault/1_Projects/2026-07-cursor-tbilisi-hackathon/.agents/data-snapshots/ttc-route-301-live-2026-07-22.json",
    featured: true,
  },
  {
    slug: "nbg-official-exchange-rates",
    name: "National Bank of Georgia official exchange rates",
    shortName: "NBG official rates",
    category: "Economy",
    subcategory: "Daily currency reference rates",
    executiveSummary:
      "The National Bank publishes a no-authentication JSON feed of the official GEL reference rate for dozens of currencies. Each daily response contains an effective date and one record per currency with ISO-style code, quantity basis, numeric and formatted rate, daily change, display name, publication timestamp, and validity date. This is national rather than Tbilisi-specific, but it is a frequently refreshed official source used directly in everyday financial decisions and accounting.",
    provider: "National Bank of Georgia",
    sourceKind: "Official public-page backend",
    geography: "Georgia nationwide; rates are GEL reference values",
    freshness: "Daily",
    updateCadence:
      "Official rates are calculated on business days, published no later than 17:00, and become effective for the following calendar day. The endpoint supports dated retrieval.",
    evidence: "Live-tested",
    testedAt: "2026-07-22 13:55 Asia/Tbilisi",
    accessSummary:
      "Public JSON over HTTPS with no authentication. The language segment controls localized currency names; an optional date parameter can retrieve a specific day's rate set.",
    license:
      "The endpoint is deliberately linked as JSON from the official NBG site, but a separate machine-readable-data reuse license was not located in this pass.",
    recordCount: "One dated response containing dozens of currency records; 43 were visible on the current official-rate page.",
    keyEntities: ["Daily rate set", "Currency rate"],
    accessPoints: [
      {
        label: "English official-rate JSON",
        url: "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json/",
        method: "GET; optional date query parameter",
        format: "JSON",
        authentication: "None",
        notes: "The first array item is the requested/current daily rate set.",
      },
      {
        label: "Official rate webpage",
        url: "https://nbg.gov.ge/en/monetary-policy/currency",
        method: "Browser page",
        format: "HTML with JSON/RSS links",
        authentication: "None",
      },
      {
        label: "Release calendar",
        url: "https://nbg.gov.ge/en/statistics/data-distribution",
        method: "Browser page",
        format: "HTML",
        authentication: "None",
        notes: "Documents the daily 17:00 publication schedule.",
      },
    ],
    schemas: [
      {
        name: "Daily rate set",
        description: "Top-level object for one effective date.",
        fields: [
          field("date", "ISO-8601 datetime string", "No", "2026-07-22T00:00:00.000Z", "Effective date represented by this response object.", "historical"),
          field("currencies", "CurrencyRate[]", "No", "43 currency records", "Official rates for currencies available on that date.", "historical"),
        ],
      },
      {
        name: "Currency rate",
        description: "One official GEL reference rate and its daily change.",
        fields: [
          field("code", "string", "No", "EUR", "Currency alphabetic code.", "reference", "Usually ISO 4217-style currency code."),
          field("quantity", "number", "No", "1", "Number of foreign-currency units to which the GEL rate applies.", "reference", "Examples include 1 EUR, 10 AED, 100 JPY, or 1000 AMD."),
          field("rateFormated", "string", "No", "3.0089", "Display-formatted GEL rate.", "historical", "The provider spells the field `rateFormated` with one t."),
          field("diffFormated", "string", "No", "0.0011", "Display-formatted absolute daily change.", "historical", "Sign is carried separately by numeric `diff`; the string can omit the minus sign."),
          field("rate", "number", "No", "3.0089", "Numeric GEL value for the stated quantity of foreign currency.", "historical"),
          field("name", "string", "No", "Euro", "Localized currency name.", "reference"),
          field("diff", "number", "No", "-0.0011", "Signed change versus the preceding official rate.", "historical"),
          field("date", "ISO-8601 datetime string", "No", "2026-07-21T17:01:13.280Z", "Publication/calculation timestamp carried by the record.", "historical"),
          field("validFromDate", "ISO-8601 datetime string", "No", "2026-07-22T00:00:00.000Z", "Date and time from which the official rate applies.", "historical"),
        ],
      },
    ],
    samples: [
      {
        label: "Current daily rate response fragment",
        retrievedAt: "2026-07-22 13:55 Asia/Tbilisi",
        format: "JSON",
        value: JSON.stringify(
          {
            date: "2026-07-22T00:00:00.000Z",
            currencies: [
              {
                code: "AED",
                quantity: 10,
                rateFormated: "7.1606",
                diffFormated: "0.0038",
                rate: 7.1606,
                name: "United Arab Emirates Dirhams",
                diff: -0.0038,
                date: "2026-07-21T17:01:13.280Z",
                validFromDate: "2026-07-22T00:00:00.000Z",
              },
              {
                code: "AUD",
                quantity: 1,
                rateFormated: "1.8463",
                diffFormated: "0.0024",
                rate: 1.8463,
                name: "Australian Dollar",
                diff: 0.0024,
                date: "2026-07-21T17:01:13.280Z",
                validFromDate: "2026-07-22T00:00:00.000Z",
              },
            ],
          },
          null,
          2,
        ),
        note:
          "The quantity basis matters: the rate is not always for one unit of the foreign currency.",
      },
    ],
    caveats: [
      "Official rates are indicative and are not mandatory for every retail exchange transaction.",
      "This feed is daily reference data, not the separate NBG page of continuously updated commercial-bank buy/sell offers.",
      "A dedicated machine-readable-data reuse license was not found.",
      "Consumers should verify a bank's actual terms before transacting.",
    ],
    reliability: [
      "The endpoint returned current JSON without authentication during the live check.",
      "NBG publishes an explicit advance-release calendar for official daily rates.",
      "Numeric and formatted fields permit both calculation and faithful display.",
    ],
    citations: [
      {
        label: "Official GEL currency-rate page",
        url: "https://nbg.gov.ge/en/monetary-policy/currency",
        type: "Primary",
      },
      {
        label: "Official daily rate JSON",
        url: "https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/en/json/",
        type: "Primary",
      },
      {
        label: "NBG exchange-rate methodology",
        url: "https://nbg.gov.ge/en/page/foreign-exchange-market",
        type: "Documentation",
      },
      {
        label: "NBG advance release calendar",
        url: "https://nbg.gov.ge/en/statistics/data-distribution",
        type: "Documentation",
      },
    ],
  },
  {
    slug: "nbg-commercial-bank-exchange-offers",
    name: "NBG commercial-bank exchange-rate comparison",
    shortName: "Live bank exchange offers",
    category: "Economy",
    subcategory: "Retail currency exchange",
    executiveSummary:
      "The National Bank's comparison service aggregates current buy and sell offers reported by 13 commercial banks. It distinguishes branch, internet-bank, and mobile-bank channels and can return different offers for natural-person/business context, transaction direction, currency, amount, selected banks, and payment time. Unlike the separate official daily reference rate, these values are presented as online, continuously updateable bank offers.",
    provider: "National Bank of Georgia; rates supplied by participating commercial banks",
    sourceKind: "Official public-page backend",
    geography: "Georgia nationwide; bank offers are relevant to Tbilisi customers",
    freshness: "Live",
    updateCadence:
      "The official page describes the information as updated online in real time and warns that banks may change offers at any time.",
    evidence: "Live-tested",
    testedAt: "2026-07-22 14:02 Asia/Tbilisi",
    accessSummary:
      "Public JSON endpoints behind NBG's currency-rates page. No authentication was required during testing. The exchange query accepts currency ID, amount, datetime, optional bank IDs, user type, operation type, and exchange channel filters.",
    license:
      "Publicly displayed official comparison data; a separate data-reuse license was not found. NBG requires users to verify rates and terms directly with the selected bank before a transaction.",
    recordCount:
      "13 active bank subjects; 183 currency reference records in the endpoint, including inactive currencies; the USD query returned one nested offer record per bank.",
    keyEntities: ["Bank subject", "Currency option", "Bank offer", "Service channel", "Buy/sell rate", "NBG comparison rate"],
    accessPoints: [
      {
        label: "Current commercial-bank comparison page",
        url: "https://nbg.gov.ge/en/currency-rates",
        method: "Browser page with filters and export",
        format: "HTML backed by JSON",
        authentication: "None",
      },
      {
        label: "Participating banks",
        url: "https://tariffcompare.nbg.gov.ge/api/Subject/get-subjects",
        method: "GET with v1/status parameters",
        format: "JSON array",
        authentication: "None",
      },
      {
        label: "Currencies",
        url: "https://tariffcompare.nbg.gov.ge/api/Currency/currencies",
        method: "GET with v1 parameter",
        format: "JSON array",
        authentication: "None",
      },
      {
        label: "Bank exchange offers",
        url: "https://tariffcompare.nbg.gov.ge/api/Exchanges/get-exchanges",
        method: "GET with currencyId, amount, datetime, and optional filter parameters",
        format: "Nested JSON array",
        authentication: "None",
        notes:
          "A minimal USD request using currencyId=5 returned offers for 13 banks. Incorrect/inactive currency IDs can return the same structure with null values.",
      },
      {
        label: "NBG comparison rate",
        url: "https://tariffcompare.nbg.gov.ge/api/Exchanges/nbg-exchanges",
        method: "GET with v1 and codes parameters",
        format: "JSON array",
        authentication: "None",
      },
    ],
    schemas: [
      {
        name: "Bank subject",
        description: "A participating commercial bank available as a comparison filter.",
        fields: [
          field("id", "number", "No", "2", "Internal bank/subject identifier used by filter requests.", "reference"),
          field("name", "string", "No", "Credo Bank", "Display name of the bank.", "reference"),
        ],
      },
      {
        name: "Currency option",
        description: "Currency metadata returned for filter construction.",
        fields: [
          field("id", "number", "No", "5", "Internal currency identifier used by exchange queries.", "reference"),
          field("code", "string", "No", "USD", "Currency alphabetic code.", "reference"),
          field("name", "string", "No", "USD", "Display name/code used by the comparison interface.", "reference"),
          field("kCoeficient", "number", "No", "1", "Quantity/scaling coefficient for the currency.", "reference", "Provider spelling is `kCoeficient`. Values such as 100 or 1000 occur for some currencies."),
          field("isActive", "boolean", "No", "true", "Whether the currency is currently active in the service.", "reference"),
          field("status", "string", "No", "Active", "Text status of the currency option.", "reference", "Both Active and Inactive were observed."),
        ],
      },
      {
        name: "Bank offer",
        description: "One bank and its offers grouped by service channel.",
        fields: [
          field("name", "string", "No", "Credo Bank", "Bank display name.", "reference"),
          field("exchanges", "ExchangeChannel[]", "No", "3 channel records", "Offers grouped by branch, internet bank, and mobile bank.", "live"),
        ],
      },
      {
        name: "Exchange channel",
        description: "One delivery/service channel within a bank offer.",
        fields: [
          field("exchangeType", "enum-like string", "No", "InternetBank", "Channel through which the exchange is offered.", "reference", "Observed values: Branch, InternetBank, MobileBank."),
          field("exchangeRates", "ExchangeRate[]", "No", "Buy and Sell records", "Directional rates available in this channel.", "live"),
        ],
      },
      {
        name: "Exchange rate",
        description: "One directional buy or sell offer.",
        fields: [
          field("operationType", "enum-like string", "No", "Buy", "Whether the bank buys or sells the selected currency.", "reference", "Observed values: Buy and Sell."),
          field("value", "number", "Yes", "2.625", "Reported GEL rate for the selected currency/channel/context.", "live", "Null occurs when no applicable offer is returned."),
          field("isSpecial", "boolean", "No", "false", "Provider flag indicating a specially marked offer in the comparison response.", "live", "The exact business rule for `true` was not documented in the inspected page code."),
        ],
      },
      {
        name: "NBG comparison rate",
        description: "NBG rate returned alongside the commercial-bank comparison.",
        fields: [
          field("code", "string", "No", "USD", "Currency code.", "reference"),
          field("name", "string", "No", "US Dollar", "Currency display name.", "reference"),
          field("rate", "number", "No", "2.6301", "Current NBG comparison/reference value.", "live"),
          field("quantity", "number", "No", "1", "Foreign-currency quantity to which the rate applies.", "reference"),
        ],
      },
    ],
    samples: [
      {
        label: "Current USD offer fragment",
        retrievedAt: "2026-07-22 14:02 Asia/Tbilisi",
        format: "JSON",
        value: JSON.stringify(
          [
            {
              name: "Credo Bank",
              exchanges: [
                {
                  exchangeType: "Branch",
                  exchangeRates: [
                    { operationType: "Buy", value: 2.623, isSpecial: false },
                    { operationType: "Sell", value: 2.637, isSpecial: false },
                  ],
                },
                {
                  exchangeType: "InternetBank",
                  exchangeRates: [
                    { operationType: "Buy", value: 2.625, isSpecial: false },
                    { operationType: "Sell", value: 2.635, isSpecial: false },
                  ],
                },
              ],
            },
          ],
          null,
          2,
        ),
        note:
          "The branch and internet-bank offers differed in the live response, demonstrating why channel is a meaningful field rather than presentation metadata.",
      },
      {
        label: "Currency option",
        retrievedAt: "2026-07-22 14:02 Asia/Tbilisi",
        format: "JSON",
        value: JSON.stringify(
          { id: 5, code: "USD", name: "USD", kCoeficient: 1, isActive: true, status: "Active" },
          null,
          2,
        ),
      },
    ],
    caveats: [
      "Rates and terms are supplied by banks and can change at any time; NBG tells users to verify before transacting.",
      "Query semantics for userType, operationTypes, exchangeTypes, and `isSpecial` were inferred from the public page implementation and not found in public API documentation.",
      "An incorrect or inactive currency ID can yield structurally valid records with null prices.",
      "No machine-readable data license was located.",
    ],
    reliability: [
      "All four tested JSON endpoints responded without authentication.",
      "The official page states the commercial-bank information is updated online in real time.",
      "The live USD response contained distinct values by bank and service channel.",
    ],
    citations: [
      {
        label: "NBG current commercial-bank currency rates",
        url: "https://nbg.gov.ge/en/currency-rates",
        type: "Primary",
      },
      {
        label: "Participating bank endpoint",
        url: "https://tariffcompare.nbg.gov.ge/api/Subject/get-subjects?v1=true&status=active",
        type: "Primary",
      },
      {
        label: "Currency endpoint",
        url: "https://tariffcompare.nbg.gov.ge/api/Currency/currencies?v1=true",
        type: "Primary",
      },
      {
        label: "NBG exchange-comparison endpoint",
        url: "https://tariffcompare.nbg.gov.ge/api/Exchanges/nbg-exchanges?v1=true&codes=USD",
        type: "Primary",
      },
    ],
  },
];

const generatedSources = [
  ...(liveCivicData as unknown as DataSource[]),
  ...(mobilityData as unknown as DataSource[]),
  ...(socialInstitutionalData as unknown as DataSource[]),
  ...(globalGeospatialData as unknown as DataSource[]),
  ...(unexpectedOperationalData as unknown as DataSource[]),
];

export const sources: DataSource[] = [
  ...new Map(
    [...curatedSources, ...generatedSources].map((source) => [source.slug, source]),
  ).values(),
];

export const sourceBySlug = new Map(sources.map((source) => [source.slug, source]));

export const categories = [...new Set(sources.map((source) => source.category))].sort();
