import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import { format, addMonths, subMonths, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { calendarAPI } from '../services/api';
import type { CalendarDate, IslamicEvent } from '../types';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<any[]>([]);
  const [events, setEvents] = useState<IslamicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayHijri, setTodayHijri] = useState<CalendarDate | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch today's date info
        const todayRes = await calendarAPI.getToday();
        setTodayHijri(todayRes.data);

        // Fetch calendar grid data (mocked for now as API might not support full grid yet)
        // In a real implementation, we'd fetch the whole month's data
        // For now, we'll just fetch events
        const eventsRes = await calendarAPI.getEvents();
        setEvents(eventsRes.data);
      } catch (error) {
        console.error('Failed to fetch calendar data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentDate]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Generate calendar grid
  const renderCalendarGrid = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const days = [];
    // Empty cells for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 glass-dark/30 rounded-lg"></div>);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isToday = isSameDay(date, new Date());
      const hasEvent = false; // Would check against events array

      days.push(
        <div 
          key={i} 
          className={`h-24 p-2 rounded-lg relative group transition-all hover:bg-white/5 border ${
            isToday 
              ? 'bg-gold/10 border-gold/50' 
              : 'glass border-transparent hover:border-white/10'
          }`}
        >
          <span className={`text-sm font-bold ${isToday ? 'text-gold-light' : 'text-white/80'}`}>
            {i}
          </span>
          
          {/* Mock Hijri date - in real app would come from API */}
          <span className="absolute top-2 right-2 text-xs text-white/40 font-montserrat">
            {/* simple calculation or API data */}
          </span>

          {/* Events placeholder */}
          {hasEvent && (
            <div className="mt-2 text-xs bg-forest/40 text-white/90 p-1 rounded truncate">
              Event Name
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-quicksand text-white mb-2">
            Islamic Calendar
          </h1>
          <p className="text-white/60 font-montserrat">
            Discover Hijri dates and important Islamic events
          </p>
        </div>

        {/* Today's Date Card */}
        <div className="glass-dark p-4 rounded-xl flex items-center space-x-4 min-w-[280px]">
          <div className="bg-gold/20 p-3 rounded-full">
            <CalendarIcon className="w-8 h-8 text-gold-light" />
          </div>
          <div>
            <p className="text-xs text-white/50 uppercase tracking-wider font-bold">Today</p>
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-white/50" />
            ) : (
              <>
                <p className="text-lg font-bold text-white font-quicksand">
                  {todayHijri?.hijri?.day} {todayHijri?.hijri?.monthName} {todayHijri?.hijri?.year}
                </p>
                <p className="text-sm text-white/60 font-montserrat">
                  {format(new Date(), 'EEEE, d MMMM yyyy')}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10">
        <button 
          onClick={prevMonth}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <h2 className="text-xl font-bold text-white font-quicksand">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        
        <button 
          onClick={nextMonth}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="glass rounded-2xl p-4 sm:p-6">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {weekDays.map(day => (
            <div key={day} className="text-center text-white/40 font-bold text-sm uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2 sm:gap-4">
          {renderCalendarGrid()}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 font-quicksand flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 text-gold-light" />
          Upcoming Events
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-full flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-white/30" />
            </div>
          ) : events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-gold/30 transition-all cursor-default">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gold-light font-bold font-quicksand text-lg">{event.name}</span>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/60">
                    {event.hijriDay} {event.hijriMonth}
                  </span>
                </div>
                <p className="text-sm text-white/60 line-clamp-2">{event.description}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-white/40 py-8">
              No upcoming events found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
