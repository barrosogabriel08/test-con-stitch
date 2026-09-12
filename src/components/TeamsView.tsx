import React, { useState } from 'react';
import { TEAMS } from '../data/mockData';
import { Team } from '../types';

interface TeamsViewProps {
  onSelectTeam: (team: Team) => void;
}

export const TeamsView: React.FC<TeamsViewProps> = ({ onSelectTeam }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = TEAMS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.captain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.motto.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col w-full pb-8 animate-fadeIn">
      {/* Header */}
      <section className="px-5 pt-3 pb-3">
        <h1 className="font-headline text-[26px] font-bold text-[#181c23] tracking-tight">
          League Teams & Rosters
        </h1>
        <p className="font-body text-[12px] text-[#5c403c] mt-0.5">
          6 Rec Division clubs battling for the Sunday Rollers Cup
        </p>

        {/* Search input */}
        <div className="mt-3 relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#5c403c] text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search teams, captains, mottos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-[#e5e8f2] text-[#181c23] placeholder-[#5c403c] text-[12px] font-body focus:outline-none focus:ring-2 focus:ring-[#ffc72c]"
          />
        </div>
      </section>

      {/* Team Cards Grid */}
      <section className="px-5 space-y-3">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            onClick={() => onSelectTeam(team)}
            className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-[#ebeef7] hover:border-[#b81313]/40 transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#f1f3fd] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                  {team.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline text-[17px] font-bold text-[#181c23] group-hover:text-[#b81313] transition-colors">
                      {team.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#ffc72c] text-[#6f5400] font-headline text-[10px] font-bold">
                      #{team.rank}
                    </span>
                  </div>
                  <p className="font-body text-[11px] text-[#5c403c] font-medium">
                    Captain: <strong>{team.captain}</strong>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-headline text-[18px] font-black text-[#181c23] block leading-tight">
                  {team.wins}-{team.losses}
                </span>
                <span className="font-body text-[10px] text-[#00864b] font-bold">
                  {team.points} Pts
                </span>
              </div>
            </div>

            {/* Motto */}
            <p className="font-body text-[12px] italic text-[#5c403c] mt-2.5 bg-[#f9f9ff] px-3 py-1.5 rounded-xl border border-[#ebeef7]">
              &ldquo;{team.motto}&rdquo;
            </p>

            {/* Roster Avatars & Stats */}
            <div className="mt-3 pt-3 border-t border-[#ebeef7] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-2 overflow-hidden">
                  {team.roster.slice(0, 4).map((player) => (
                    <img
                      key={player.id}
                      src={player.avatarUrl}
                      alt={player.name}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-body text-[#5c403c] font-medium ml-1">
                  {team.roster.length} registered
                </span>
              </div>

              <span className="font-body text-[11px] font-bold text-[#b81313] group-hover:translate-x-0.5 transition-transform">
                View Roster →
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
