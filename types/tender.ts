export interface Material {
  name: string;
  unit: string;
  unitCost: number;
  qualityScore: number;
}

export interface AnalysisResponse {
  materials: Material[];
  expectedCost: number;
  classification: {
    label: string;
    explanation: string;
  };
  log: string[];
}
