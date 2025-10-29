import { useState } from "react";
import { Dumbbell, Calendar, Plus, Trash2, CheckCircle2 } from "lucide-react";

const defaultPlan = [
  { id: 1, day: "Mon", name: "Full Body A", sets: 3, done: false },
  { id: 2, day: "Wed", name: "Cardio + Core", sets: 1, done: false },
  { id: 3, day: "Fri", name: "Full Body B", sets: 3, done: false },
];

export default function WorkoutPlanner() {
  const [plan, setPlan] = useState(defaultPlan);
  const [draft, setDraft] = useState({ day: "Mon", name: "", sets: 3 });

  function addWorkout(e) {
    e.preventDefault();
    if (!draft.name) return;
    setPlan((p) => [...p, { id: Date.now(), ...draft, sets: Number(draft.sets) || 1, done: false }]);
    setDraft({ day: "Mon", name: "", sets: 3 });
  }

  function removeWorkout(id) {
    setPlan((p) => p.filter((w) => w.id !== id));
  }

  function toggleDone(id) {
    setPlan((p) => p.map((w) => (w.id === id ? { ...w, done: !w.done } : w)));
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <section id="workouts" className="bg-white rounded-2xl border border-neutral-200 p-5 md:p-6 space-y-5">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center">
          <Dumbbell className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Workout Planner</h2>
          <p className="text-sm text-neutral-500">Schedule sessions and check them off as you go</p>
        </div>
      </div>

      <form onSubmit={addWorkout} className="grid md:grid-cols-4 gap-3">
        <select
          className="h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={draft.day}
          onChange={(e) => setDraft((d) => ({ ...d, day: e.target.value }))}
        >
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <input
          className="md:col-span-2 h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Workout name (e.g., Upper Body, HIIT)"
          value={draft.name}
          onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
        />
        <input
          className="h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Sets"
          type="number"
          value={draft.sets}
          onChange={(e) => setDraft((d) => ({ ...d, sets: e.target.value }))}
        />
        <button
          type="submit"
          className="md:col-span-4 inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Workout
        </button>
      </form>

      <div className="rounded-lg border border-neutral-200 divide-y divide-neutral-200 overflow-hidden">
        {plan.map((w) => (
          <div key={w.id} className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-700 grid place-items-center border border-indigo-100">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">
                  {w.day} • {w.name}
                </p>
                <p className="text-sm text-neutral-500">{w.sets} set(s)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                  w.done
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "hover:bg-neutral-50 text-neutral-700 border-neutral-200"
                }`}
                onClick={() => toggleDone(w.id)}
              >
                <CheckCircle2 className="h-4 w-4" /> {w.done ? "Done" : "Mark done"}
              </button>
              <button
                className="text-neutral-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50"
                onClick={() => removeWorkout(w.id)}
                aria-label="Remove"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        {plan.length === 0 && (
          <div className="p-4 text-sm text-neutral-500">No workouts planned. Add one above.</div>
        )}
      </div>
    </section>
  );
}
