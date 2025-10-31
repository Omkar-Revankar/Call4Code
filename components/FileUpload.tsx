"use client";

import React, { useState } from "react";

interface FileUploadProps {
    onFileLoaded?: (content: string, name: string) => void;
}

export default function FileUpload({ onFileLoaded }: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            // Read file content
            const reader = new FileReader();

            reader.onload = () => {
                const content = reader.result as string;
                if (onFileLoaded) {
                    onFileLoaded(content, selectedFile.name);
                }
            };

            if (selectedFile.type === "application/pdf") {
                reader.readAsArrayBuffer(selectedFile); // We'll handle pdf below
            } else {
                reader.readAsText(selectedFile);
            }
        }
    }

    async function handleUpload() {
        if (!file) return;
        console.log("Uploading file:", file.name);
    }

    return (
        <div className="p-4 border border-gray-300 rounded-2xl bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Upload Tender File</h3>
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                    type="file"
                    accept=".txt,.pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                <button
                    onClick={handleUpload}
                    disabled={!file}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    Upload
                </button>
            </div>
            {file && (
                <p className="mt-2 text-sm text-gray-500">
                    Selected: <span className="font-medium">{file.name}</span>
                </p>
            )}
        </div>
    );
}
