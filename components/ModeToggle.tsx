"use client";

interface Props {
    mode: "table" | "chat";
    onChange: (mode: "table" | "chat") => void;
}

export default function ModeToggle({ mode, onChange }: Props) {
    return (
        <div className="flex justify-center gap-6 mt-6">
            <button
                onClick={() => onChange("table")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "table"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
            >
                Table View
            </button>
            <button
                onClick={() => onChange("chat")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === "chat"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
            >
                Chat View
            </button>
        </div>
    );
}
