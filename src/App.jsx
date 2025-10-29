import Header from "./components/Header";
import CalorieTracker from "./components/CalorieTracker";
import WorkoutPlanner from "./components/WorkoutPlanner";
import Progress from "./components/Progress";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section className="rounded-2xl bg-gradient-to-br from-orange-100 via-white to-emerald-100 border border-neutral-200 p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
                Build habits that make weight loss sustainable
              </h2>
              <p className="text-neutral-600">
                Track your calories and macros, plan effective workouts, and visualize your progress — all in one
                simple dashboard.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3 text-sm text-neutral-700">
              <li className="p-3 rounded-xl bg-white/70 border border-neutral-200">Smart calorie tracker</li>
              <li className="p-3 rounded-xl bg-white/70 border border-neutral-200">Weekly workout planner</li>
              <li className="p-3 rounded-xl bg-white/70 border border-neutral-200">Progress rings & log</li>
              <li className="p-3 rounded-xl bg-white/70 border border-neutral-200">Actionable micro-tips</li>
            </ul>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          <CalorieTracker />
          <WorkoutPlanner />
        </div>

        <Progress />
      </main>

      <footer className="py-8 text-center text-sm text-neutral-500">
        Built with intention. Stay consistent and kind to yourself.
      </footer>
    </div>
  );
}
