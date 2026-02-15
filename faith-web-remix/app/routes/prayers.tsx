import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { MapPin, Clock, Moon, Sun, Sunrise, Sunset, Loader2 } from 'lucide-react';
import { prayerAPI } from '../services/api';
import type { PrayerTimes } from '../types';

// Force HMR update
export default function PrayersPage() {
  const [prayers, setPrayers] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [timeToNext, setTimeToNext] = useState<string>('');

  useEffect(() => {
    // Get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          console.warn('Geolocation error or timeout:', err);
          setError('Location access denied or timed out. Using default location (Mecca).');
          // Default to Mecca coordinates
          const defaultLoc = { lat: 21.4225, lng: 39.8262 };
          console.log('Setting default location:', defaultLoc);
          setLocation(defaultLoc);
        },
        { timeout: 5000, maximumAge: 60000 }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLocation({ lat: 21.4225, lng: 39.8262 });
    }
  }, []);

  useEffect(() => {
    if (!location) {
        console.log('No location yet');
        return;
    }
    console.log('Location set, fetching prayers for:', location);

    const fetchPrayers = async () => {
      console.log('Starting fetchPrayers');
      setLoading(true);
      const date = format(new Date(), 'yyyy-MM-dd');
      try {
        console.log('Calling API...');
        // @ts-ignore - API expects specific date format
        const response = await prayerAPI.getTimes(location.lat, location.lng, date);
        console.log('API Response received:', response.data);
        // Handle potential nested data structure and field mapping
        const apiData = response.data.data || response.data;
        const rawTimings = apiData.times || apiData.timings || {};
        
        // Normalize keys to title case and standard names
        const timings: Record<string, string> = {};
        Object.entries(rawTimings).forEach(([key, value]) => {
            // Standardize names (e.g. Dhuhr/Zuhr)
            let standardKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
            if (standardKey === 'Zuhr') standardKey = 'Dhuhr';
            timings[standardKey] = value as string;
        });

        const mappedData = {
          ...apiData,
          timings
        };
        console.log('Setting prayers data:', mappedData);
        setPrayers(mappedData);
      } catch (err) {
        console.error('Failed to fetch prayer times:', err);
        setError('Failed to fetch prayer times. Please try again later.');

        // setError('Failed to fetch prayer times.');
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    fetchPrayers();
  }, [location]);

  // Calculate next prayer and countdown
  useEffect(() => {
    if (!prayers) return;

    const timer = setInterval(() => {
      const now = new Date();
      const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      const times = prayers.timings;

      let next = null;
      let minDiff = Infinity;

      for (const name of prayerNames) {
        // @ts-ignore
        const timeStr = times[name];
        const [hours, minutes] = timeStr.split(':').map(Number);
        const prayerDate = new Date();
        prayerDate.setHours(hours, minutes, 0);

        if (prayerDate.getTime() < now.getTime()) {
          // Prayer passed, look at tomorrow? Or just skip
          continue;
        }

        const diff = prayerDate.getTime() - now.getTime();
        if (diff < minDiff) {
          minDiff = diff;
          next = name;
        }
      }

      // If no prayer left today, next is Fajr tomorrow
      if (!next) {
        next = 'Fajr';
        // Logic for tomorrow's Fajr would involve adding 1 day
        // For simplicity now, we'll just say Fajr
      }

      setNextPrayer(next);
      
      const hours = Math.floor(minDiff / (1000 * 60 * 60));
      const mins = Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((minDiff % (1000 * 60)) / 1000);
      
      if (next && minDiff !== Infinity) {
          setTimeToNext(`${hours}h ${mins}m ${secs}s`);
      } else {
          setTimeToNext('Tomorrow');
      }

    }, 1000);

    return () => clearInterval(timer);
  }, [prayers]);

  const getIcon = (name: string) => {
    switch(name) {
      case 'Fajr': return Sunrise;
      case 'Dhuhr': return Sun;
      case 'Asr': return Sun; // Afternoon sun
      case 'Maghrib': return Sunset;
      case 'Isha': return Moon;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Main Card */}
      <div className="glass rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
        {/* Background Gradient/Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center space-x-2 text-white/60 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-montserrat">
                {location ? `${location.lat.toFixed(2)}, ${location.lng.toFixed(2)}` : 'Locating...'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-quicksand mb-2">
              {nextPrayer || 'Loading...'}
            </h1>
            <p className="text-gold-light font-montserrat font-medium text-lg">
              Next Prayer in {timeToNext}
            </p>
          </div>

          <div className="text-right">
             <div className="text-6xl font-great-vibes text-white/20">
               Prayer Times
             </div>
             <div className="text-sm text-white/40 font-montserrat mt-1">
               {format(new Date(), 'EEEE, d MMMM yyyy')}
             </div>
          </div>
        </div>
      </div>

      {loading ? (
         <div className="flex justify-center py-20">
           <Loader2 className="w-10 h-10 animate-spin text-white/30" />
         </div>
      ) : prayers && prayers.timings ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(prayers.timings).map(([name, time]) => {
             // Only show main prayers
             if (!['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(name)) return null;
             
             const Icon = getIcon(name);
             const isNext = name === nextPrayer;

             return (
               <div 
                 key={name}
                 className={`relative p-6 rounded-2xl transition-all duration-300 group ${
                   isNext 
                     ? 'bg-gradient-to-br from-gold to-gold-light scale-105 shadow-xl' 
                     : 'glass hover:bg-white/10'
                 }`}
               >
                 <div className="flex justify-between items-start mb-4">
                   <Icon className={`w-8 h-8 ${isNext ? 'text-white' : 'text-gold-light'}`} />
                   {isNext && (
                     <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-bold">
                       Next
                     </span>
                   )}
                 </div>
                 
                 <h3 className={`text-lg font-bold font-quicksand mb-1 ${isNext ? 'text-white' : 'text-white/90'}`}>
                   {name}
                 </h3>
                 <p className={`text-2xl font-montserrat font-semibold ${isNext ? 'text-white' : 'text-white/60'}`}>
                   {time as string}
                 </p>
               </div>
             );
          })}
        </div>
      ) : (
        <div className="text-center text-red-300 bg-red-500/10 p-4 rounded-xl">
          {error || 'Unable to load prayer times'}
        </div>
      )}
    </div>
  );
}
