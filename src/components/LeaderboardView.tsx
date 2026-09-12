import React, { useState } from 'react';
import { TEAMS, STAT_LEADERS, ASSETS } from '../data/mockData';
import { Team, StandingsSubTab } from '../types';

interface LeaderboardViewProps {
  onSelectTeam: (team: Team) => void;
  onNavigateToSchedule: () => void;
  onNavigateToMyStats: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  onSelectTeam,
  onNavigateToSchedule,
  onNavigateToMyStats,
}) => {
  const [subTab, setSubTab] = useState<StandingsSubTab>('standings');
  const [voteChoice, setVoteChoice] = useState<'beasts' | 'express' | null>(null);
  const [beastsVotes, setBeastsVotes] = useState(64);
  const [expressVotes, setExpressVotes] = useState(36);
  const [showPredictionToast, setShowPredictionToast] = useState(false);

  const handleVote = (team: 'beasts' | 'express') => {
    if (voteChoice === team) {
      // Toggle off
      setVoteChoice(null);
      if (team === 'beasts') {
        setBeastsVotes((v) => v - 1);
      } else {
        setExpressVotes((v) => v - 1);
      }
      return;
    }

    if (team === 'beasts') {
      setBeastsVotes((v) => v + 1);
      if (voteChoice === 'express') setExpressVotes((v) => v - 1);
    } else {
      setExpressVotes((v) => v + 1);
      if (voteChoice === 'beasts') setBeastsVotes((v) => v - 1);
    }
    setVoteChoice(team);
    setShowPredictionToast(true);
    setTimeout(() => setShowPredictionToast(false), 3000);
  };

  const totalVotes = beastsVotes + expressVotes;
  const beastsPercent = Math.round((beastsVotes / totalVotes) * 100);
  const expressPercent = 100 - beastsPercent;

  const team1 = TEAMS.find((t) => t.id === 'team-beasts') || TEAMS[0];
  const team2 = TEAMS.find((t) => t.id === 'team-redball') || TEAMS[1];
  const team3 = TEAMS.find((t) => t.id === 'team-pitch') || TEAMS[2];

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Top League Header Banner */}
      <section className="px-5 pt-3 pb-4">
        <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffc72c] text-[#6f5400] font-body text-[10px] font-bold tracking-wide shadow-sm">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              emoji_events
            </span>
            SPRING &apos;25 REC DIVISION
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e5e8f2] text-[#5c403c] font-body text-[10px] font-semibold">
            <span className="material-symbols-outlined text-[13px]">location_on</span>
            Park Diamond #3
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="font-headline text-[26px] sm:text-[30px] font-bold text-[#181c23] tracking-tight leading-tight">
              League Standings
            </h1>
            <p className="font-body text-[12px] text-[#5c403c]">
              Updated after Week 6 • Sunday Rollers Official
            </p>
          </div>
          <div className="flex items-center -space-x-1.5">
            <div className="w-7 h-7 rounded-full bg-[#ffc72c] flex items-center justify-center text-xs shadow-sm font-body font-bold text-[#6f5400]">
              ⚡
            </div>
            <div className="w-7 h-7 rounded-full bg-[#00864b] flex items-center justify-center text-xs text-white shadow-sm font-body font-bold">
              🍺
            </div>
            <div className="w-7 h-7 rounded-full bg-[#dc3129] flex items-center justify-center text-xs text-white shadow-sm font-body font-bold">
              🔴
            </div>
          </div>
        </div>

        {/* Segmented Filter Control */}
        <div className="mt-4 p-1 bg-[#e5e8f2] rounded-full flex items-center shadow-inner" id="view-tabs">
          <button
            type="button"
            onClick={() => setSubTab('standings')}
            className={`tab-btn flex-1 py-1.5 px-3 rounded-full font-body text-[12px] font-semibold transition-all duration-150 text-center cursor-pointer ${
              subTab === 'standings'
                ? 'bg-[#b81313] text-white shadow-sm'
                : 'text-[#5c403c] hover:text-[#181c23]'
            }`}
          >
            Team Table
          </button>
          <button
            type="button"
            onClick={() => setSubTab('leaders')}
            className={`tab-btn flex-1 py-1.5 px-3 rounded-full font-body text-[12px] font-semibold transition-all duration-150 text-center cursor-pointer ${
              subTab === 'leaders'
                ? 'bg-[#b81313] text-white shadow-sm'
                : 'text-[#5c403c] hover:text-[#181c23]'
            }`}
          >
            Stat Leaders
          </button>
          <button
            type="button"
            onClick={() => setSubTab('cup')}
            className={`tab-btn flex-1 py-1.5 px-3 rounded-full font-body text-[12px] font-semibold transition-all duration-150 text-center cursor-pointer ${
              subTab === 'cup'
                ? 'bg-[#b81313] text-white shadow-sm'
                : 'text-[#5c403c] hover:text-[#181c23]'
            }`}
          >
            Beer Cup 🍻
          </button>
        </div>
      </section>

      {/* VIEW 1: STANDINGS (TEAM TABLE) */}
      {subTab === 'standings' && (
        <div className="flex flex-col w-full animate-fadeIn">
          {/* Playful 3-Tier Podium */}
          <section className="px-5 mb-5">
            <div className="bg-[#f1f3fd] rounded-[1.5rem] p-4 shadow-sm relative overflow-hidden border border-[#ebeef7]">
              {/* Floating retro sparkle accents */}
              <div className="absolute top-2 right-3 text-[#ffc72c] opacity-90 select-none text-base">
                ✦
              </div>
              <div className="absolute bottom-3 left-3 text-[#b81313] opacity-40 select-none text-xs">
                ✦
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[#b81313] text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    military_tech
                  </span>
                  <span className="font-headline text-[17px] font-bold text-[#181c23]">
                    The Podium
                  </span>
                </div>
                <span className="font-body text-[10px] text-[#006a3a] font-bold tracking-wider uppercase bg-[#8bf9b0]/60 px-2 py-0.5 rounded-full">
                  Playoffs Bound
                </span>
              </div>

              {/* 3-Column Podium Display */}
              <div className="grid grid-cols-3 items-end gap-1.5 pt-3 pb-1">
                {/* 2nd Place: Red Ball Express */}
                <button
                  type="button"
                  onClick={() => onSelectTeam(team2)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div className="relative mb-1.5 flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-[#dfe2ec] text-[#181c23] font-headline text-[11px] flex items-center justify-center font-bold shadow-sm mb-1">
                      2
                    </span>
                    <div className="w-12 h-12 rounded-full bg-[#ffdad5] flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
                      🏃
                    </div>
                  </div>
                  <span className="font-body text-[12px] font-bold text-[#181c23] text-center truncate w-full">
                    {team2.shortName}
                  </span>
                  <span className="font-body text-[11px] text-[#5c403c] font-medium">
                    {team2.wins}-{team2.losses} • +{team2.diff}
                  </span>
                  <div className="w-full h-20 bg-[#dfe2ec] rounded-t-[1.2rem] mt-2 flex flex-col items-center justify-center shadow-inner group-hover:bg-[#d7dae3] transition-colors">
                    <span className="font-headline text-[16px] text-[#5c403c] font-extrabold">
                      2nd
                    </span>
                    <span className="font-body text-[9px] font-bold text-[#5c403c]/80">
                      {team2.points} PTS
                    </span>
                  </div>
                </button>

                {/* 1st Place: Bunting Beasts (Tallest) */}
                <button
                  type="button"
                  onClick={() => onSelectTeam(team1)}
                  className="flex flex-col items-center -mt-4 group cursor-pointer focus:outline-none"
                >
                  <div className="relative mb-1 flex flex-col items-center">
                    <span className="text-xl leading-none select-none mb-0.5 animate-bounce">
                      👑
                    </span>
                    <div className="w-14 h-14 rounded-full bg-[#ffc72c] flex items-center justify-center text-2xl shadow-md ring-2 ring-[#775a00]/20 group-hover:scale-105 transition-transform">
                      🦬
                    </div>
                  </div>
                  <span className="font-headline text-[13px] text-[#181c23] text-center font-bold truncate w-full">
                    {team1.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-body text-[11px] text-[#b81313] font-bold">
                      {team1.wins}-{team1.losses}
                    </span>
                    <span className="inline-flex items-center text-[10px] text-[#b81313] font-bold">
                      🔥{team1.streak}
                    </span>
                  </div>
                  <div className="w-full h-28 bg-[#ffc72c] text-[#6f5400] rounded-t-[1.2rem] mt-2 flex flex-col items-center justify-center shadow-md group-hover:brightness-95 transition-all">
                    <span className="font-headline text-[26px] font-black text-[#6f5400]">
                      1st
                    </span>
                    <span className="font-body text-[11px] font-bold tracking-wider text-[#6f5400] uppercase">
                      {team1.points} PTS
                    </span>
                    <span className="font-body text-[10px] text-[#6f5400]/90 mt-0.5 font-medium">
                      +{team1.diff} Diff
                    </span>
                  </div>
                </button>

                {/* 3rd Place: Pitch Slapped */}
                <button
                  type="button"
                  onClick={() => onSelectTeam(team3)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div className="relative mb-1.5 flex flex-col items-center">
                    <span className="w-5 h-5 rounded-full bg-[#dfe2ec] text-[#181c23] font-headline text-[11px] flex items-center justify-center font-bold shadow-sm mb-1">
                      3
                    </span>
                    <div className="w-12 h-12 rounded-full bg-[#8bf9b0] flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
                      ⚡
                    </div>
                  </div>
                  <span className="font-body text-[12px] font-bold text-[#181c23] text-center truncate w-full">
                    {team3.shortName}
                  </span>
                  <span className="font-body text-[11px] text-[#5c403c] font-medium">
                    {team3.wins}-{team3.losses} • +{team3.diff}
                  </span>
                  <div className="w-full h-16 bg-[#dfe2ec] rounded-t-[1.2rem] mt-2 flex flex-col items-center justify-center shadow-inner group-hover:bg-[#d7dae3] transition-colors">
                    <span className="font-headline text-[16px] text-[#5c403c] font-extrabold">
                      3rd
                    </span>
                    <span className="font-body text-[9px] font-bold text-[#5c403c]/80">
                      {team3.points} PTS
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* Detailed Standings Table */}
          <section className="px-5 mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#b81313] text-[18px]">
                  format_list_numbered
                </span>
                <h2 className="font-headline text-[18px] font-bold text-[#181c23]">League Table</h2>
              </div>
              <span className="font-body text-[10px] text-[#5c403c] font-semibold uppercase tracking-wider bg-[#e5e8f2] px-2 py-0.5 rounded-full">
                Top 4 Advance
              </span>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-1 px-3 py-1.5 text-[#5c403c] font-body text-[10px] uppercase tracking-wider bg-[#e5e8f2] rounded-full mb-2">
              <span className="col-span-1 text-center font-bold">#</span>
              <span className="col-span-5 font-bold pl-1">Club</span>
              <span className="col-span-2 text-center font-bold">W-L</span>
              <span className="col-span-2 text-center font-bold">Diff</span>
              <span className="col-span-2 text-right font-bold pr-2">Pts</span>
            </div>

            {/* Teams Card Stack */}
            <div className="space-y-2">
              {TEAMS.map((team, idx) => {
                const isPlayoffSpot = team.rank <= 4;
                const isFirst = team.rank === 1;

                return (
                  <React.Fragment key={team.id}>
                    {/* Qualification Cutoff Line after 4th place */}
                    {idx === 4 && (
                      <div className="flex items-center gap-2 py-1.5 px-3 my-1">
                        <div className="h-0.5 flex-1 bg-[#e5bdb8]"></div>
                        <span className="font-body text-[10px] text-[#5c403c] uppercase tracking-wider font-bold whitespace-nowrap">
                          Playoff Qualification Cutoff
                        </span>
                        <div className="h-0.5 flex-1 bg-[#e5bdb8]"></div>
                      </div>
                    )}

                    <div
                      onClick={() => onSelectTeam(team)}
                      className={`group rounded-[1rem] p-3 shadow-sm flex items-center justify-between transition-all cursor-pointer border relative overflow-hidden ${
                        isFirst
                          ? 'bg-white hover:bg-[#f9f9ff] border-[#ebeef7]'
                          : team.rank === 4
                          ? 'bg-white hover:bg-[#f9f9ff] border-l-4 border-l-[#ffc72c] border-y-[#ebeef7] border-r-[#ebeef7]'
                          : isPlayoffSpot
                          ? 'bg-white hover:bg-[#f9f9ff] border-[#ebeef7]'
                          : 'bg-white/80 hover:bg-white border-[#ebeef7]/80 opacity-90'
                      }`}
                    >
                      <div className="grid grid-cols-12 gap-1 items-center w-full">
                        {/* Rank Badge */}
                        <div className="col-span-1 flex items-center justify-center">
                          <span
                            className={`w-5 h-5 rounded-full font-headline text-[11px] flex items-center justify-center font-bold ${
                              isFirst
                                ? 'bg-[#ffc72c] text-[#6f5400]'
                                : 'bg-[#e5e8f2] text-[#181c23]'
                            }`}
                          >
                            {team.rank}
                          </span>
                        </div>

                        {/* Club Info */}
                        <div className="col-span-5 flex items-center gap-2 min-w-0 pl-1">
                          <span className="text-xl flex-shrink-0">{team.emoji}</span>
                          <div className="flex flex-col min-w-0">
                            <span className="font-body text-[12px] text-[#181c23] truncate font-bold group-hover:text-[#b81313] transition-colors">
                              {team.name}
                            </span>
                            <div className="flex items-center gap-0.5 mt-0.5">
                              {team.form.map((res, fIdx) => (
                                <span
                                  key={fIdx}
                                  className={`w-2.5 h-2.5 rounded-full flex items-center justify-center text-[7px] text-white font-bold ${
                                    res === 'W' ? 'bg-[#00864b]' : 'bg-[#dc3129]'
                                  }`}
                                >
                                  {res}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* W-L Record */}
                        <div className="col-span-2 text-center">
                          <span className="font-headline text-[14px] text-[#181c23] font-bold block leading-tight">
                            {team.wins}-{team.losses}
                          </span>
                          <span className="block font-body text-[10px] text-[#5c403c]">
                            {team.runsFor}-{team.runsAgainst}
                          </span>
                        </div>

                        {/* Diff */}
                        <div className="col-span-2 text-center">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded-full font-body text-[10px] font-bold ${
                              team.diff > 0
                                ? 'bg-[#8bf9b0] text-[#00210e]'
                                : team.diff === 0
                                ? 'bg-[#e5e8f2] text-[#5c403c]'
                                : 'bg-[#ffdad5] text-[#930006]'
                            }`}
                          >
                            {team.diff > 0 ? `+${team.diff}` : team.diff === 0 ? 'EVEN' : team.diff}
                          </span>
                        </div>

                        {/* Points */}
                        <div className="col-span-2 text-right pr-2">
                          <span
                            className={`font-stat-counter text-[22px] leading-none ${
                              isFirst ? 'text-[#b81313]' : 'text-[#181c23]'
                            }`}
                          >
                            {team.points}
                          </span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </section>

          {/* Matchday Feature Highlight: Game of the Week */}
          <section className="px-5 mb-5">
            <div className="relative rounded-[1.5rem] bg-gradient-to-br from-[#b81313] via-[#dc3129] to-[#b81313] text-white p-4 shadow-md overflow-hidden border border-[#930006]">
              {/* Playful red ball graphic stamp */}
              <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full border-4 border-dashed border-white/20"></div>
              </div>

              <div className="flex items-center justify-between mb-2 relative z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffc72c] text-[#6f5400] font-body text-[10px] uppercase font-extrabold tracking-wider shadow-sm">
                  🔥 Match of the Week
                </span>
                <span className="font-body text-[10px] text-white/90 font-medium">
                  Sunday 2:00 PM • Field #1
                </span>
              </div>

              <div className="flex items-center justify-between my-3 relative z-10">
                <button
                  type="button"
                  onClick={() => onSelectTeam(team1)}
                  className="flex flex-col items-center flex-1 text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-2xl mb-1 shadow-sm transition-all">
                    🦬
                  </div>
                  <span className="font-body text-[12px] font-bold text-white leading-tight">
                    {team1.name}
                  </span>
                  <span className="font-body text-[10px] text-white/80">#1 (6-0)</span>
                </button>

                <div className="px-3 flex flex-col items-center">
                  <span className="font-headline text-[20px] text-[#ffc72c] font-black">VS</span>
                  <span className="font-body text-[9px] text-white/80 uppercase tracking-wider font-semibold">
                    Clash of Titans
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTeam(team2)}
                  className="flex flex-col items-center flex-1 text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-2xl mb-1 shadow-sm transition-all">
                    🏃
                  </div>
                  <span className="font-body text-[12px] font-bold text-white leading-tight">
                    {team2.name}
                  </span>
                  <span className="font-body text-[10px] text-white/80">#2 (5-1)</span>
                </button>
              </div>

              {/* Interactive Prediction Bar */}
              <div className="mt-2 pt-2.5 border-t border-white/20 relative z-10">
                <div className="flex justify-between text-[11px] font-body text-white/90 mb-1 font-medium">
                  <span>Fan Pick: Beasts ({beastsPercent}%)</span>
                  <span>Express ({expressPercent}%)</span>
                </div>
                <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden flex p-0.5">
                  <div
                    className="h-full bg-[#ffc72c] rounded-full transition-all duration-500"
                    style={{ width: `${beastsPercent}%` }}
                  ></div>
                  <div
                    className="h-full bg-white/60 rounded-full transition-all duration-500"
                    style={{ width: `${expressPercent}%` }}
                  ></div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => handleVote('beasts')}
                    className={`flex-1 py-2 px-3 rounded-full font-body text-[11px] font-bold tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                      voteChoice === 'beasts'
                        ? 'bg-[#00864b] text-white ring-2 ring-white'
                        : 'bg-[#ffc72c] hover:bg-[#ffdf99] text-[#6f5400]'
                    }`}
                  >
                    <span>🦬</span>
                    <span>{voteChoice === 'beasts' ? 'Picked Beasts! ✓' : 'Pick Beasts'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleVote('express')}
                    className={`flex-1 py-2 px-3 rounded-full font-body text-[11px] font-bold tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                      voteChoice === 'express'
                        ? 'bg-[#00864b] text-white ring-2 ring-white'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    <span>🏃</span>
                    <span>{voteChoice === 'express' ? 'Picked Express! ✓' : 'Pick Express'}</span>
                  </button>
                </div>

                {showPredictionToast && (
                  <p className="text-center font-body text-[11px] text-[#ffdf99] mt-2 animate-fadeIn font-semibold">
                    🎉 Prediction saved! Join the live discussion at the diamond.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* League Stat Leaders (2x2 Bento) */}
          <section className="px-5 mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-[#775a00] text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  stars
                </span>
                <h2 className="font-headline text-[18px] font-bold text-[#181c23]">
                  League Stat Leaders
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSubTab('leaders')}
                className="font-body text-[11px] text-[#b81313] hover:underline font-bold"
              >
                View All →
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {STAT_LEADERS.map((leader) => (
                <div
                  key={leader.id}
                  onClick={onNavigateToMyStats}
                  className="bg-white rounded-[1.2rem] p-3 shadow-sm flex flex-col justify-between relative overflow-hidden border border-[#ebeef7] hover:border-[#b81313]/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <span className="w-8 h-8 rounded-full bg-[#f1f3fd] flex items-center justify-center text-base">
                      {leader.icon}
                    </span>
                    <span
                      className={`font-body text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full ${leader.badgeBg} ${leader.badgeText}`}
                    >
                      {leader.badge}
                    </span>
                  </div>

                  <div className="my-2">
                    <span className="font-headline text-[26px] text-[#181c23] font-black leading-none block group-hover:text-[#b81313] transition-colors">
                      {leader.statValue}
                    </span>
                    <span className="font-body text-[10px] uppercase tracking-wider text-[#5c403c] font-bold">
                      {leader.statLabel}
                    </span>
                  </div>

                  <div className="pt-1.5 border-t border-[#ebeef7] flex items-center gap-2">
                    <img
                      className="w-7 h-7 rounded-full object-cover"
                      alt={leader.player.name}
                      src={leader.player.avatarUrl}
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <p className="font-body text-[11px] text-[#181c23] truncate font-bold">
                        {leader.player.name}
                      </p>
                      <p className="font-body text-[10px] text-[#5c403c] truncate font-medium">
                        {leader.player.team} {leader.player.jersey || ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Fun Park League Rules & Spirit Reminder Footer Card */}
          <section className="px-5">
            <div className="p-4 rounded-[1.2rem] bg-[#f1f3fd] border border-[#ebeef7] flex items-center gap-3 shadow-sm">
              <div className="w-11 h-11 rounded-full bg-[#00864b] text-white flex items-center justify-center flex-shrink-0 text-xl shadow-sm">
                📢
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-headline text-[15px] font-bold text-[#181c23] leading-snug">
                  Post-Game Social
                </h3>
                <p className="font-body text-[12px] text-[#5c403c] mt-0.5">
                  Head over to park bench #4 after 4 PM for icy popsicles and team group photos!
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* VIEW 2: EXPANDED STAT LEADERS TAB */}
      {subTab === 'leaders' && (
        <div className="flex flex-col w-full px-5 space-y-5 animate-fadeIn">
          {/* Quick Bento Review */}
          <div className="grid grid-cols-2 gap-2.5">
            {STAT_LEADERS.map((leader) => (
              <div
                key={leader.id}
                className="bg-white rounded-[1.2rem] p-3 shadow-sm border border-[#ebeef7]"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xl">{leader.icon}</span>
                  <span
                    className={`font-body text-[9px] font-bold px-2 py-0.5 rounded-full ${leader.badgeBg} ${leader.badgeText}`}
                  >
                    {leader.badge}
                  </span>
                </div>
                <div className="font-headline text-[24px] font-black text-[#181c23]">
                  {leader.statValue}
                </div>
                <div className="font-body text-[10px] text-[#5c403c] uppercase font-bold">
                  {leader.statLabel}
                </div>
                <div className="mt-2 text-[11px] font-body font-bold text-[#181c23] flex items-center gap-1.5 pt-1.5 border-t border-[#ebeef7]">
                  <img
                    src={leader.player.avatarUrl}
                    alt=""
                    className="w-5 h-5 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="truncate">{leader.player.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Category 1: Home Run Kings & Queens */}
          <div className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-[#ebeef7]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#ffdad5] text-[#b81313] flex items-center justify-center text-sm font-bold">
                💣
              </span>
              <h3 className="font-headline text-[16px] font-bold text-[#181c23]">
                Home Run Leaderboard
              </h3>
            </div>
            <div className="space-y-2">
              {[
                { rank: 1, name: 'Maya Lin', team: 'Bunting Beasts', val: 9, avatar: ASSETS.mayaLin },
                { rank: 2, name: 'Tyler Rodriguez', team: 'Pitch Slapped', val: 7, avatar: ASSETS.tylerRodriguez },
                { rank: 3, name: 'Marcus Vance', team: 'Bunting Beasts', val: 6, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
                { rank: 4, name: 'Samira Khan', team: 'Red Ball Express', val: 4, avatar: ASSETS.samiraKhan },
                { rank: 5, name: 'Ben Hopkins', team: 'Red Ball Express', val: 3, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
              ].map((row) => (
                <div
                  key={row.rank}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#f9f9ff] hover:bg-[#f1f3fd] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] font-headline font-bold flex items-center justify-center ${
                        row.rank === 1
                          ? 'bg-[#ffc72c] text-[#6f5400]'
                          : 'bg-[#e5e8f2] text-[#5c403c]'
                      }`}
                    >
                      {row.rank}
                    </span>
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="w-7 h-7 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="font-body text-[12px] font-bold text-[#181c23] truncate">
                        {row.name}
                      </div>
                      <div className="font-body text-[10px] text-[#5c403c]">{row.team}</div>
                    </div>
                  </div>
                  <div className="font-headline text-[18px] font-black text-[#b81313] pr-2">
                    {row.val} <span className="text-[10px] font-body text-[#5c403c]">HR</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category 2: Kick Average (.AVG) */}
          <div className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-[#ebeef7]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#8bf9b0] text-[#006a3a] flex items-center justify-center text-sm font-bold">
                👟
              </span>
              <h3 className="font-headline text-[16px] font-bold text-[#181c23]">
                Top Kick Averages (Min 12 at-kicks)
              </h3>
            </div>
            <div className="space-y-2">
              {[
                { rank: 1, name: 'Tyler Rodriguez', team: 'Pitch Slapped', val: '.742', avatar: ASSETS.tylerRodriguez },
                { rank: 2, name: 'Maya Lin', team: 'Bunting Beasts', val: '.685', avatar: ASSETS.mayaLin },
                { rank: 3, name: 'Marcus Vance', team: 'Bunting Beasts', val: '.625', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
                { rank: 4, name: 'Sarah Jennings', team: 'Pitch Slapped', val: '.610', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
                { rank: 5, name: 'Samira Khan', team: 'Red Ball Express', val: '.590', avatar: ASSETS.samiraKhan },
              ].map((row) => (
                <div
                  key={row.rank}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#f9f9ff] hover:bg-[#f1f3fd] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] font-headline font-bold flex items-center justify-center ${
                        row.rank === 1
                          ? 'bg-[#ffc72c] text-[#6f5400]'
                          : 'bg-[#e5e8f2] text-[#5c403c]'
                      }`}
                    >
                      {row.rank}
                    </span>
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="w-7 h-7 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="font-body text-[12px] font-bold text-[#181c23] truncate">
                        {row.name}
                      </div>
                      <div className="font-body text-[10px] text-[#5c403c]">{row.team}</div>
                    </div>
                  </div>
                  <div className="font-headline text-[18px] font-black text-[#00864b] pr-2">
                    {row.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: BEER CUP 🍻 TAB */}
      {subTab === 'cup' && (
        <div className="flex flex-col w-full px-5 space-y-4 animate-fadeIn">
          {/* Beer Cup Hero Card */}
          <div className="rounded-[1.5rem] bg-gradient-to-r from-[#ffc72c] to-[#ffdf99] p-4 text-[#251a00] shadow-sm border border-[#f6bf22]">
            <div className="flex items-center justify-between">
              <span className="font-body text-[10px] uppercase font-black tracking-wider bg-[#251a00] text-[#ffdf99] px-2.5 py-0.5 rounded-full">
                THE PRESTIGIOUS
              </span>
              <span className="text-2xl">🏆🍺</span>
            </div>
            <h2 className="font-headline text-[22px] font-black mt-2 leading-tight">
              Official Rec Beer Cup
            </h2>
            <p className="font-body text-[12px] text-[#5a4300] mt-1">
              Points awarded for post-game tailgate attendance, dugout chants, cooler freshness, and
              sharing snacks!
            </p>
          </div>

          {/* Beer Cup Standings Table */}
          <div className="space-y-2">
            {[...TEAMS]
              .sort((a, b) => b.beerCupPoints - a.beerCupPoints)
              .map((team, index) => (
                <div
                  key={team.id}
                  onClick={() => onSelectTeam(team)}
                  className="bg-white rounded-[1.2rem] p-3.5 shadow-sm border border-[#ebeef7] flex items-center justify-between hover:border-[#ffc72c] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-6 h-6 rounded-full font-headline text-[12px] flex items-center justify-center font-bold ${
                        index === 0
                          ? 'bg-[#ffc72c] text-[#6f5400] ring-2 ring-[#775a00]/30'
                          : 'bg-[#e5e8f2] text-[#5c403c]'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-2xl">{team.emoji}</span>
                    <div className="min-w-0">
                      <div className="font-body text-[13px] font-bold text-[#181c23] truncate flex items-center gap-1.5">
                        {team.name}
                        {index === 0 && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#ffc72c] text-[#6f5400] font-black">
                            CHAMP 👑
                          </span>
                        )}
                      </div>
                      <div className="font-body text-[11px] text-[#5c403c] truncate">
                        {team.coolersEmptied} Coolers • Snack Rating: {team.snackScore}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0 pl-2">
                    <span className="font-headline text-[20px] font-black text-[#775a00] block leading-tight">
                      {team.beerCupPoints}
                    </span>
                    <span className="font-body text-[9px] uppercase font-bold text-[#5c403c]">
                      Spirit Pts
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* Cooler Duty Notice */}
          <div className="p-4 rounded-[1.2rem] bg-[#f1f3fd] border border-[#ebeef7] flex items-center gap-3">
            <span className="text-2xl">🧊</span>
            <div className="text-[12px]">
              <div className="font-bold text-[#181c23]">This Week&apos;s Cooler Duty:</div>
              <div className="text-[#5c403c]">
                <strong>Grass Kickers</strong> have Diamond #1, <strong>Bunting Beasts</strong> have
                Diamond #2. Ice bags available at park shelter.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
