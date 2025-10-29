import { useMemo, useState } from "react";
import { Apple, Plus, Trash2 } from "lucide-react";

function MacroBar({ label, value, goal, color }) {
  const pct = Math.min(100, Math.round((value / Math.max(goal, 1)) * 100));
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-neutral-600">
        <span>{label}</span>
        <span>
          {value}g / {goal}g
        </span>
      </div>
      <div className="h-2.5 w-full bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function CalorieTracker() {
  const [items, setItems] = useState([
    { id: 1, name: "Greek Yogurt", calories: 120, protein: 15, carbs: 8, fat: 0 },
    { id: 2, name: "Chicken Salad", calories: 380, protein: 35, carbs: 12, fat: 18 },
  ]);
  const [draft, setDraft] = useState({ name: "", calories: "", protein: "", carbs: "", fat: "" });

  const totals = useMemo(() => {
    return items.reduce(
      (acc, it) => {
        acc.calories += Number(it.calories) || 0;
        acc.protein += Number(it.protein) || 0;
        acc.carbs += Number(it.carbs) || 0;
        acc.fat += Number(it.fat) || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [items]);

  const goals = { calories: 1800, protein: 130, carbs: 150, fat: 50 };

  function addItem(e) {
    e.preventDefault();
    if (!draft.name || !draft.calories) return;
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: draft.name,
        calories: Number(draft.calories) || 0,
        protein: Number(draft.protein) || 0,
        carbs: Number(draft.carbs) || 0,
        fat: Number(draft.fat) || 0,
      },
    ]);
    setDraft({ name: "", calories: "", protein: "", carbs: "", fat: "" });
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <section id="calories" className="bg-white rounded-2xl border border-neutral-200 p-5 md:p-6 space-y-5">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl bg-green-500 text-white grid place-items-center">
          <Apple className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Calorie & Macro Tracker</h2>
          <p className="text-sm text-neutral-500">Log your meals and stay within your targets</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={addItem} className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <input
              className="col-span-2 md:col-span-2 h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Food name"
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            />
            <input
              className="h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Calories"
              type="number"
              value={draft.calories}
              onChange={(e) => setDraft((d) => ({ ...d, calories: e.target.value }))}
            />
            <input
              className="h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Protein"
              type="number"
              value={draft.protein}
              onChange={(e) => setDraft((d) => ({ ...d, protein: e.target.value }))}
            />
            <input
              className="h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Carbs"
              type="number"
              value={draft.carbs}
              onChange={(e) => setDraft((d) => ({ ...d, carbs: e.target.value }))}
            />
            <input
              className="h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Fat"
              type="number"
              value={draft.fat}
              onChange={(e) => setDraft((d) => ({ ...d, fat: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </form>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <MacroBar label="Protein" value={totals.protein} goal={goals.protein} color="#16a34a" />
            <MacroBar label="Carbs" value={totals.carbs} goal={goals.carbs} color="#22c55e" />
            <MacroBar label="Fat" value={totals.fat} goal={goals.fat} color="#84cc16" />
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-neutral-600">
                <span>Calories</span>
                <span>
                  {totals.calories} / {goals.calories}
                </span>
              </div>
              <div className="h-2.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all"
                  style={{ width: `${Math.min(100, Math.round((totals.calories / goals.calories) * 100))}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-neutral-500">
            Tip: Aim for 1.6–2.2g of protein per kilogram of body weight to preserve muscle while cutting.
          </p>
        </div>
      </div>

      <div className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 overflow-hidden">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between p-3">
            <div>
              <p className="font-medium">{it.name}</p>
              <p className="text-sm text-neutral-500">
                {it.calories} kcal • P {it.protein}g • C {it.carbs}g • F {it.fat}g
              </p>
            </div>
            <button
              className="text-neutral-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50"
              onClick={() => removeItem(it.id)}
              aria-label="Remove"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="p-4 text-sm text-neutral-500">No entries yet. Add your first meal above.</div>
        )}
      </div>
    </section>
  );
}
