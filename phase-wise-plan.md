# **Unified Faith Service - Features List**

## **📋 Overview**

Unified Faith Service is a comprehensive, multi-faith spiritual companion platform designed with backend APIs and database architecture for maximum scalability and extensibility. This document outlines the feature set, starting with **Islamic (Islam)** features based on the OpenTaqwa reference implementation, with infrastructure designed to support multiple faiths.

---

## **🏗️ Core Architecture Principles**

### **Multi-Faith Design**

- **Faith-agnostic core infrastructure** - All features are designed with faith as a configurable dimension
- **Database-driven configuration** - Faith-specific data (prayers, texts, calendars) stored in database, not hardcoded
- **Extensible API design** - RESTful APIs that support faith parameter filtering
- **Localization support** - Multi-language support with RTL for Arabic, Hebrew, and other scripts
- **User preference system** - Users can select their faith tradition and customize their experience

### **Technical Stack Considerations**

- **Backend**: NestJS with TypeScript (as seen in current project structure)
- **Database**: Relational database (PostgreSQL) with Prisma ORM (already in use)
- **Authentication**: JWT-based auth with role-based access control
- **APIs**: RESTful with OpenAPI/Swagger documentation
- **Cloud Storage**: For media files (audio recitations, images)
- **Real-time**: WebSocket support for notifications and live updates
- **Caching**: Redis for performance optimization

---

## **🕌 Phase 1: Core Islamic Features (MVP)**

### **1. Prayer Times Management 🕰️**

**Priority:** HIGH | **Faith:** Islam | **Database Entities:** `prayer_times`, `user_locations`, `calculation_methods`

### **Features**

- Calculate and display 5 daily prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha)
- Support multiple calculation methods (MWL, ISNA, Umm al-Qura, etc.)
- Geolocation-based automatic prayer times
- Manual location override
- Timezone handling and DST adjustments
- Historical and future prayer time queries

### **API Endpoints**

```

GET    /api/v1/prayers/times          # Get prayer times for location and date
GET    /api/v1/prayers/current         # Get next/current prayer
POST   /api/v1/prayers/location        # Save user location
GET    /api/v1/prayers/methods         # Get available calculation methods
```

### **Database Schema**

- `prayer_times` - Cached prayer times by location/date
- `user_locations` - User's saved locations with calculation preferences
- `calculation_methods` - Available prayer calculation methods

---

### **2. Prayer Tracking (Salah Tracker) ✅**

**Priority:** HIGH | **Faith:** Islam | **Database Entities:** `prayer_logs`, `prayer_stats`

### **Features**

- Log completed prayers (on-time, late, qada/makeup)
- Prayer streak tracking (consecutive days)
- Monthly/yearly statistics and analytics
- Visual calendar view of prayer completion
- Qada counter (missed prayers to make up)
- Completion percentage dashboards
- Historical data export

### **API Endpoints**

```

POST   /api/v1/prayers/log             # Log a completed prayer
GET    /api/v1/prayers/logs            # Get prayer logs (with filters)
GET    /api/v1/prayers/stats           # Get prayer statistics
GET    /api/v1/prayers/streaks         # Get current streak information
PATCH  /api/v1/prayers/log/:id         # Update prayer log entry
DELETE /api/v1/prayers/log/:id         # Delete prayer log entry
```

### **Database Schema**

- `prayer_logs` - Individual prayer completion records
- `prayer_stats` - Aggregated statistics (daily/monthly/yearly)
- `prayer_streaks` - Streak tracking data

---

### **3. Digital Quran Reader 📖**

**Priority:** HIGH | **Faith:** Islam | **Database Entities:** `quran_verses`, `quran_translations`, `quran_audio`, `user_bookmarks`

### **Features**

