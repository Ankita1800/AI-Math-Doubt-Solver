export default function Header() {
  return (
    <header className="text-center pt-6 pb-4 px-4">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-3xl">🧠</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 tracking-tight">
          MathMind
        </h1>
      </div>
      <p className="text-sm text-gray-500 font-medium">
        Your AI Math Tutor — Hints first, answers later
      </p>
    </header>
  );
}
