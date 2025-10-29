import { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";

function Ring({ label, value, goal, color }) {
  const pct = Math.min(100, Math.round((value / Math.max(goal, 1)) * 100));
  const stroke = 8;
  const size = 84;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;

  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} className="shrink-0">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#f1f5f9" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div>
        <p className="text-sm text-neutral-500">{label}</p>
        <p className="font-semibold">{pct}%</p>
      </div>
    </div>
  );
}

export default function Progress() {
  const [weights, setWeights] = useState([
    { date: "2025-01-01", kg: 82 },
    { date: "2025-02-01", kg: 80.5 },
    { date: "2025-03-01", kg: 79.8 },
  ]);
  const [goal, setGoal] = useState({ weight: 75, steps: 8000, water: 3000 });
  const [today, setToday] = useState({ steps: 5200, water: 1800 });

  const lossProgress = useMemo(() => {
    if (weights.length < 1) return 0;
    const start = weights[0].kg;
    const current = weights[weights.length - 1].kg;
    const target = goal.weight;
    const totalToLose = Math.max(0, start - target);
    const lost = Math.max(0, start - current);
    if (totalToLose === 0) return 100;
    return Math.round((lost / totalToLose) * 100);
  }, [weights, goal.weight]);

  function addEntry(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const d = form.get("date");
    const w = Number(form.get("kg"));
    if (!d || !w) return;
    setWeights((prev) => [...prev, { date: String(d), kg: w }]);
    e.currentTarget.reset();
  }

  return (
    <section id="progress" className="bg-white rounded-2xl border border-neutral-200 p-5 md:p-6 space-y-5">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl bg-orange-500 text-white grid place-items-center">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Progress</h2>
          <p className="text-sm text-neutral-500">Track your weight, steps, and hydration</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Ring label="Weight loss" value={lossProgress} goal={100} color="#f97316" />
            <Ring label="Daily steps" value={today.steps} goal={goal.steps} color="#22c55e" />
            <Ring label="Water" value={today.water} goal={goal.water} color="#3b82f6" />
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <p className="text-sm text-neutral-700">
              Keep consistency the priority. Small daily wins compound into big changes over time.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <form onSubmit={addEntry} className="grid grid-cols-3 gap-3">
            <input
              type="date"
              name="date"
              className="h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              step="0.1"
              name="kg"
              placeholder="Weight (kg)"
              className="h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              Add
            </button>
          </form>

          <div className="rounded-lg border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-600">
                <tr>
                  <th className="text-left font-medium p-2">Date</th>
                  <th className="text-left font-medium p-2">Weight (kg)</th>
                </tr>
              </thead>
              <tbody>
                {weights.map((w, idx) => (
                  <tr key={idx} className="border-t border-neutral-200">
                    <td className="p-2">{w.date}</td>
                    <td className="p-2">{w.kg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