- Complete Quran text (Arabic) by Surah and Ayah
- Multiple translations (English, Urdu, French, etc.)
- Multiple transliterations
- Audio recitation with multiple reciters (Al-Afasy, Al-Minshawi, etc.)
- Verse-by-verse playback with highlighting
- Bookmarks and favorites system
- Last read position auto-save
- Search by keyword, Surah, Juz, or topic
- Tafsir (commentary) integration
- Word-by-word translation view
- Copy/share verses

### **API Endpoints**

```

GET    /api/v1/quran/surahs            # List all surahs
GET    /api/v1/quran/surah/:id         # Get surah with verses
GET    /api/v1/quran/verse/:id         # Get specific verse
GET    /api/v1/quran/search            # Search verses
GET    /api/v1/quran/translations      # List available translations
GET    /api/v1/quran/audio/:verse_id   # Get audio URL for verse
POST   /api/v1/quran/bookmarks         # Save bookmark
GET    /api/v1/quran/bookmarks         # Get user bookmarks
POST   /api/v1/quran/progress          # Update reading progress
```

### **Database Schema**

- `quran_verses` - All Quran verses in Arabic
- `quran_translations` - Translations in multiple languages
- `quran_audio` - Audio file references by reciter
- `user_bookmarks` - User's saved bookmarks
- `user_reading_progress` - Last read position

---

### **4. Dhikr Counter & Goal Tracking 📿**

**Priority:** HIGH | **Faith:** Islam | **Database Entities:** `dhikr_counters`, `dhikr_goals`, `dhikr_history`

### **Features**

- Multiple independent dhikr counters
- Preset dhikr phrases (Subhanallah, Alhamdulillah, etc.)
- Custom dhikr creation
- Daily/weekly/monthly goal setting
- Progress tracking with visual indicators
- Streak tracking
- Achievement badges and milestones
- Historical data charts
- Tasbih sets (33, 99, 100, custom)
- Counter reset and history

### **API Endpoints**

```

GET    /api/v1/dhikr/counters          # Get user's counters
POST   /api/v1/dhikr/counters          # Create new counter
PATCH  /api/v1/dhikr/counters/:id      # Increment/update counter
DELETE /api/v1/dhikr/counters/:id      # Delete counter
POST   /api/v1/dhikr/goals             # Create dhikr goal
GET    /api/v1/dhikr/goals             # Get dhikr goals
GET    /api/v1/dhikr/stats             # Get dhikr statistics
GET    /api/v1/dhikr/history           # Get dhikr history
```

### **Database Schema**

- `dhikr_counters` - Active dhikr counters
- `dhikr_goals` - User's dhikr goals
- `dhikr_history` - Historical dhikr counts
- `dhikr_presets` - Preset dhikr phrases

---

### **5. Islamic Calendar (Hijri) 📅**

**Priority:** HIGH | **Faith:** Islam | **Database Entities:** `hijri_dates`, `islamic_events`

### **Features**

- Hijri date display with Gregorian conversion
- Important Islamic dates highlighting (Ramadan, Eid, Ashura, etc.)
- Countdown to major events
- Month/year calendar view
- Historical date conversion
- Event reminders and notifications
- Customizable event list

### **API Endpoints**

```

GET    /api/v1/calendar/hijri          # Get Hijri date for Gregorian date
GET    /api/v1/calendar/convert        # Convert between calendars
GET    /api/v1/calendar/events         # Get Islamic events
GET    /api/v1/calendar/upcoming       # Get upcoming events
POST   /api/v1/calendar/reminders      # Set event reminders
```

### **Database Schema**

- `hijri_dates` - Hijri calendar mapping
- `islamic_events` - Important Islamic dates and events
- `user_event_reminders` - User's event reminder preferences

---

### **6. Dua Collections 🤲**

**Priority:** HIGH | **Faith:** Islam | **Database Entities:** `duas`, `dua_categories`, `user_favorite_duas`

### **Features**

- Comprehensive dua library
- Categorization (morning, evening, food, travel, hardship, etc.)
- Search by category, keyword, or occasion
- Arabic text with translations (English, Urdu, etc.)
- Transliteration support
- Audio recitation
- Favorites/bookmarks system
- Custom duas (user-created)
- Share functionality
- Daily dua notifications

