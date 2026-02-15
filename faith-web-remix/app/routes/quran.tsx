import React, { useState, useEffect } from 'react';
import { Search, Book, Bookmark, PlayCircle, Loader2 } from 'lucide-react';
import { quranAPI } from '../services/api';
import type { Surah } from '../types';

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await quranAPI.getSurahs();
        setSurahs(response.data);
      } catch (error) {
        console.error('Failed to fetch surahs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  const filteredSurahs = surahs.filter(surah => 
    surah.nameTransliteration.toLowerCase().includes(search.toLowerCase()) ||
    surah.nameArabic.includes(search) ||
    String(surah.id).includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-8 text-center relative overflow-hidden">
        {/* ... header content ... */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-forest/20 to-transparent pointer-events-none" />
        <Book className="w-16 h-16 text-white/20 mx-auto mb-4" />
        <h1 className="text-4xl font-bold font-quicksand text-white mb-2">
          The Noble Quran
        </h1>
        <p className="text-white/60 font-montserrat max-w-2xl mx-auto">
          Read, listen, and reflect upon the words of Allah
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto relative group">
          <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/30 transition-all opacity-50" />
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search by Surah name or number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all shadow-xl"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-white/30" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSurahs.map((surah) => (
            <div 
              key={surah.id}
              className="glass p-4 rounded-xl hover:bg-white/10 transition-all group cursor-pointer border border-transparent hover:border-gold/20"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-full bg-forest/20 flex items-center justify-center text-forest-light font-bold font-quicksand group-hover:bg-forest/30 transition-colors">
                  {surah.id}
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
                     <PlayCircle className="w-5 h-5" />
                   </button>
                   <button className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors">
                     <Bookmark className="w-5 h-5" />
                   </button>
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-lg font-bold text-white font-quicksand">{surah.nameTransliteration}</h3>
                  <p className="text-xs text-white/50 font-montserrat">{surah.revelationPlace}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-amiri text-gold-light mb-1">{surah.nameArabic}</p>
                  <p className="text-xs text-white/40">{surah.versesCount} Ayahs</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
