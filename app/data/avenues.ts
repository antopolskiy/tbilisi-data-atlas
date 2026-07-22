import liveUnavailable from "./dead-ends/live-civic-environment.json";
import mobilityUnavailable from "./dead-ends/mobility.json";
import socialUnavailable from "./dead-ends/social-institutional.json";
import operationalUnavailable from "./dead-ends/unexpected-operational.json";
import globalUnavailable from "./dead-ends/global-geospatial.json";
import type { DataSource } from "./types";

export interface InvestigatedAvenue {
  name: string;
  category: string;
  status: "Unavailable" | "Unresolved" | "Restricted" | string;
  reason: string;
  testedAt: string;
  checkedUrls: string[];
  boundary: string;
}

const fromUnavailableSources = (records: unknown): InvestigatedAvenue[] =>
  (records as DataSource[]).map((source) => ({
    name: source.name,
    category: source.category,
    status: source.evidence,
    reason: source.executiveSummary,
    testedAt: source.testedAt,
    checkedUrls: source.accessPoints.map((point) => point.url),
    boundary: [...source.caveats, ...(source.privacy ?? [])].join(" "),
  }));

const liveAvenues = fromUnavailableSources(liveUnavailable);
const operationalAvenues = fromUnavailableSources(operationalUnavailable);

const mobilityAvenues = (mobilityUnavailable as unknown as Omit<InvestigatedAvenue, "category">[]).map(
  (avenue) => ({ ...avenue, category: "Mobility" }),
);

const socialAvenues = (socialUnavailable as unknown as Omit<InvestigatedAvenue, "category">[]).map(
  (avenue) => ({ ...avenue, category: "Social / institutional" }),
);

const globalAvenues = (globalUnavailable as unknown as Omit<InvestigatedAvenue, "category">[]).map(
  (avenue) => ({ ...avenue, category: "Global coverage" }),
);

export const investigatedAvenues: InvestigatedAvenue[] = [
  ...liveAvenues,
  ...mobilityAvenues,
  ...socialAvenues,
  ...operationalAvenues,
  ...globalAvenues,
].sort((a, b) => `${a.category}-${a.name}`.localeCompare(`${b.category}-${b.name}`));