### **API Endpoints**

```

GET    /api/v1/duas                    # Get duas (with filters)
GET    /api/v1/duas/:id                # Get specific dua
GET    /api/v1/duas/categories         # Get dua categories
GET    /api/v1/duas/search             # Search duas
POST   /api/v1/duas/custom             # Create custom dua
POST   /api/v1/duas/favorites          # Save favorite dua
GET    /api/v1/duas/favorites          # Get favorite duas
GET    /api/v1/duas/daily              # Get daily dua recommendation
```

### **Database Schema**

- `duas` - Dua library with Arabic text and translations
- `dua_categories` - Dua categorization
- `dua_audio` - Audio file references
- `user_favorite_duas` - User's favorite duas
- `user_custom_duas` - User-created duas

---

### **7. Asma ul Husna (99 Names of Allah) 🌟**

**Priority:** MEDIUM | **Faith:** Islam | **Database Entities:** `allah_names`, `user_name_favorites`

### **Features**

- All 99 names with Arabic, transliteration, and translation
- Meaning and significance of each name
- Audio pronunciation
- Search and filter
- Favorites system
- Daily name notification
- Recitation mode (auto-advance)

### **API Endpoints**

```

GET    /api/v1/names/allah             # Get all 99 names
GET    /api/v1/names/allah/:id         # Get specific name details
POST   /api/v1/names/favorites         # Save favorite name
GET    /api/v1/names/daily             # Get daily name
```

### **Database Schema**

- `allah_names` - 99 names with translations
- `user_name_favorites` - User's favorite names

---

### **8. Qibla Finder 🧭**

**Priority:** MEDIUM | **Faith:** Islam | **Database Entities:** `user_locations`, `qibla_cache`

### **Features**

- Qibla direction calculation from user location
- Compass visualization
- Distance to Kaaba
- Accuracy indicator
- Offline support with cached data
- Multiple location support

### **API Endpoints**

```

GET    /api/v1/qibla                   # Get Qibla direction for location
POST   /api/v1/qibla/calculate         # Calculate Qibla for coordinates
```

### **Database Schema**

- `qibla_cache` - Cached Qibla calculations by location

## **🌙 Phase 2: Advanced Islamic Features**

### **9. Fasting Tracker**

**Priority:** MEDIUM | **Faith:** Islam | **Database Entities:** `fasting_logs`, `ramadan_calendar`

### **Features**

- Ramadan fasting calendar
- Voluntary fasting tracker (Mondays, Thursdays, Ayyam al-Bid, etc.)
- Suhoor and Iftar times
- Fasting intentions logging
- Missed fasts counter (qada)
- Kaffarah tracker
- Fidya calculator
- Statistics and history

### **API Endpoints**

```

POST   /api/v1/fasting/log             # Log fasting day
GET    /api/v1/fasting/logs            # Get fasting logs
GET    /api/v1/fasting/ramadan         # Get Ramadan calendar
GET    /api/v1/fasting/stats           # Get fasting statistics
GET    /api/v1/fasting/times           # Get Suhoor/Iftar times
```

---

### **10. Zakat Calculator 💰**

**Priority:** MEDIUM | **Faith:** Islam | **Database Entities:** `zakat_calculations`, `nisab_rates`

### **Features**

- Calculate Nisab threshold (gold/silver)
- Input various assets (cash, gold, silver, investments, business assets)
- Calculate Zakat due (2.5%)
- Payment tracking
- Annual reminders
- Historical calculations
- Currency conversion support

### **API Endpoints**

```

GET    /api/v1/zakat/nisab             # Get current Nisab threshold
POST   /api/v1/zakat/calculate         # Calculate Zakat
POST   /api/v1/zakat/save              # Save Zakat calculation
GET    /api/v1/zakat/history           # Get calculation history
```

---

### **11. Hadith Collections 📚**

