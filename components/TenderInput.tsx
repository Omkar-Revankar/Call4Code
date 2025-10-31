"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload";

interface TenderInputProps {
    onSubmit: (projectText: string, contractorText: string) => void;
}

export default function TenderInput({ onSubmit }: TenderInputProps) {
    const [text, setText] = useState("");
    const [fileName, setFileName] = useState("");
    const [bidText, setBidText] = useState("");
    const [bidFileName, setBidFileName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text || !bidText) return;
        onSubmit(text, bidText);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 rounded-3xl shadow-lg p-8 mb-8 space-y-8"
        >
            {/* --- Two Card Layout --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ---------------- Project Tender Section ---------------- */}
                <div className="bg-gradient-to-br from-white to-indigo-50 border border-gray-200 shadow-sm rounded-2xl p-6 space-y-4 hover:shadow-md transition">
                    <label className="block text-lg font-semibold text-gray-800">
                        Project Tender Details or Query
                    </label>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <FileUpload
                            onFileLoaded={(content, name) => {
                                setText(content);
                                setFileName(name);
                            }}
                        />
                        {fileName && (
                            <p className="text-xs text-gray-500 mt-1">Loaded: {fileName}</p>
                        )}
                    </div>

                    {/* Separator */}
                    <div className="flex items-center justify-center my-2">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-3 text-sm text-gray-500 bg-gradient-to-br from-white to-indigo-50 whitespace-nowrap">
                            or provide your query below
                        </span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <textarea
                        rows={6}
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none bg-white/70"
                        placeholder="Enter tender details or upload a file..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                {/* ---------------- Contractor Tender Section ---------------- */}
                <div className="bg-gradient-to-br from-white to-indigo-50 border border-gray-200 shadow-sm rounded-2xl p-6 space-y-4 hover:shadow-md transition">
                    <label className="block text-lg font-semibold text-gray-800">
                        Contractor’s Quoted Tender Details
                    </label>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <FileUpload
                            onFileLoaded={(content, name) => {
                                setBidText(content);
                                setBidFileName(name);
                            }}
                        />
                        {bidFileName && (
                            <p className="text-xs text-gray-500 mt-1">Loaded: {bidFileName}</p>
                        )}
                    </div>

                    {/* Separator */}
                    <div className="flex items-center justify-center my-2">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-3 text-sm text-gray-500 bg-gradient-to-br from-white to-indigo-50 whitespace-nowrap">
                            or provide the contractor’s bid details below
                        </span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <textarea
                        rows={6}
                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none bg-white/70"
                        placeholder="Enter contractor's tender or uploaded file content..."
                        value={bidText}
                        onChange={(e) => setBidText(e.target.value)}
                    />
                </div>
            </div>

            {/* ---------------- Actions ---------------- */}
            <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-gray-200">
                <button
                    type="button"
                    onClick={() =>
                        setText(`Project: Construction of municipal building
Scope:
- RCC framework and columns (600 sq.m)
- Brick masonry 8000 sq.ft
- Flooring 5000 sq.ft (vitrified tiles)
- Plumbing, electrical, and painting
Materials: Cement 1600 bags, Steel 14 tonnes, Bricks 90000 nos, Tiles 5000 sq.ft
`)
                    }
                    className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                >
                    Load Sample Project
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setBidText(`Contractor XYZ offers:
Estimated cost: ₹1.3 Crore
Includes RCC, bricks, tiles, electrical, plumbing, and paint.
Material brands: Generic local materials
Quality warranty: 6 months`)
                    }
                    className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                >
                    Load Sample Contractor Bid
                </button>

                <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition"
                >
                    Analyze Tender
                </button>
            </div>
        </form>
    );
}
