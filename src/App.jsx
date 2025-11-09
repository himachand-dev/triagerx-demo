import React, { useState } from "react";

/* Polished TriageRx Demo */
export default function App() {
  const [user, setUser] = useState(null); // { name, role }
  const [page, setPage] = useState("login"); // login | input | results | audit
  const [analysis, setAnalysis] = useState(null);
  const [role, setRole] = useState("");

  function loginAs(r) {
    const name = r === "Pharmacist" ? "Dr. Chen" : r === "Doctor" ? "Dr. Smith" : r;
    setUser({ name, role: r });
    setRole(r);
    setPage("input");
  }

  function analyze(report, meds) {
    // simulate ML / triage result — replace with real API later
    const triage = "CRITICAL"; // or URGENT / ROUTINE
    const alerts = [
      {
        severity: "CRITICAL",
        title: "Warfarin",
        trigger: "New left basilar consolidation, small left pleural effusion",
        action: "Hold warfarin therapy; consider alternative anticoagulation"
      },
      {
        severity: "WARNING",
        title: "Bumetanide",
        trigger: "Renal function should be closely monitored",
        action: "Review renal panel; adjust diuretic dosing"
      },
      {
        severity: "INFO",
        title: "Pneumonia",
        trigger: "Multifocal pneumonia",
        action: "Consider antibiotic review"
      }
    ];

    setAnalysis({
      triage,
      sessionId: "S-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      report,
      meds,
      alerts,
      simplified: "Small summary: scan suggests pneumonia and a small pleural effusion — medicines like warfarin may need review."
    });
    setPage("results");
  }

  /* Login screen */
  if (!user || page === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7FAFB]">
        <div className="max-w-lg w-full px-8 py-12 bg-white rounded-2xl shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-extrabold text-triage-primary">TriageRx</h1>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <label className="block text-sm font-medium text-slate-600 mb-2">User ID</label>
            <input className="w-full border border-gray-200 rounded-md p-3 mb-4 input-focus" placeholder="User ID" />

            <label className="block text-sm font-medium text-slate-600 mb-2">Password</label>
            <input type="password" className="w-full border border-gray-200 rounded-md p-3 mb-6 input-focus" placeholder="••••••" />

            <button
              onClick={() => loginAs("Doctor")}
              className="w-full py-3 rounded-xl font-semibold text-white"
              style={{ background: "var(--primary)" }}
            >
              Login
            </button>

            <p className="mt-4 text-xs text-gray-500 text-center">For Decision Support Only. Not for primary diagnosis.</p>
          </div>
        </div>
      </div>
    );
  }

  /* Input page */
  if (page === "input") {
    let reportRef = { value: "" };
    let medsRef = { value: "" };

    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <header className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-triage-primary">TriageRx</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-700">{user.name} <span className="text-gray-400">•</span> {user.role}</div>
              <button onClick={() => { setUser(null); setPage("login"); }} className="px-4 py-2 border rounded-md">Logout</button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Radiology Impression Report <span className="text-sm text-gray-400">(Paste or Type Here)</span></h3>
                <textarea ref={(e)=>reportRef.value=e} className="w-full h-56 border border-gray-200 rounded-xl p-4 textarea-smooth" placeholder="CT Chest: ..."></textarea>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-2">Patient Medication List <span className="text-sm text-gray-400">(One Drug Per Line)</span></h3>
                <textarea ref={(e)=>medsRef.value=e} className="w-full h-56 border border-gray-200 rounded-xl p-4 textarea-smooth" placeholder="Warfarin 5 mg daily"></textarea>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center">
              <button
                onClick={() => analyze(reportRef.value?.value || "", medsRef.value?.value || "")}
                className="px-10 py-3 rounded-2xl font-semibold text-white text-lg shadow"
                style={{ background: "var(--primary)" }}
              >
                Analyze Report
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">For Decision Support Only. Not for primary diagnosis.</p>
          </div>
        </main>
      </div>
    );
  }

  /* Results page */
  if (page === "results" && analysis) {
    return (
      <div className="min-h-screen bg-[#F7FAFB]">
        <header className="bg-triage-primary text-white">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">TriageRx</h2>
            <div className="flex items-center gap-4">
              <div className="text-sm">{user.name} • {user.role}</div>
              <button onClick={() => { setUser(null); setPage("login"); }} className="px-3 py-2 bg-white text-triage-primary rounded-md">Logout</button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* left: original report */}
            <aside className="md:col-span-5 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg">Original Report Text</h3>
                <button title="Read Aloud" className="text-gray-400">🔊</button>
              </div>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {analysis.report || `There is evidence of bilateral patchy consolidations throughout both lungs consistent with multifocal pneumonia. Additionally, there is new left basilar consolidation and a small left pleural effusion.`}
              </div>
              <div className="mt-6 text-xs text-gray-500">Session: {analysis.sessionId}</div>
            </aside>

            {/* right: intelligence */}
            <section className="md:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-4 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">{analysis.triage}</span>
                  <div className="text-sm text-gray-500">Session ID: {analysis.sessionId}</div>
                </div>

                <div>
                  <button onClick={() => setPage("audit")} className="text-sm underline text-triage-primary">View Audit Log</button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
                <h4 className="text-lg font-semibold">Critical Alerts & Triage</h4>

                {/* alert cards */}
                <div className="space-y-3">
                  {analysis.alerts.map((a, i) => (
                    <div key={i} className={`p-4 rounded-lg border-l-4 ${a.severity === "CRITICAL" ? "bg-red-50 border-red-500" : a.severity === "WARNING" ? "bg-amber-50 border-amber-500" : "bg-emerald-50 border-emerald-400"}`}>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{a.title}</div>
                        <div className="text-xs font-semibold px-2 py-1 rounded-full"
                             style={{
                               background: a.severity === "CRITICAL" ? "#FEE2E2" : a.severity === "WARNING" ? "#FFF7ED" : "#ECFDF5",
                               color: a.severity === "CRITICAL" ? "#991B1B" : a.severity === "WARNING" ? "#92400E" : "#065F46"
                             }}>
                          {a.severity}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">{a.trigger}</div>
                      <div className="mt-2 text-sm text-gray-600"><strong>Action:</strong> {a.action}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-100 text-sm text-gray-600">
                  <strong>Patient-friendly summary:</strong> {analysis.simplified}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  /* audit */
  if (page === "audit") {
    const fakeRows = [
      { id: 14832, ts: "2024-04-24 10:23:45", role: "Doctor", user: "USR0021", pred: "CRITICAL", alerts: 2 },
      { id: 14831, ts: "2024-04-24 10:23:00", role: "Pharmacist", user: "USR0047", pred: "URGENT", alerts: 3 },
      { id: 14830, ts: "2024-04-23 16:12:00", role: "Doctor", user: "USR0017", pred: "ROUTINE", alerts: 1 },
    ];

    return (
      <div className="min-h-screen bg-[#F7FAFB]">
        <header className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-triage-primary">Audit Log</h2>
            <div className="flex items-center gap-3">
              <button onClick={() => { setPage('input'); setAnalysis(null); }} className="px-3 py-2 border rounded-md">Back</button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex gap-3 mb-6">
              <input className="border border-gray-200 rounded-md p-3 flex-1" placeholder="Search..." />
              <input className="border border-gray-200 rounded-md p-3 w-56" placeholder="Start Date — End Date" />
              <select className="border border-gray-200 rounded-md p-3 w-56">
                <option>All Triage Categories</option>
                <option>CRITICAL</option>
                <option>URGENT</option>
              </select>
            </div>

            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-50 rounded-t-md">
                <tr className="text-left text-sm text-gray-600">
                  <th className="py-3 px-4">Log ID</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">User Role</th>
                  <th className="py-3 px-4">User ID</th>
                  <th className="py-3 px-4">ML Prediction</th>
                  <th className="py-3 px-4">Num Alerts</th>
                </tr>
              </thead>
              <tbody>
                {fakeRows.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="py-3 px-4">{r.id}</td>
                    <td className="py-3 px-4">{r.ts}</td>
                    <td className="py-3 px-4">{r.role}</td>
                    <td className="py-3 px-4">{r.user}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${r.pred === 'CRITICAL' ? 'bg-red-100 text-red-700' : r.pred === 'URGENT' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{r.pred}</span>
                    </td>
                    <td className="py-3 px-4">{r.alerts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  }

  return null;
}
