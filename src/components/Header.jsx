import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Settings, Menu } from 'lucide-react';
import ThemeToggle from './ui/theme-toggle';

const Header = ({ user, onLogout, onToggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-card/80 backdrop-blur-xl shadow-sm border-b border-border/50 lg:ml-0 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Mobile menu and search */}
          <div className="flex items-center flex-1 min-w-0">
            {/* Mobile menu button */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-muted mr-3 transition-all duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Mobile title */}
            <div className="lg:hidden">
              <h1 className="text-lg font-bold text-foreground">Pickles Admin</h1>
            </div>
            
            {/* Desktop search */}
            <div className="hidden lg:flex items-center flex-1 max-w-lg ml-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products, orders, customers..."
                  className="w-full pl-11 pr-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary/50 focus:bg-background transition-all duration-200 text-sm placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>

          {/* Right side - Theme toggle, Notifications and user menu */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Notifications */}
            <button className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-xl relative transition-all duration-200 hover:scale-105">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-destructive shadow-sm animate-pulse"></span>
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-semibold">
                    {user?.first_name ? user.first_name.charAt(0).toUpperCase() : 'A'}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {user?.first_name && user?.last_name 
                      ? `${user.first_name} ${user.last_name}` 
                      : user?.username || 'Admin User'
                    }
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email || 'admin@pickles.com'}
                  </p>
                </div>
              </button>

              {/* Dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-52 bg-card/95 backdrop-blur-xl rounded-xl shadow-xl border border-border/50 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-border/30">
                    <p className="text-sm font-semibold text-foreground">
                      {user?.first_name && user?.last_name 
                        ? `${user.first_name} ${user.last_name}` 
                        : user?.username || 'Admin User'
                      }
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email || 'admin@pickles.com'}
                    </p>
                  </div>
                  <button className="flex items-center w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted/80 transition-colors">
                    <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
                    Settings
                  </button>
                  <button 
                    onClick={onLogout}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

