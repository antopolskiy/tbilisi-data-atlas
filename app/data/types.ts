export type Freshness =
  | "Live"
  | "Near real-time"
  | "Daily"
  | "Periodic"
  | "Static reference"
  | "Historical"
  | "Unknown";

export type EvidenceLevel =
  | "Live-tested"
  | "Page-verified"
  | "Catalog-verified"
  | "Reported"
  | "Unavailable";

export type SourceKind =
  | "Official documented API"
  | "Official public-page backend"
  | "Official download"
  | "Official catalog or map"
  | "Community wrapper"
  | "Community mirror"
  | "Open collaborative platform"
  | "Third-party aggregation";

export type FieldFreshness =
  | "live"
  | "reference"
  | "derived"
  | "historical"
  | "unknown";

export interface AccessPoint {
  label: string;
  url: string;
  method?: string;
  format: string;
  authentication: string;
  documentation?: string;
  notes?: string;
}

export interface DataField {
  field: string;
  type: string;
  nullable: "Yes" | "No" | "Unknown";
  example: string;
  meaning: string;
  freshness: FieldFreshness;
  notes?: string;
}

export interface EntitySchema {
  name: string;
  description: string;
  fields: DataField[];
}

export interface DataSample {
  label: string;
  retrievedAt?: string;
  format: "JSON" | "GeoJSON" | "CSV" | "HTML" | "Protocol Buffer" | "Text";
  value: string;
  note?: string;
}

export interface Citation {
  label: string;
  url: string;
  type?: "Primary" | "Documentation" | "Wrapper" | "Mirror" | "Context";
}

export interface DataSource {
  slug: string;
  name: string;
  shortName?: string;
  category: string;
  subcategory: string;
  executiveSummary: string;
  provider: string;
  sourceKind: SourceKind;
  geography: string;
  freshness: Freshness;
  updateCadence: string;
  evidence: EvidenceLevel;
  testedAt: string;
  accessSummary: string;
  license: string;
  licenseUrl?: string;
  recordCount?: string;
  keyEntities: string[];
  accessPoints: AccessPoint[];
  schemas: EntitySchema[];
  samples: DataSample[];
  caveats: string[];
  reliability: string[];
  privacy?: string[];
  citations: Citation[];
  snapshotPath?: string;
  featured?: boolean;
}
