import React, { useState, useEffect } from 'react';
import { Plus, RotateCcw, Save, Trash2, Loader2 } from 'lucide-react';
import { dhikrAPI } from '../services/api';
import type { DhikrCounter } from '../types';

export default function DhikrPage() {
  const [counters, setCounters] = useState<DhikrCounter[]>([]);
  const [activeCounter, setActiveCounter] = useState<DhikrCounter | null>(null);
  const [loading, setLoading] = useState(true);
  
  const fetchCounters = async () => {
    try {
      const response = await dhikrAPI.getCounters();
      setCounters(response.data);
      if (response.data.length > 0 && !activeCounter) {
        setActiveCounter(response.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch counters', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounters();
  }, []);

  const handleIncrement = async () => {
    if (!activeCounter) return;
    
    const newCount = activeCounter.count + 1;
    const target = activeCounter.targetCount || 33; // Default target
    
    if (newCount <= target) {
      // Optimistic update
      const updated = { ...activeCounter, count: newCount };
      setActiveCounter(updated);
      setCounters(prev => prev.map(c => c.id === updated.id ? updated : c));
      
      try {
        // Debounce could be added here in a real app
        await dhikrAPI.updateCounter(activeCounter.id, newCount);
      } catch (error) {
        console.error('Failed to update counter', error);
        // Revert on failure
        setActiveCounter(activeCounter);
        fetchCounters();
      }
    }
  };

  const handleReset = async () => {
    if (!activeCounter) return;
    
    const updated = { ...activeCounter, count: 0 };
    setActiveCounter(updated);
    setCounters(prev => prev.map(c => c.id === updated.id ? updated : c));
    
    try {
      await dhikrAPI.updateCounter(activeCounter.id, 0);
    } catch (error) {
      console.error('Failed to reset counter', error);
      fetchCounters();
    }
  };
  
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await dhikrAPI.deleteCounter(id);
      setCounters(prev => prev.filter(c => c.id !== id));
      if (activeCounter?.id === id) {
        setActiveCounter(null);
      }
    } catch (error) {
       console.error('Failed to delete counter', error);
    }
  };

  const handleCreate = async () => {
      const name = prompt("Enter Dhikr name:");
      if (!name) return;
      
      try {
          const res = await dhikrAPI.createCounter(name, 33);
          setCounters(prev => [...prev, res.data]);
          setActiveCounter(res.data);
      } catch(error) {
          console.error("Failed to create counter", error);
      }
  }

  // Fallback UI if no counters
  if (!loading && counters.length === 0 && !activeCounter) {
     return (
         <div className="glass rounded-2xl p-10 text-center">
             <h2 className="text-2xl font-bold text-white font-quicksand mb-4">Start Your Dhikr Journey</h2>
             <button onClick={handleCreate} className="bg-gold hover:bg-gold-light text-white px-6 py-3 rounded-full font-bold transition-all">
                 Create First Counter
             </button>
         </div>
     )
  }

  const currentCount = activeCounter?.count || 0;
  const currentTarget = activeCounter?.targetCount || 33;
  const progress = (currentCount / currentTarget) * 100;
  const colors = ['from-blue-400 to-blue-600', 'from-green-400 to-green-600', 'from-red-400 to-red-600', 'from-purple-400 to-purple-600'];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Main Counter */}
      <div className="glass rounded-[3rem] p-8 md:p-12 text-center relative overflow-hidden transition-all duration-300">
        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-white/30" />
            </div>
        ) : activeCounter ? (
            <>
                {/* Background Radial Progress */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <div 
                    className="w-96 h-96 rounded-full border-[20px] border-gold transform rotate-[-90deg]"
                    style={{
                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)` 
                    }}
                />
                </div>

                <h1 className="text-4xl font-bold text-white font-quicksand mb-8">{activeCounter.name}</h1>
                
                <button
                onClick={handleIncrement}
                className="w-64 h-64 md:w-80 md:h-80 rounded-full glass border-4 border-white/10 mx-auto flex flex-col items-center justify-center group active:scale-95 transition-all duration-200 hover:border-gold/30 shadow-2xl relative"
                >
                <div className="absolute inset-0 rounded-full border-4 border-gold transition-all duration-300" style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }} />
                
                <span className="text-8xl md:text-9xl font-bold text-white font-quicksand drop-shadow-lg z-10 select-none">
                    {currentCount}
                </span>
                <span className="text-white/40 font-montserrat mt-2 z-10">
                    Target: {currentTarget}
                </span>
                </button>

                <div className="flex justify-center space-x-6 mt-10">
                <button 
                    onClick={handleReset}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all hover:rotate-[-180deg] duration-500"
                >
                    <RotateCcw className="w-6 h-6" />
                </button>
                
                <button className="p-4 rounded-full bg-gold hover:bg-gold-light text-white shadow-lg hover:shadow-gold/20 hover:scale-110 transition-all">
                    <Save className="w-6 h-6" />
                </button>
                </div>
            </>
        ) : (
            <div className="py-20 text-white/50">Select or create a counter</div>
        )}
      </div>

      {/* Saved Counters */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 px-4 font-quicksand">Your Dhikr Goals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {counters.map((dhikr, idx) => (
            <div 
                key={dhikr.id} 
                onClick={() => setActiveCounter(dhikr)}
                className={`glass p-5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group border ${activeCounter?.id === dhikr.id ? 'border-gold/50 bg-white/5' : 'border-transparent'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors[idx % colors.length]} opacity-80`} />
                <button 
                    onClick={(e) => handleDelete(e, dhikr.id)}
                    className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{dhikr.name}</h3>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-white h-full transition-all duration-500" 
                  style={{ width: `${(dhikr.count / (dhikr.targetCount || 33)) * 100}%` }} 
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/40 font-montserrat">
                <span>{dhikr.count} / {dhikr.targetCount || 33}</span>
                <span>{Math.round((dhikr.count / (dhikr.targetCount || 33)) * 100)}%</span>
              </div>
            </div>
          ))}
          
          <button 
            onClick={handleCreate}
            className="glass p-5 rounded-2xl border-2 border-dashed border-white/10 hover:border-gold/30 hover:bg-white/5 transition-all flex flex-col items-center justify-center text-white/40 hover:text-gold-light h-full min-h-[160px]"
          >
            <Plus className="w-8 h-8 mb-2" />
            <span className="font-bold">New Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
