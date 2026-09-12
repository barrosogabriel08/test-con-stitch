import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'leaderboard', label: 'Leaderboard', icon: 'military_tech' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar_month' },
    { id: 'teams', label: 'Teams', icon: 'groups' },
    { id: 'my-stats', label: 'My Stats', icon: 'sports_baseball' },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#f9f9ff]/95 backdrop-blur-xl border-t border-[#ebeef7] shadow-[0_-2px_12px_rgba(0,0,0,0.05)]"
      aria-label="Primary Navigation"
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] h-12 transition-all gap-0.5 relative cursor-pointer ${
                isActive
                  ? 'text-[#b81313] font-bold scale-105'
                  : 'text-[#5c403c] hover:text-[#181c23]'
              }`}
            >
              {isActive && (
                <span className="absolute top-1 w-1 h-1 rounded-full bg-[#b81313]" />
              )}
              <span
                className="material-symbols-outlined text-[24px] select-none"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400",
                }}
              >
                {tab.icon}
              </span>
              <span className="font-body text-[10px] tracking-wide whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
