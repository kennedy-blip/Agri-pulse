import type { CropBatch, InventoryItem, SoilSample } from './types';
export const initialCrops: CropBatch[] = [
 { id:'c-01', crop:'Maize', variety:'H6213', field:'North Field', area:12, planted:'2026-09-18', harvest:'2027-01-20', germination:92, pestRisk:'Low', status:'Growing' },
 { id:'c-02', crop:'Tomatoes', variety:'Anna F1', field:'Greenhouse A', area:2.5, planted:'2026-10-02', harvest:'2026-12-12', germination:100, pestRisk:'Medium', status:'Flowering' },
 { id:'c-03', crop:'Beans', variety:'Rose Coco', field:'East Plot', area:5, planted:'2026-10-15', harvest:'2027-01-08', germination:86, pestRisk:'Low', status:'Growing' },
];
export const initialSoil: SoilSample = { nitrogen:68, phosphorus:42, potassium:76, ph:6.4, moisture:34, updatedAt:new Date().toISOString() };
export const initialInventory: InventoryItem[] = [
 { id:'i-01', crop:'Tomatoes', quantity:840, unit:'kg', temperature:13, maxTemp:15, location:'Cold Room 01' },
 { id:'i-02', crop:'Maize', quantity:2400, unit:'kg', temperature:19, maxTemp:22, location:'Grain Store A' },
 { id:'i-03', crop:'Beans', quantity:560, unit:'kg', temperature:24, maxTemp:26, location:'Dry Store 02' },
];