**Priority:** MEDIUM | **Faith:** Islam | **Database Entities:** `hadiths`, `hadith_books`, `hadith_chapters`

### **Features**

- Major hadith collections (Bukhari, Muslim, Abu Dawud, Tirmidhi, etc.)
- Hadith of the day
- Search by keyword, topic, or narrator
- Bookmarks and favorites
- Multiple translations
- Authenticity grading
- Share functionality

### **API Endpoints**

```

GET    /api/v1/hadiths                 # Get hadiths (with filters)
GET    /api/v1/hadiths/:id             # Get specific hadith
GET    /api/v1/hadiths/daily           # Get daily hadith
GET    /api/v1/hadiths/books           # Get hadith books
GET    /api/v1/hadiths/search          # Search hadiths
```

---

### **12. Mosque Finder 🕌**

**Priority:** MEDIUM | **Faith:** Islam | **Database Entities:** `mosques`, `mosque_prayer_times`

### **Features**

- Find nearby mosques using geolocation
- View mosque details (address, contact, facilities)
- Prayer times for specific mosques
- Directions and navigation integration
- Save favorite mosques
- Mosque reviews and ratings
- Event listings
- Jummah times

### **API Endpoints**

```

GET    /api/v1/mosques/nearby          # Find mosques by location
GET    /api/v1/mosques/:id             # Get mosque details
GET    /api/v1/mosques/:id/times       # Get mosque prayer times
POST   /api/v1/mosques/favorites       # Save favorite mosque
```

---

### **13. Tafsir (Quranic Exegesis) 📖**

**Priority:** LOW | **Faith:** Islam | **Database Entities:** `tafsir`, `tafsir_authors`

### **Features**

- Multiple tafsir sources (Ibn Kathir, Jalalayn, etc.)
- Verse-by-verse commentary
- Search tafsir
- Multiple languages
- Bookmarks

### **API Endpoints**

```

GET    /api/v1/tafsir/verse/:id        # Get tafsir for verse
GET    /api/v1/tafsir/sources          # Get available tafsir sources
```

---

## **🔔 Phase 3: Engagement & Notification Features**

### **14. Smart Notifications System**

**Priority:** HIGH | **Database Entities:** `user_notifications`, `notification_preferences`

### **Features**

- Prayer time reminders (10 mins before, at time)
- Adhan sound playback option
- Daily Quran verse notification
- Daily hadith notification
- Daily dua notification
- Dhikr goal reminders
- Event reminders (Ramadan, Eid, etc.)
- Customizable notification schedule
- Snooze/dismiss functionality
- Push notifications (mobile) and browser notifications

### **API Endpoints**

```

POST   /api/v1/notifications/preferences   # Set notification preferences
GET    /api/v1/notifications/preferences   # Get notification preferences
GET    /api/v1/notifications               # Get user notifications
PATCH  /api/v1/notifications/:id/read      # Mark notification as read
POST   /api/v1/notifications/test          # Send test notification
```

## **Phase 4: User Management & Personalization**

### **15. User Authentication & Profiles**

**Priority:** HIGH | **Database Entities:** `users`, `user_profiles`, `user_preferences`

### **Features**

- Email/password authentication
- Social login (Google, Apple, Facebook)
- Password reset functionality
- Email verification
- User profile management
- Faith selection (Islam initially, expandable)
- Language preferences
- Timezone settings
- Theme preferences (dark/light)
- Privacy settings

### **API Endpoints**

```

POST   /api/v1/auth/register           # Register new user
POST   /api/v1/auth/login              # Login user
POST   /api/v1/auth/logout             # Logout user
POST   /api/v1/auth/forgot-password    # Request password reset
POST   /api/v1/auth/reset-password     # Reset password
GET    /api/v1/users/profile           # Get user profile
PATCH  /api/v1/users/profile           # Update user profile
GET    /api/v1/users/preferences       # Get user preferences
PATCH  /api/v1/users/preferences       # Update user preferences
```

---

### **16. Cross-Device Synchronization**

