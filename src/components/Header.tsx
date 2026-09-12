import React from 'react';
import { ASSETS } from '../data/mockData';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onProfileClick: () => void;
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onProfileClick, onLogoClick }) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'leaderboard':
        return 'Leaderboard';
      case 'schedule':
        return 'Schedule';
      case 'teams':
        return 'Teams';
      case 'my-stats':
        return 'My Stats';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f9f9ff]/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#ebeef7]">
      <div className="max-w-2xl mx-auto h-20 px-5 flex items-center justify-between gap-2">
        {/* Left: Brand Identity */}
        <button
          type="button"
          onClick={onLogoClick}
          className="flex items-center gap-2.5 min-w-0 text-left focus:outline-none group cursor-pointer"
        >
          <img
            alt="Sunday Rollers Kickball Logo"
            className="h-9 w-auto object-contain flex-shrink-0 transition-transform group-hover:scale-105"
            src={ASSETS.logo}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-[17px] font-bold text-[#181c23] tracking-tight truncate">
                Sunday Rollers
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#ffc72c] text-[#6f5400] font-body text-[10px] font-bold uppercase tracking-wider">
                REC
              </span>
            </div>
            <span className="font-body text-[11px] text-[#5c403c] truncate font-medium">
              Spring &apos;25 Season • Week 6
            </span>
          </div>
        </button>

        {/* Right: Screen Name & Profile Avatar */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden sm:inline font-headline text-[16px] font-bold text-[#b81313]">
            {getTabTitle()}
          </span>

          <button
            type="button"
            onClick={onProfileClick}
            aria-label="View Player Profile"
            className="relative p-0.5 rounded-full bg-[#e5e8f2] hover:ring-2 hover:ring-[#b81313]/30 transition-all cursor-pointer group"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover group-hover:opacity-90"
              src={ASSETS.userProfile}
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00864b] border-2 border-[#f9f9ff] rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
