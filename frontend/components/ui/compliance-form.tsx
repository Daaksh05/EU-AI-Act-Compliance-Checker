"use client";

import { useState } from "react";

export default function ComplianceForm() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const checkCompliance = async () => {
    setLoading(true);

    await fetch("http://127.0.0.1:8000/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: text }),
    });

    setLoading(false);
  };

  return (
    <div className="bg-black/80 p-6 rounded-xl text-white w-[380px] z-10">
      <h2 className="text-xl font-semibold mb-4">
        EU AI Act Compliance Check
      </h2>

      <textarea
        className="w-full p-2 text-black rounded mb-4"
        placeholder="Describe the AI system..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={checkCompliance}
        className="w-full bg-white text-black py-2 rounded"
      >
        {loading ? "Checking..." : "Check Compliance"}
      </button>
    </div>
  );
}
