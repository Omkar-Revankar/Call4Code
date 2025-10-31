"use client";

import React, { useState } from "react";
import TenderInput from "@/components/TenderInput";
import AnalysisResult from "@/components/AnalysisResult";
import ModeToggle from "@/components/ModeToggle";
import { AnalysisResponse } from "@/types/tender";

export default function HomePage() {
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [mode, setMode] = useState<"table" | "chat">("table");

  async function handleAnalyze(projectText: string, contractorText: string) {
    // mock scoring logic
    const score =
      contractorText.length / projectText.length > 1.1 ? "Overpriced" : "Reasonable";

    const mock: AnalysisResponse = {
      materials: [
        { name: "Cement (OPC 43)", unit: "bag", unitCost: 420, qualityScore: 75 },
        { name: "TMT Steel", unit: "tonne", unitCost: 74000, qualityScore: 78 },
        { name: "Brick", unit: "nos", unitCost: 8, qualityScore: 70 },
        { name: "Tile", unit: "sq.ft", unitCost: 60, qualityScore: 80 },
      ],
      expectedCost: 910000,
      classification: {
        label: score,
        explanation:
          score === "Overpriced"
            ? "The contractor’s tender exceeds the estimated project cost, potential risk."
            : "The tender appears aligned with project expectations.",
      },
      log: [
        "Parsed both tenders.",
        "Estimated cost using standard material rates.",
        "Compared with contractor-provided details.",
        `Final classification: ${score}.`,
      ],
    };

    setData(mock);
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Tender Intelligence Assistant 💼
        </h1>

        {/* ✅ TenderInput now includes text field + file upload */}
        <TenderInput onSubmit={handleAnalyze} />
        <ModeToggle mode={mode} onChange={setMode} />
        <AnalysisResult data={data} mode={mode} />

        <footer className="text-center text-sm text-gray-500 mt-10">
          POC – AI Tender Analysis | Plan For The Future
        </footer>
      </div>
    </div>
  );
}
