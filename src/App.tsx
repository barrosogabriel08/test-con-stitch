import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LeaderboardView } from './components/LeaderboardView';
import { ScheduleView } from './components/ScheduleView';
import { TeamsView } from './components/TeamsView';
import { MyStatsView } from './components/MyStatsView';
import { TeamModal } from './components/TeamModal';
import { TabType, Team } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('leaderboard');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleCloseModal = () => {
    setSelectedTeam(null);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#181c23] flex flex-col items-center">
      {/* Container framed for clean mobile / tablet layout */}
      <div className="w-full max-w-lg min-h-screen flex flex-col bg-[#f9f9ff] shadow-sm relative">
        {/* Top Fixed Header */}
        <Header
          currentTab={currentTab}
          onProfileClick={() => setCurrentTab('my-stats')}
          onLogoClick={() => setCurrentTab('leaderboard')}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full pt-20 pb-24">
          {currentTab === 'leaderboard' && (
            <LeaderboardView
              onSelectTeam={handleSelectTeam}
              onNavigateToSchedule={() => setCurrentTab('schedule')}
              onNavigateToMyStats={() => setCurrentTab('my-stats')}
            />
          )}

          {currentTab === 'schedule' && (
            <ScheduleView onSelectTeam={handleSelectTeam} />
          )}

          {currentTab === 'teams' && (
            <TeamsView onSelectTeam={handleSelectTeam} />
          )}

          {currentTab === 'my-stats' && (
            <MyStatsView />
          )}
        </main>

        {/* Bottom Fixed Nav */}
        <BottomNav
          currentTab={currentTab}
          onChangeTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Modal for Team Details */}
        <TeamModal team={selectedTeam} onClose={handleCloseModal} />
      </div>
    </div>
  );
}
