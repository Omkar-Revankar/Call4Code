"use client";

import React from "react";
import { AnalysisResponse } from "@/types/tender";
import ChatView from "./ChatView";

interface Props {
    data: AnalysisResponse | null;
    mode: "table" | "chat";
}

export default function AnalysisResult({ data, mode }: Props) {
    if (!data)
        return (
            <div className="mt-6 text-gray-500 text-center italic">
                Run the analysis to see results here.
            </div>
        );

    return (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
            {mode === "table" ? (
                <>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        Material Cost Analysis
                    </h3>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="text-left p-3">Material</th>
                                    <th className="text-left p-3">Unit</th>
                                    <th className="text-right p-3">Unit Cost (₹)</th>
                                    <th className="text-right p-3">Quality</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.materials.map((m, i) => (
                                    <tr
                                        key={i}
                                        className={`border-t text-sm ${i % 2 ? "bg-gray-50" : "bg-white"
                                            }`}
                                    >
                                        <td className="p-3">{m.name}</td>
                                        <td className="p-3">{m.unit}</td>
                                        <td className="p-3 text-right">
                                            {m.unitCost.toLocaleString()}
                                        </td>
                                        <td className="p-3 text-right">{m.qualityScore}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 space-y-2 text-gray-700">
                        <p>
                            <strong>Expected Cost:</strong>{" "}
                            <span className="text-blue-700 font-semibold">
                                ₹{data.expectedCost.toLocaleString()}
                            </span>
                        </p>
                        <p>
                            <strong>{data.classification.label}</strong> —{" "}
                            {data.classification.explanation}
                        </p>
                    </div>
                </>
            ) : (
                <ChatView />
            )}
        </div>
    );
}