**Priority:** HIGH | **Database Entities:** All user-specific entities

### **Features**

- Cloud backup of all user data
- Real-time sync across devices
- Conflict resolution
- Offline mode with sync on reconnect
- Data export/import functionality
- Account deletion with data cleanup

### **API Endpoints**

```

POST   /api/v1/sync/upload             # Upload local data
GET    /api/v1/sync/download           # Download cloud data
GET    /api/v1/sync/status             # Get sync status
POST   /api/v1/export                  # Export user data
POST   /api/v1/import                  # Import user data
```

---

### **17. Achievements & Gamification**

**Priority:** LOW | **Database Entities:** `achievements`, `user_achievements`, `leaderboards`

### **Features**

- Achievement badges (prayer streaks, dhikr goals, Quran completion, etc.)
- Points system
- Leaderboards (optional, privacy-aware)
- Milestone celebrations
- Progress visualization
- Challenge system

### **API Endpoints**

```

GET    /api/v1/achievements             # Get all achievements
GET    /api/v1/achievements/user        # Get user's achievements
GET    /api/v1/leaderboards             # Get leaderboards
```

---

## **🌍 Phase 5: Multi-Faith Expansion Readiness**

### **18. Faith Configuration System**

**Priority:** MEDIUM | **Database Entities:** `faiths`, `faith_features`, `faith_content`

### **Features**

- Define multiple faith traditions
- Faith-specific feature enablement
- Content management per faith
- Prayer times for different faiths
- Sacred texts management
- Calendar systems (Gregorian, Hijri, Hebrew, etc.)
- Multi-language content

### **Future Faith Support**

- **Christianity** - Bible reader, prayer times, Christian calendar
- **Judaism** - Torah reader, Jewish calendar, kosher tracker
- **Hinduism** - Bhagavad Gita, puja times, Hindu calendar
- **Buddhism** - Dhammapada, meditation tracker
- **Sikhism** - Guru Granth Sahib, Sikh calendar
- **And more...**

### **API Endpoints**

```

GET    /api/v1/faiths                  # Get available faiths
GET    /api/v1/faiths/:id/features     # Get faith-specific features
GET    /api/v1/faiths/:id/content      # Get faith-specific content
```

---

## **📊 Phase 6: Analytics & Insights**

### **19. User Analytics Dashboard**

**Priority:** LOW | **Database Entities:** `user_analytics`, `usage_stats`

### **Features**

- Prayer completion trends
- Quran reading progress
- Dhikr statistics
- Activity heatmaps
- Personalized insights
- Goal achievement tracking
- Time spent in app
- Most used features

### **API Endpoints**

```

GET    /api/v1/analytics/overview      # Get analytics overview
GET    /api/v1/analytics/prayers       # Prayer analytics
GET    /api/v1/analytics/quran         # Quran reading analytics
GET    /api/v1/analytics/dhikr         # Dhikr analytics
```

---

## **🔧 Technical Features**

### **20. Admin Panel**

**Priority:** MEDIUM | **Database Entities:** `admin_users`, `admin_logs`

### **Features**

- User management
- Content management (duas, hadiths, events)
- Analytics and reporting
- Feature flags
- System health monitoring
- Audit logs

---

### **21. API Documentation**

**Priority:** HIGH

### **Features**

- OpenAPI/Swagger documentation
- Interactive API explorer
- Code examples in multiple languages
- Versioning strategy
- Rate limiting documentation

---

### **22. Mobile App Support**

**Priority:** HIGH

### **Features**

- RESTful APIs for mobile consumption
- Push notification infrastructure
- Offline data caching strategy
- Image/audio CDN integration
- GraphQL support (optional)

---

## **🎯 Implementation Priority Matrix**

