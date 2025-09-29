export interface InventoryItem {
  name: string;
  quantity: number;
  row: number;
}

export interface InventoryData {
  items: InventoryItem[];
  lastUpdated: string;
}

export interface GoogleSheetsResponse {
  values: string[][];
}