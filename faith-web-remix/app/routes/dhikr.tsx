import { useState, useEffect, useCallback, useRef } from "react";
import { Plus, RotateCcw, Trash2, Loader2, Moon, Target } from "lucide-react";
import { dhikrAPI } from "~/services/api";
import { useAuth } from "~/contexts/AuthContext";
import type { DhikrCounter } from "~/types";

const PRESET_DHIKR = [
  { name: "SubhanAllah", arabic: "سُبْحَانَ اللَّهِ", target: 33 },
  { name: "Alhamdulillah", arabic: "الْحَمْدُ لِلَّهِ", target: 33 },
  { name: "Allahu Akbar", arabic: "اللَّهُ أَكْبَرُ", target: 34 },
  { name: "La ilaha illallah", arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ", target: 100 },
  { name: "Astaghfirullah", arabic: "أَسْتَغْفِرُ اللَّهَ", target: 100 },
];

export default function DhikrPage() {
  const { user } = useAuth();
  const [counters, setCounters] = useState<DhikrCounter[]>([]);
  const [active, setActive] = useState<DhikrCounter | null>(null);
  const [loading, setLoading] = useState(true);
  const [localCount, setLocalCount] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState(33);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const fetchCounters = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const res = await dhikrAPI.getCounters();
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setCounters(data);
      if (data.length > 0 && !active) {
        setActive(data[0]);
        setLocalCount(data[0].count || 0);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCounters();
  }, [fetchCounters]);

  const handleIncrement = () => {
    if (!active) return;
    const target = active.targetCount || 33;
    const next = localCount + 1;
    if (next > target) return;

    setLocalCount(next);
    setPulse(true);
    setTimeout(() => setPulse(false), 200);

    // Debounce API call
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (user) {
        dhikrAPI.updateCounter(active.id, next).catch(() => {});
        setCounters((prev) =>
          prev.map((c) => (c.id === active.id ? { ...c, count: next } : c))
        );
      }
    }, 500);
  };

  const handleReset = async () => {
    if (!active) return;
    setLocalCount(0);
    if (user) {
      try {
        await dhikrAPI.updateCounter(active.id, 0);
        setCounters((prev) =>
          prev.map((c) => (c.id === active.id ? { ...c, count: 0 } : c))
        );
      } catch {}
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      await dhikrAPI.deleteCounter(id);
      setCounters((prev) => prev.filter((c) => c.id !== id));
      if (active?.id === id) {
        setActive(null);
        setLocalCount(0);
      }
    } catch {}
  };

  const handleCreate = async (name: string, target: number) => {
    if (!user || !name.trim()) return;
    try {
      const res = await dhikrAPI.createCounter(name, target);
      const newCounter = res.data?.data || res.data;
      setCounters((prev) => [...prev, newCounter]);
      setActive(newCounter);
      setLocalCount(0);
      setShowCreate(false);
      setNewName("");
      setNewTarget(33);
    } catch {}
  };

  const selectCounter = (counter: DhikrCounter) => {
    setActive(counter);
    setLocalCount(counter.count || 0);
  };

  const target = active?.targetCount || 33;
  const progress = Math.min((localCount / target) * 100, 100);
  const circumference = 2 * Math.PI * 90;
  const dashOffset = circumference - (progress / 100) * circumference;

  // Guest mode with local counter
  if (!user) {
    return <GuestDhikr />;
  }

  return (
    <div className="bg-gradient-surface min-h-screen">
      {/* Hero */}
      <section className="bg-hero-gradient text-white pattern-islamic">
        <div className="container-faith py-10 md:py-14 text-center">
          <div className="animate-fade-in-up">
            <Moon size={28} className="text-gold-light mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold font-playfair mb-2">
              Dhikr Counter
            </h1>
            <p className="text-white/60 text-sm">
              Remember Allah with every breath
            </p>
          </div>
        </div>
      </section>

      <div className="container-faith py-8 md:py-12 max-w-4xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 size={32} className="animate-spin text-primary mb-3" />
            <p className="text-text-muted text-sm">Loading counters...</p>
          </div>
        ) : (
          <>
            {/* Main Counter */}
            {active ? (
              <div className="card-elevated p-8 sm:p-12 text-center mb-8 animate-fade-in-up">
                <p className="text-sm font-semibold text-primary mb-1">{active.name}</p>
                {active.nameArabic && (
                  <p className="font-amiri text-lg text-text-secondary mb-6" dir="rtl">
                    {active.nameArabic}
                  </p>
                )}

                {/* Circular Counter */}
                <div className="relative inline-flex items-center justify-center mb-8">
                  <svg width="220" height="220" className="transform -rotate-90">
                    <circle
                      cx="110"
                      cy="110"
                      r="90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-border-light"
                    />
                    <circle
                      cx="110"
                      cy="110"
                      r="90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                      className="text-primary progress-ring-circle"
                    />
                  </svg>

                  <button
                    onClick={handleIncrement}
                    className={`absolute inset-0 flex flex-col items-center justify-center select-none transition-transform ${
                      pulse ? "scale-95" : ""
                    }`}
                    disabled={localCount >= target}
                  >
                    <span
                      className={`text-6xl sm:text-7xl font-bold text-text tabular-nums ${
                        pulse ? "animate-count-pulse" : ""
                      }`}
                    >
                      {localCount}
                    </span>
                    <span className="text-xs text-text-muted mt-1">
                      of {target}
                    </span>
                  </button>
                </div>

                <p className="text-sm text-text-muted mb-6">
                  Tap the counter to increment
                </p>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/[0.03] text-text-secondary hover:bg-black/[0.06] text-sm font-medium transition-colors"
                  >
                    <RotateCcw size={15} />
                    Reset
                  </button>
                </div>

                {localCount >= target && (
                  <div className="mt-6 p-4 rounded-xl bg-success/10 text-success text-sm font-medium">
                    Target reached! MashaAllah!
                  </div>
                )}
              </div>
            ) : (
              <div className="card-elevated p-12 text-center mb-8">
                <Moon size={40} className="text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text mb-2">
                  No counter selected
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  Create or select a dhikr counter to start
                </p>
                <button
                  onClick={() => setShowCreate(true)}
                  className="btn-primary"
                >
                  <Plus size={16} />
                  Create Counter
                </button>
              </div>
            )}

            {/* Counters List */}
            <div className="section-header">
              <div>
                <h2 className="section-title">Your Counters</h2>
                <p className="section-subtitle">
                  {counters.length} counter{counters.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={() => setShowCreate(true)}
                className="btn-secondary text-sm py-2 px-4"
              >
                <Plus size={14} />
                New
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children">
              {counters.map((counter) => {
                const ct = counter.targetCount || 33;
                const cp = Math.min((counter.count / ct) * 100, 100);
                const isActive = active?.id === counter.id;
                return (
                  <button
                    key={counter.id}
                    onClick={() => selectCounter(counter)}
                    className={`card p-5 text-left transition-all ${
                      isActive
                        ? "ring-2 ring-primary ring-offset-2"
                        : "hover:border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-sm font-semibold text-text">
                        {counter.name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(counter.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-error/10 text-text-muted hover:text-error transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-border-light h-2 rounded-full overflow-hidden mb-2">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${cp}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-text-muted">
                      <span>
                        {counter.count} / {ct}
                      </span>
                      <span>{Math.round(cp)}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Create Modal */}
            {showCreate && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setShowCreate(false)}
              >
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                <div
                  className="relative bg-surface rounded-2xl shadow-xl w-full max-w-md p-6 animate-slide-down"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-semibold text-text mb-5">
                    New Dhikr Counter
                  </h3>

                  {/* Presets */}
                  <p className="text-xs text-text-muted mb-2 uppercase tracking-wider font-semibold">
                    Quick Start
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {PRESET_DHIKR.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => handleCreate(p.name, p.target)}
                        className="card p-3 text-left hover:border-primary/20 transition-colors"
                      >
                        <p className="text-sm font-semibold text-text">{p.name}</p>
                        <p className="font-amiri text-sm text-text-muted" dir="rtl">
                          {p.arabic}
                        </p>
                        <p className="text-[10px] text-text-muted mt-1 flex items-center gap-1">
                          <Target size={10} /> {p.target}x
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Custom */}
                  <p className="text-xs text-text-muted mb-2 uppercase tracking-wider font-semibold">
                    Or Custom
                  </p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Dhikr name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="input-field"
                    />
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        placeholder="Target"
                        value={newTarget}
                        onChange={(e) => setNewTarget(Number(e.target.value))}
                        className="input-field"
                        min={1}
                      />
                      <button
                        onClick={() => handleCreate(newName, newTarget)}
                        disabled={!newName.trim()}
                        className="btn-primary shrink-0 disabled:opacity-50"
                      >
                        Create
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCreate(false)}
                    className="mt-4 w-full text-center text-sm text-text-muted hover:text-text py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function GuestDhikr() {
  const [count, setCount] = useState(0);
  const [target] = useState(33);
  const [pulse, setPulse] = useState(false);

  const progress = Math.min((count / target) * 100, 100);
  const circumference = 2 * Math.PI * 90;
  const dashOffset = circumference - (progress / 100) * circumference;

  const handleTap = () => {
    if (count >= target) return;
    setCount((c) => c + 1);
    setPulse(true);
    setTimeout(() => setPulse(false), 200);
  };

  return (
    <div className="bg-gradient-surface min-h-screen">
      <section className="bg-hero-gradient text-white pattern-islamic">
        <div className="container-faith py-10 md:py-14 text-center">
          <Moon size={28} className="text-gold-light mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold font-playfair mb-2">
            Dhikr Counter
          </h1>
          <p className="text-white/60 text-sm">
            Remember Allah with every breath
          </p>
        </div>
      </section>

      <div className="container-faith py-8 md:py-12 max-w-md mx-auto">
        <div className="card-elevated p-8 sm:p-12 text-center animate-fade-in-up">
          <p className="font-amiri text-xl text-text-secondary mb-6" dir="rtl">
            سُبْحَانَ اللَّهِ
          </p>

          <div className="relative inline-flex items-center justify-center mb-8">
            <svg width="220" height="220" className="transform -rotate-90">
              <circle
                cx="110" cy="110" r="90" fill="none"
                stroke="currentColor" strokeWidth="6" className="text-border-light"
              />
              <circle
                cx="110" cy="110" r="90" fill="none"
                stroke="currentColor" strokeWidth="6"
                strokeDasharray={circumference} strokeDashoffset={dashOffset}
                strokeLinecap="round" className="text-primary progress-ring-circle"
              />
            </svg>
            <button
              onClick={handleTap}
              className={`absolute inset-0 flex flex-col items-center justify-center select-none transition-transform ${
                pulse ? "scale-95" : ""
              }`}
            >
              <span className={`text-6xl font-bold text-text tabular-nums ${pulse ? "animate-count-pulse" : ""}`}>
                {count}
              </span>
              <span className="text-xs text-text-muted mt-1">of {target}</span>
            </button>
          </div>

          <p className="text-sm text-text-muted mb-4">Tap to count</p>

          <button
            onClick={() => setCount(0)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/[0.03] text-text-secondary hover:bg-black/[0.06] text-sm font-medium transition-colors mx-auto"
          >
            <RotateCcw size={15} />
            Reset
          </button>

          {count >= target && (
            <div className="mt-6 p-4 rounded-xl bg-success/10 text-success text-sm font-medium">
              Target reached! MashaAllah!
            </div>
          )}
        </div>

        <p className="text-center text-sm text-text-muted mt-6">
          <a href="/auth/login" className="text-primary font-medium hover:underline">
            Sign in
          </a>{" "}
          to save your counters and track progress
        </p>
      </div>
    </div>
  );
}
