export type CropStatus = 'Growing' | 'Flowering' | 'Ready soon';
export interface CropBatch { id: string; crop: string; variety: string; field: string; area: number; planted: string; harvest: string; germination: number; pestRisk: 'Low' | 'Medium' | 'High'; status: CropStatus; }
export interface SoilSample { nitrogen: number; phosphorus: number; potassium: number; ph: number; moisture: number; updatedAt: string; }
export interface InventoryItem { id: string; crop: string; quantity: number; unit: string; temperature: number; maxTemp: number; location: string; }
export interface FarmSettings { irrigationEnabled: boolean; farmName: string; currency: 'KES' | 'USD'; }