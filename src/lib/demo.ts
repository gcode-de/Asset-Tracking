import type { AssetType } from "@/components/Asset";

export const DEMO_STORAGE_KEY = "asset-tracker-demo-assets";

export const demoAssets: AssetType[] = [
  {
    id: "demo-1",
    name: "Global Equity ETF",
    quantity: 42,
    type: "stocks",
    abb: "VWCE",
    baseValue: 126.4,
    value: 5308.8,
    costBasis: 4620,
    notes: "Long-term core allocation",
    isDeleted: false,
    priceUpdatedAt: "2026-08-18T16:30:00.000Z",
  },
  {
    id: "demo-2",
    name: "Bitcoin",
    quantity: 0.052,
    type: "crypto",
    abb: "BTC",
    baseValue: 89450,
    value: 4651.4,
    costBasis: 3900,
    notes: "High-risk satellite position",
    isDeleted: false,
    priceUpdatedAt: "2026-08-18T16:30:00.000Z",
  },
  {
    id: "demo-3",
    name: "Emergency Fund",
    quantity: 1,
    type: "cash",
    abb: "EUR",
    baseValue: 8500,
    value: 8500,
    costBasis: 8500,
    notes: "Six months of expenses",
    isDeleted: false,
  },
  {
    id: "demo-4",
    name: "Physical Gold",
    quantity: 2.5,
    type: "metals",
    abb: "XAU",
    baseValue: 3020,
    value: 7550,
    costBasis: 6800,
    notes: "Diversification reserve",
    isDeleted: false,
    priceUpdatedAt: "2026-08-17T09:15:00.000Z",
  },
];

export const demoSearchResults = [
  { symbol: "AAPL", name: "Apple Inc.", type: "Equity", region: "United States", currency: "USD", assetClass: "stocks" as const },
  { symbol: "MSFT", name: "Microsoft Corporation", type: "Equity", region: "United States", currency: "USD", assetClass: "stocks" as const },
  { symbol: "BTC", name: "Bitcoin", type: "Cryptocurrency", currency: "EUR", assetClass: "crypto" as const },
  { symbol: "ETH", name: "Ethereum", type: "Cryptocurrency", currency: "EUR", assetClass: "crypto" as const },
  { symbol: "XAU", name: "Physical Gold", type: "Precious metal", currency: "EUR", assetClass: "metals" as const },
];

export function readDemoAssets(): AssetType[] {
  if (typeof window === "undefined") return demoAssets;
  try {
    const saved = window.localStorage.getItem(DEMO_STORAGE_KEY);
    return saved ? JSON.parse(saved) : demoAssets;
  } catch {
    return demoAssets;
  }
}

export function writeDemoAssets(assets: AssetType[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(assets));
  }
}
