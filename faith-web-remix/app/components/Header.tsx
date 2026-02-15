import React from 'react';
import { Link } from 'react-router';
import { User, LogOut, Menu, X, Globe, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import NotificationSettings from './NotificationSettings';
import Tooltip from './Tooltip';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const [showMenu, setShowMenu] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showLanguage, setShowLanguage] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const getUserInitials = (user: any) => {
    if (!user) return '';
    const name = user.fullName || user.name || user.email;
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <header className="glass rounded-xl shadow-lg hover:shadow-xl transition-smooth p-3 sm:p-4 md:p-5 lg:p-6 relative">
      <div className="flex justify-between items-center">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
          <div className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-quicksand drop-shadow-md">
            Unified Faith
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link
            to="/calendar"
            className="text-white/80 hover:text-white font-montserrat text-sm lg:text-base transition-smooth"
          >
            Calendar
          </Link>
          <Link
            to="/prayers"
            className="text-white/80 hover:text-white font-montserrat text-sm lg:text-base transition-smooth"
          >
            Prayers
          </Link>
          <Link
            to="/quran"
            className="text-white/80 hover:text-white font-montserrat text-sm lg:text-base transition-smooth"
          >
            Quran
          </Link>
          <Link
            to="/dhikr"
            className="text-white/80 hover:text-white font-montserrat text-sm lg:text-base transition-smooth"
          >
            Dhikr
          </Link>
        </nav>

        {/* User Menu / Auth Button */}
        <div className="flex items-center space-x-3">
          {/* Notification Button */}
          <Tooltip content="Notifications" position="bottom">
            <button
              onClick={() => setShowNotifications(true)}
              className="glass rounded-full p-2 hover:bg-white/20 transition-smooth hidden sm:block"
            >
              <Bell className="w-5 h-5 text-white/90" />
            </button>
          </Tooltip>

          {/* Language Button */}
          <Tooltip content="Change Language" position="bottom">
            <button
              onClick={() => setShowLanguage(true)}
              className="glass rounded-full p-2 hover:bg-white/20 transition-smooth hidden sm:block"
            >
              <Globe className="w-5 h-5 text-white/90" />
            </button>
          </Tooltip>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden glass rounded-full p-2 hover:bg-white/20 transition-smooth"
          >
            {showMenu ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>

          {/* User Button */}
          <div className="relative">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="glass rounded-full p-2 sm:p-2.5 md:p-3 bg-gradient-to-br from-gold-light to-gold-light/20 hover:scale-105 transition-smooth"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white font-bold font-quicksand text-xs sm:text-sm">
                    {getUserInitials(user)}
                  </div>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 glass-dark rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gold-light to-gold-light/20 rounded-full flex items-center justify-center text-white font-bold font-quicksand text-sm">
                          {getUserInitials(user)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold font-quicksand text-sm truncate">
                            {user?.name || user?.fullName}
                          </p>
                          <p className="text-white/60 text-xs font-montserrat truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-smooth font-montserrat text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/auth/login"
                className="glass rounded-full p-2 sm:p-2.5 md:p-3 hover:bg-white/20 hover:scale-105 transition-smooth"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <nav className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col space-y-2">
          <Link
            to="/calendar"
            className="text-white/80 hover:text-white font-montserrat text-sm py-2 transition-smooth"
            onClick={() => setShowMenu(false)}
          >
            Calendar
          </Link>
          <Link
            to="/prayers"
            className="text-white/80 hover:text-white font-montserrat text-sm py-2 transition-smooth"
            onClick={() => setShowMenu(false)}
          >
            Prayers
          </Link>
          <Link
            to="/quran"
            className="text-white/80 hover:text-white font-montserrat text-sm py-2 transition-smooth"
            onClick={() => setShowMenu(false)}
          >
            Quran
          </Link>
          <Link
            to="/dhikr"
            className="text-white/80 hover:text-white font-montserrat text-sm py-2 transition-smooth"
            onClick={() => setShowMenu(false)}
          >
            Dhikr
          </Link>
        </nav>
      )}

      {/* Decorative line */}
      <div className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 md:left-5 md:right-5 lg:left-6 lg:right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Modals */}
      <LanguageSelector isOpen={showLanguage} onClose={() => setShowLanguage(false)} />
      <NotificationSettings isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </header>
  );
}
