import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Calendar, Clock, BookOpen, Sparkles } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Unified Faith Service - Your Spiritual Companion" },
    { name: "description", content: "A comprehensive multi-faith spiritual companion platform with prayer times, Quran reader, dhikr counter, and Islamic calendar." },
  ];
}

export default function Home() {
  const features = [
    {
      title: "Islamic Calendar",
      description: "View Hijri dates, convert between calendars, and track important Islamic events",
      icon: Calendar,
      link: "/calendar",
      gradient: "from-gold/20 to-gold-light/10",
    },
    {
      title: "Prayer Times",
      description: "Accurate prayer times for your location with tracking and statistics",
      icon: Clock,
      link: "/prayers",
      gradient: "from-forest/20 to-forest-light/10",
    },
    {
      title: "Quran Reader",
      description: "Read the Quran with translations, search verses, and bookmark your progress",
      icon: BookOpen,
      link: "/quran",
      gradient: "from-plum/20 to-plum-light/10",
    },
    {
      title: "Dhikr Counter",
      description: "Track your dhikr with customizable counters and goals",
      icon: Sparkles,
      link: "/dhikr",
      gradient: "from-ocean/20 to-gold-light/10",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* Hero Section */}
      <div className="glass rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-quicksand text-white mb-4 drop-shadow-lg">
          Welcome to Unified Faith
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 font-montserrat max-w-3xl mx-auto">
          Your comprehensive spiritual companion for prayer times, Quran reading, dhikr tracking, and more
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.link}
              className="glass rounded-xl p-6 sm:p-7 md:p-8 hover:scale-105 transition-smooth group"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-quicksand text-white mb-2">
                {feature.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/70 font-montserrat">
                {feature.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="glass rounded-xl p-6 sm:p-8 text-center">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-quicksand text-white mb-3">
          Start Your Spiritual Journey
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-white/70 font-montserrat mb-4">
          Sign in to track your prayers, save bookmarks, and personalize your experience
        </p>
        <Link
          to="/auth/login"
          className="inline-block bg-gradient-to-r from-gold to-gold-light text-white font-quicksand font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:scale-105 transition-smooth shadow-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