| **Feature** | **Priority** | **Impact** | **Effort** | **Phase** |
| --- | --- | --- | --- | --- |
| Prayer Times | HIGH | HIGH | MEDIUM | 1 |
| Prayer Tracking | HIGH | HIGH | MEDIUM | 1 |
| Quran Reader | HIGH | HIGH | HIGH | 1 |
| Dhikr Counter | HIGH | HIGH | LOW | 1 |
| Hijri Calendar | HIGH | MEDIUM | LOW | 1 |
| Dua Collections | HIGH | HIGH | MEDIUM | 1 |
| User Auth | HIGH | HIGH | MEDIUM | 1 |
| Notifications | HIGH | HIGH | MEDIUM | 3 |
| Asma ul Husna | MEDIUM | MEDIUM | LOW | 1 |
| Qibla Finder | MEDIUM | MEDIUM | LOW | 1 |
| Fasting Tracker | MEDIUM | MEDIUM | MEDIUM | 2 |
| Zakat Calculator | MEDIUM | MEDIUM | MEDIUM | 2 |
| Hadith Collections | MEDIUM | MEDIUM | HIGH | 2 |
| Mosque Finder | MEDIUM | MEDIUM | HIGH | 2 |
| Tafsir | LOW | MEDIUM | HIGH | 2 |
| Achievements | LOW | LOW | MEDIUM | 4 |
| Multi-Faith | MEDIUM | HIGH | HIGH | 5 |

---

## **🗄️ Database Design Considerations**

### **Core Tables**

- **users** - User accounts and authentication
- **user_profiles** - Extended user information
- **user_preferences** - User settings and preferences
- **faiths** - Faith traditions configuration
- **prayer_times** - Cached prayer times
- **prayer_logs** - Prayer completion tracking
- **quran_verses** - Complete Quran text
- **quran_translations** - Translations
- **duas** - Dua library
- **dhikr_counters** - Dhikr counters
- **user_bookmarks** - Bookmarks across all content
- **notifications** - User notifications
- **achievements** - Achievement definitions
- **user_achievements** - User achievement progress

### **Scalability Considerations**

- Proper indexing on frequently queried fields
- Partitioning large tables (prayer_logs, analytics)
- Redis caching for frequently accessed data
- CDN for static assets (audio, images)
- Database replication for read scaling
- API rate limiting

---

## **🚀 Recommended Implementation Roadmap**

### **Sprint 1-2 (MVP Foundation - 4 weeks)**

1. User Authentication & Profiles
2. Prayer Times Management
3. Basic Quran Reader (text only)
4. Hijri Calendar Display
5. Admin panel foundation

### **Sprint 3-4 (Core Features - 4 weeks)**

1. Prayer Tracking
2. Dhikr Counter with goals
3. Dua Collections
4. Asma ul Husna
5. Notification system foundation

### **Sprint 5-6 (Enhanced Features - 4 weeks)**

1. Quran audio integration
2. Qibla Finder
3. Prayer time notifications
4. Advanced Quran features (search, bookmarks)
5. Cross-device sync

### **Sprint 7-8 (Advanced Features - 4 weeks)**

1. Fasting Tracker
2. Zakat Calculator
3. Hadith Collections
4. Dashboard analytics
5. Achievement system

### **Sprint 9+ (Expansion)**

1. Mosque Finder
2. Tafsir integration
3. Mobile app optimization
4. Multi-faith infrastructure
5. Advanced analytics

---

## **📝 Key Differentiators from OpenTaqwa**

1. **Backend-First Architecture** - All features backed by robust APIs
2. **Database-Driven** - Scalable data storage vs localStorage
3. **Multi-Faith Ready** - Infrastructure designed for multiple faiths
4. **Cloud Sync** - Cross-device synchronization
5. **Enterprise Grade** - Authentication, authorization, audit logs
6. **API-First** - Can support web, mobile, desktop, third-party integrations
7. **Analytics & Insights** - Data-driven user engagement
8. **Scalable Infrastructure** - Designed to handle millions of users
9. **Real-time Features** - WebSocket support for live updates
10. **Content Management** - Admin panel for managing duas, hadiths, events

---

**Last Updated:** February 15, 2026

**Version:** 1.0