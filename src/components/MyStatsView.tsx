import React, { useState } from 'react';
import { CURRENT_USER } from '../data/mockData';

export const MyStatsView: React.FC = () => {
  const [checkedSnack, setCheckedSnack] = useState(true);

  return (
    <div className="flex flex-col w-full pb-8 animate-fadeIn">
      {/* Player Identity Hero Card */}
      <section className="px-5 pt-3 pb-3">
        <div className="rounded-[1.5rem] bg-gradient-to-br from-[#181c23] to-[#2d3138] text-white p-4 shadow-md relative overflow-hidden border border-[#5c403c]">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffc72c]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center gap-3.5 relative z-10">
            <div className="relative">
              <img
                src={CURRENT_USER.avatarUrl}
                alt={CURRENT_USER.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#ffc72c]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#ffc72c] text-[#6f5400] font-headline text-[10px] font-black">
                #{CURRENT_USER.number}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-headline text-[20px] font-bold text-white tracking-tight">
                  {CURRENT_USER.name}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#ffc72c]/20 text-[#ffc72c] text-[10px] font-bold">
                  &ldquo;{CURRENT_USER.nickname}&rdquo;
                </span>
              </div>
              <p className="font-body text-[12px] text-white/80">
                🦬 {CURRENT_USER.teamName} • {CURRENT_USER.position}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 text-[10px] text-[#8bf9b0] font-bold">
                  ● Active Roster
                </span>
                <span className="text-[10px] text-white/60">• Spring &apos;25</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Stats Quad */}
      <section className="px-5 mb-4">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Kick Avg */}
          <div className="bg-white rounded-[1.2rem] p-3.5 shadow-sm border border-[#ebeef7]">
            <div className="flex items-center justify-between">
              <span className="text-xl">👟</span>
              <span className="text-[9px] font-body font-bold text-[#006a3a] bg-[#8bf9b0]/60 px-2 py-0.5 rounded-full">
                #2 IN LEAGUE
              </span>
            </div>
            <div className="font-headline text-[28px] font-black text-[#181c23] mt-1">
              {CURRENT_USER.kickAvg}
            </div>
            <div className="font-body text-[10px] uppercase font-bold text-[#5c403c]">
              Kick Average
            </div>
          </div>

          {/* Home Runs */}
          <div className="bg-white rounded-[1.2rem] p-3.5 shadow-sm border border-[#ebeef7]">
            <div className="flex items-center justify-between">
              <span className="text-xl">💣</span>
              <span className="text-[9px] font-body font-bold text-[#b81313] bg-[#ffdad5] px-2 py-0.5 rounded-full">
                #1 HR LEADER 👑
              </span>
            </div>
            <div className="font-headline text-[28px] font-black text-[#b81313] mt-1">
              {CURRENT_USER.homeRuns}
            </div>
            <div className="font-body text-[10px] uppercase font-bold text-[#5c403c]">
              Home Runs
            </div>
          </div>

          {/* RBIs */}
          <div className="bg-white rounded-[1.2rem] p-3.5 shadow-sm border border-[#ebeef7]">
            <div className="flex items-center justify-between">
              <span className="text-xl">🎯</span>
              <span className="text-[9px] font-body font-bold text-[#775a00] bg-[#ffdf99] px-2 py-0.5 rounded-full">
                TEAM HIGH
              </span>
            </div>
            <div className="font-headline text-[28px] font-black text-[#181c23] mt-1">
              {CURRENT_USER.rbis}
            </div>
            <div className="font-body text-[10px] uppercase font-bold text-[#5c403c]">
              RBIs (Runs Batted)
            </div>
          </div>

          {/* Runs Scored */}
          <div className="bg-white rounded-[1.2rem] p-3.5 shadow-sm border border-[#ebeef7]">
            <div className="flex items-center justify-between">
              <span className="text-xl">🏃‍♀️</span>
              <span className="text-[9px] font-body font-bold text-[#5c403c] bg-[#e5e8f2] px-2 py-0.5 rounded-full">
                SPEED
              </span>
            </div>
            <div className="font-headline text-[28px] font-black text-[#181c23] mt-1">
              {CURRENT_USER.runs}
            </div>
            <div className="font-body text-[10px] uppercase font-bold text-[#5c403c]">
              Runs Scored
            </div>
          </div>
        </div>
      </section>

      {/* Rec Badges Collection */}
      <section className="px-5 mb-4">
        <h3 className="font-headline text-[16px] font-bold text-[#181c23] mb-2 flex items-center gap-1.5">
          <span className="text-base">🎖️</span> Rec Badges Earned
        </h3>
        <div className="flex flex-wrap gap-2">
          {CURRENT_USER.badges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#ebeef7] shadow-sm text-[11px] font-body font-bold text-[#181c23]"
            >
              <span>⭐</span>
              <span>{badge}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Snack Duty Section */}
      <section className="px-5 mb-4">
        <div className="bg-[#f1f3fd] rounded-[1.5rem] p-4 border border-[#ebeef7]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍊</span>
              <div>
                <h4 className="font-headline text-[15px] font-bold text-[#181c23]">
                  Snack & Cooler Duty
                </h4>
                <p className="font-body text-[11px] text-[#5c403c]">
                  Attendance: <strong>{CURRENT_USER.snackDutyAttended}</strong>
                </p>
              </div>
            </div>
            <label className="flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1 rounded-full shadow-sm">
              <input
                type="checkbox"
                checked={checkedSnack}
                onChange={() => setCheckedSnack(!checkedSnack)}
                className="w-4 h-4 accent-[#00864b] rounded"
              />
              <span className="text-[11px] font-body font-bold text-[#181c23]">Fulfilled</span>
            </label>
          </div>
          <p className="font-body text-[12px] text-[#5c403c] mt-1">
            Next assigned: <strong>Week 7 Playoffs (Oct 26)</strong> • Bringing cut citrus slices &
            cold sparkling seltzers for the dugout.
          </p>
        </div>
      </section>

      {/* Recent Game Log */}
      <section className="px-5">
        <h3 className="font-headline text-[16px] font-bold text-[#181c23] mb-2 flex items-center gap-1.5">
          <span className="text-base">📋</span> Recent Game Log
        </h3>
        <div className="bg-white rounded-[1.5rem] p-3 shadow-sm border border-[#ebeef7] space-y-2">
          {[
            {
              opp: 'vs Pitch Slapped (W 7-3)',
              stats: '2-3, 1 HR, 2 RBIs, 2 Runs',
              date: 'Week 5',
            },
            {
              opp: 'vs Base Invaders (W 10-2)',
              stats: '3-4, 2 HR, 5 RBIs, 3 Runs',
              date: 'Week 4',
            },
            {
              opp: 'vs Grass Kickers (W 9-4)',
              stats: '2-4, 1 HR, 3 RBIs, 2 Runs',
              date: 'Week 3',
            },
          ].map((log, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#f9f9ff] text-[12px]"
            >
              <div>
                <div className="font-body font-bold text-[#181c23]">{log.opp}</div>
                <div className="font-body text-[11px] text-[#5c403c]">{log.stats}</div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#e5e8f2] text-[#5c403c] font-body text-[10px] font-bold">
                {log.date}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
