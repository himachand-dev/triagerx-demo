import React, { useState } from "react";

export default function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setPage("analyze");
  };

  const handleAnalyze = () => {
    setAnalysis({
      category: "CRITICAL",
      alerts: [
        { type: "CRITICAL", drug: "Metformin", issue: "Renal failure risk", action: "Discontinue and monitor renal function" },
        { type: "WARNING", drug: "Ibuprofen", issue: "Gastrointestinal bleeding", action: "Avoid long-term use in elderly" },
        { type: "INFO", drug: "Atorvastatin", issue: "Mild liver enzyme elevation", action: "Monitor LFTs" },
      ],
      simplified_text: "Patient may have kidney issues due to medications. Some drugs need close monitoring or adjustments.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* HEADER */}
      <header className="bg-[#005A9C] text-white py-4 shadow-md flex justify-between items-center px-8">
        <h1 className="text-2xl font-bold tracking-wide">TriageRx</h1>
        {role && (
          <div className="text-sm">
            <span className="font-medium">Role:</span> {role} |{" "}
            <button onClick={() => setPage("login")} className="underline hover:text-gray-200">
              Logout
            </button>
          </div>
        )}
      </header>

      {/* LOGIN PAGE */}
      {page === "login" && (
        <main className="flex flex-1 items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-[400px] text-center">
            <h2 className="text-2xl font-bold mb-6 text-[#005A9C]">Login to TriageRx</h2>
            <p className="mb-4 text-sm text-gray-600">Select your role to continue:</p>
            <div className="space-y-3">
              {["Doctor", "Pharmacist", "Student", "Civilian"].map((r) => (
                <button
                  key={r}
                  onClick={() => handleLogin(r)}
                  className="w-full py-2 px-4 bg-[#005A9C] text-white rounded-lg hover:bg-[#0A6B6B] transition"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ANALYSIS INPUT PAGE */}
      {page === "analyze" && !analysis && (
        <main className="flex flex-1 flex-col items-center justify-center px-6">
          <h2 className="text-2xl font-semibold text-[#005A9C] mb-6">Clinical Report Analysis</h2>
          <div className="w-full max-w-3xl space-y-4">
            <textarea
              placeholder="Radiology Impression Report (Paste or Type Here)"
              className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
            />
            <textarea
              placeholder="Patient Medication List (One Drug Per Line)"
              className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
            />
            <button
              onClick={handleAnalyze}
              className="w-full py-3 bg-[#005A9C] text-white font-semibold rounded-lg hover:bg-[#0A6B6B] transition"
            >
              Analyze Report
            </button>
            <p className="text-xs text-gray-500 text-center">
              For Decision Support Only. Not for primary diagnosis.
            </p>
          </div>
        </main>
      )}

      {/* ANALYSIS RESULTS */}
      {page === "analyze" && analysis && (
        <main className="flex flex-1 flex-col md:flex-row px-6 py-4 gap-6">
          {/* LEFT COLUMN */}
          <section className="md:w-1/2 bg-white shadow rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-[#005A9C] mb-2">Original Report</h3>
            <div className="text-sm text-gray-600">
              “Patient presents with signs of acute renal failure. Currently prescribed
              Metformin, Ibuprofen, and Atorvastatin. Recommend medication review.”
            </div>
          </section>

          {/* RIGHT COLUMN */}
          <section className="md:w-1/2 bg-white shadow rounded-lg p-4 border border-gray-200 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  analysis.category === "CRITICAL"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {analysis.category}
              </span>
              <button
                onClick={() => setPage("audit")}
                className="text-sm text-[#005A9C] underline hover:text-[#0A6B6B]"
              >
                View Audit Log
              </button>
            </div>

            {/* Alerts */}
            <div className="space-y-3 overflow-y-auto flex-1">
              {analysis.alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.type === "CRITICAL"
                      ? "border-red-500 bg-red-50"
                      : alert.type === "WARNING"
                      ? "border-amber-500 bg-amber-50"
                      : "border-green-500 bg-green-50"
                  }`}
                >
                  <p className="font-semibold text-sm">
                    {alert.type}: {alert.drug}
                  </p>
                  <p className="text-sm">{alert.issue}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Action: {alert.action}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-600 border-t pt-2">
              <strong>Simplified Summary:</strong>
              <p>{analysis.simplified_text}</p>
            </div>
          </section>
        </main>
      )}

      {/* AUDIT PAGE */}
      {page === "audit" && (
        <main className="flex flex-1 flex-col p-6">
          <h2 className="text-2xl font-bold text-[#005A9C] mb-4">Audit Log</h2>
          <table className="w-full text-sm border border-gray-200 rounded-lg shadow overflow-hidden">
            <thead className="bg-[#005A9C] text-white">
              <tr>
                <th className="py-2 px-3 text-left">Log ID</th>
                <th className="py-2 px-3 text-left">Timestamp</th>
                <th className="py-2 px-3 text-left">User Role</th>
                <th className="py-2 px-3 text-left">Prediction</th>
                <th className="py-2 px-3 text-left">Num Alerts</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[1, 2, 3].map((id) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="py-2 px-3">#{id}</td>
                  <td className="py-2 px-3">2025-11-09 22:35</td>
                  <td className="py-2 px-3">{role}</td>
                  <td className="py-2 px-3 text-red-600">CRITICAL</td>
                  <td className="py-2 px-3">3</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => {
              setPage("analyze");
              setAnalysis(null);
            }}
            className="mt-6 self-start px-6 py-2 bg-[#005A9C] text-white rounded-lg hover:bg-[#0A6B6B] transition"
          >
            Back to Dashboard
          </button>
        </main>
      )}
    </div>
  );
}