import { Flame, Dumbbell, TrendingUp } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-orange-500 text-white grid place-items-center shadow-sm">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">ShapeShift</h1>
            <p className="text-xs text-neutral-500">Your personal weight loss companion</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600">
          <a href="#calories" className="hover:text-neutral-900 transition-colors">Calories</a>
          <a href="#workouts" className="hover:text-neutral-900 transition-colors">Workouts</a>
          <a href="#progress" className="hover:text-neutral-900 transition-colors">Progress</a>
        </nav>
        <div className="flex items-center gap-2 text-neutral-600">
          <Dumbbell className="h-5 w-5" />
          <TrendingUp className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}
