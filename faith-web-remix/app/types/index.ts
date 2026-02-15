export interface User {
  id: string;
  email: string;
  name: string;
  fullName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface PrayerTime {
  name: string;
  time: string;
}

export interface PrayerTimes {
  date: string;
  timings: {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    Sunrise?: string;
    Sunset?: string;
  };
  meta?: {
    latitude: number;
    longitude: number;
    timezone: string;
    method: string;
  };
}

export interface HijriDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
  monthNameArabic: string;
  formatted: string;
}

export interface GregorianDate {
  day: number;
  month: number;
  year: number;
  formatted: string;
}

export interface CalendarDate {
  hijri: HijriDate;
  gregorian: GregorianDate;
}

export interface IslamicEvent {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  hijriMonth: number;
  hijriDay: number;
  significance: string;
}

export interface Surah {
  id: number;
  name: string;
  nameArabic: string;
  nameTransliteration: string;
  revelationPlace: 'Makkah' | 'Madinah';
  versesCount: number;
}

export interface Verse {
  id: number;
  surahId: number;
  verseNumber: number;
  textArabic: string;
  textTranslation: string;
  textTransliteration?: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  surahId: number;
  verseNumber: number;
  note?: string;
  createdAt: string;
}

export interface DhikrCounter {
  id: string;
  userId: string;
  name: string;
  nameArabic?: string;
  count: number;
  targetCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DhikrGoal {
  id: string;
  userId: string;
  counterId: string;
  targetCount: number;
  period: 'daily' | 'weekly' | 'monthly';
  startDate: string;
  endDate: string;
  currentCount: number;
  completed: boolean;
}

export interface PrayerLog {
  id: string;
  userId: string;
  prayerName: string;
  date: string;
  status: 'on_time' | 'late' | 'qada';
  createdAt: string;
}

export interface PrayerStats {
  totalPrayers: number;
  onTimePrayers: number;
  latePrayers: number;
  qadaPrayers: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
}
