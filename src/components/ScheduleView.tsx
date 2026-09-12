import React, { useState } from 'react';
import { GAMES, TEAMS } from '../data/mockData';
import { Game, Team } from '../types';

interface ScheduleViewProps {
  onSelectTeam: (team: Team) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ onSelectTeam }) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(6);
  const [filterMode, setFilterMode] = useState<'all' | 'my-team'>('all');
  const [rsvps, setRsvps] = useState<{ [gameId: string]: boolean }>({
    'game-w6-motw': true,
  });

  const toggleRsvp = (gameId: string) => {
    setRsvps((prev) => ({
      ...prev,
      [gameId]: !prev[gameId],
    }));
  };

  const filteredGames = GAMES.filter((game) => {
    if (game.week !== selectedWeek) return false;
    if (filterMode === 'my-team') {
      return game.homeTeamId === 'team-beasts' || game.awayTeamId === 'team-beasts';
    }
    return true;
  });

  const getTeam = (teamId: string): Team => {
    return TEAMS.find((t) => t.id === teamId) || TEAMS[0];
  };

  return (
    <div className="flex flex-col w-full pb-8 animate-fadeIn">
      {/* Header Info */}
      <section className="px-5 pt-3 pb-3">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="font-headline text-[26px] font-bold text-[#181c23] tracking-tight">
              Season Schedule
            </h1>
            <p className="font-body text-[12px] text-[#5c403c]">
              Park Diamond Complex • All games 7 innings or 55 min
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#ffdad5] text-[#b81313] font-body text-[11px] font-bold">
            Week {selectedWeek}
          </span>
        </div>

        {/* Week Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 mt-2">
          {[
            { week: 5, label: 'Week 5 (Past)' },
            { week: 6, label: 'Week 6 (Today)' },
            { week: 7, label: 'Week 7 (Playoffs)' },
          ].map((w) => (
            <button
              key={w.week}
              type="button"
              onClick={() => setSelectedWeek(w.week)}
              className={`px-3.5 py-1.5 rounded-full font-body text-[12px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedWeek === w.week
                  ? 'bg-[#b81313] text-white shadow-sm'
                  : 'bg-[#e5e8f2] text-[#5c403c] hover:bg-[#dfe2ec]'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        {/* Sub-filter: All Games vs My Team */}
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`flex-1 py-1.5 rounded-full text-[11px] font-body font-bold transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-[#181c23] text-white'
                : 'bg-[#f1f3fd] text-[#5c403c] hover:bg-[#e5e8f2]'
            }`}
          >
            All Diamond Games
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('my-team')}
            className={`flex-1 py-1.5 rounded-full text-[11px] font-body font-bold transition-colors cursor-pointer ${
              filterMode === 'my-team'
                ? 'bg-[#ffc72c] text-[#6f5400]'
                : 'bg-[#f1f3fd] text-[#5c403c] hover:bg-[#e5e8f2]'
            }`}
          >
            My Team (Beasts 🦬)
          </button>
        </div>
      </section>

      {/* Games List */}
      <section className="px-5 space-y-3">
        {filteredGames.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-[1.5rem] border border-[#ebeef7]">
            <p className="text-3xl mb-2">⚾</p>
            <p className="font-headline text-[16px] font-bold text-[#181c23]">No games match your filter</p>
            <p className="font-body text-[12px] text-[#5c403c] mt-1">Switch to &apos;All Diamond Games&apos; to see the entire schedule.</p>
          </div>
        ) : (
          filteredGames.map((game) => {
            const home = getTeam(game.homeTeamId);
            const away = getTeam(game.awayTeamId);
            const isAttending = rsvps[game.id] ?? false;

            return (
              <div
                key={game.id}
                className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-[#ebeef7] relative overflow-hidden transition-all hover:border-[#b81313]/30"
              >
                {/* Match Header Tag */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#ebeef7]">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-body text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        game.status === 'live'
                          ? 'bg-[#dc3129] text-white animate-pulse'
                          : game.status === 'final'
                          ? 'bg-[#dfe2ec] text-[#5c403c]'
                          : 'bg-[#ffc72c] text-[#6f5400]'
                      }`}
                    >
                      {game.status === 'live' ? `● ${game.statusText}` : game.statusText}
                    </span>
                    <span className="font-body text-[11px] text-[#5c403c] font-medium">
                      {game.field}
                    </span>
                  </div>
                  <span className="font-body text-[11px] font-bold text-[#181c23]">{game.time}</span>
                </div>

                {/* Teams Scoreboard Grid */}
                <div className="grid grid-cols-12 items-center gap-2 mb-3">
                  {/* Away Team */}
                  <div
                    onClick={() => onSelectTeam(away)}
                    className="col-span-5 flex items-center gap-2.5 cursor-pointer group"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {away.emoji}
                    </span>
                    <div className="min-w-0">
                      <div className="font-body text-[13px] font-bold text-[#181c23] group-hover:text-[#b81313] transition-colors truncate">
                        {away.name}
                      </div>
                      <div className="font-body text-[10px] text-[#5c403c]">
                        {away.wins}-{away.losses}
                      </div>
                    </div>
                  </div>

                  {/* Score or VS */}
                  <div className="col-span-2 text-center">
                    {game.status === 'final' || game.status === 'live' ? (
                      <div className="flex items-center justify-center gap-1.5 font-headline text-[18px] font-black text-[#181c23]">
                        <span>{game.awayScore}</span>
                        <span className="text-xs text-[#5c403c]">-</span>
                        <span>{game.homeScore}</span>
                      </div>
                    ) : (
                      <span className="font-headline text-[15px] font-extrabold text-[#b81313]">
                        VS
                      </span>
                    )}
                  </div>

                  {/* Home Team */}
                  <div
                    onClick={() => onSelectTeam(home)}
                    className="col-span-5 flex items-center justify-end gap-2.5 cursor-pointer group text-right"
                  >
                    <div className="min-w-0">
                      <div className="font-body text-[13px] font-bold text-[#181c23] group-hover:text-[#b81313] transition-colors truncate">
                        {home.name}
                      </div>
                      <div className="font-body text-[10px] text-[#5c403c]">
                        {home.wins}-{home.losses}
                      </div>
                    </div>
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {home.emoji}
                    </span>
                  </div>
                </div>

                {/* Infield Diamond Graphics for Live Game */}
                {game.status === 'live' && game.runnersOnBase && (
                  <div className="bg-[#f1f3fd] rounded-xl p-2.5 mb-3 flex items-center justify-between border border-[#ebeef7]">
                    <div className="flex items-center gap-2">
                      <div className="relative w-9 h-9 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-[#906f6b] rotate-45"></div>
                        {/* 2nd Base */}
                        <div
                          className={`absolute top-0 w-2 h-2 rounded-full ${
                            game.runnersOnBase[1] ? 'bg-[#dc3129]' : 'bg-[#d7dae3]'
                          }`}
                        ></div>
                        {/* 3rd Base */}
                        <div
                          className={`absolute left-0 top-3.5 w-2 h-2 rounded-full ${
                            game.runnersOnBase[2] ? 'bg-[#dc3129]' : 'bg-[#d7dae3]'
                          }`}
                        ></div>
                        {/* 1st Base */}
                        <div
                          className={`absolute right-0 top-3.5 w-2 h-2 rounded-full ${
                            game.runnersOnBase[0] ? 'bg-[#dc3129]' : 'bg-[#d7dae3]'
                          }`}
                        ></div>
                      </div>
                      <div className="text-[11px] font-body">
                        <span className="font-bold text-[#181c23]">{game.inning}</span>
                        <span className="text-[#5c403c] block text-[10px]">
                          Runners at corners (1st & 3rd)
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdad5] text-[#b81313] font-body text-[10px] font-bold">
                      LIVE ON DIAMOND 2
                    </span>
                  </div>
                )}

                {/* Duty Team & RSVP Action */}
                <div className="flex items-center justify-between pt-2 border-t border-[#ebeef7] text-[11px]">
                  <div className="text-[#5c403c] truncate max-w-[180px]">
                    {game.coolerDutyTeam && (
                      <span className="inline-flex items-center gap-1 mr-2">
                        🍺 Cooler: <strong>{game.coolerDutyTeam}</strong>
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleRsvp(game.id)}
                    className={`px-3 py-1 rounded-full font-body text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isAttending
                        ? 'bg-[#00864b] text-white'
                        : 'bg-[#e5e8f2] text-[#181c23] hover:bg-[#dfe2ec]'
                    }`}
                  >
                    <span>{isAttending ? '✓ Playing' : '+ RSVP Playing'}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};
