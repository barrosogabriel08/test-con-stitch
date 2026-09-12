import React from 'react';
import { Team } from '../types';

interface TeamModalProps {
  team: Team | null;
  onClose: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ team, onClose }) => {
  if (!team) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#f9f9ff] w-full max-w-lg rounded-t-[2rem] sm:rounded-[2rem] max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl border border-[#ebeef7] p-5 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Handle for Mobile */}
        <div className="w-12 h-1 bg-[#dfe2ec] rounded-full mx-auto mb-4 sm:hidden"></div>

        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-[#ebeef7] flex items-center justify-center text-3xl">
              {team.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline text-[22px] font-bold text-[#181c23]">{team.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#ffc72c] text-[#6f5400] font-headline text-[11px] font-bold">
                  Rank #{team.rank}
                </span>
              </div>
              <p className="font-body text-[12px] text-[#5c403c]">
                Captain: <strong>{team.captain}</strong> • Streak: <strong>{team.streak}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#e5e8f2] hover:bg-[#dfe2ec] flex items-center justify-center text-[#181c23] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Motto Banner */}
        <div className="mt-4 p-3 bg-white rounded-xl border border-[#ebeef7] shadow-sm">
          <p className="font-body text-[12px] italic text-[#5c403c] text-center">
            &ldquo;{team.motto}&rdquo;
          </p>
        </div>

        {/* Team Quick Stats Bar */}
        <div className="grid grid-cols-4 gap-2 mt-4 text-center">
          <div className="bg-white p-2.5 rounded-xl border border-[#ebeef7]">
            <span className="font-headline text-[18px] font-black text-[#181c23] block">
              {team.wins}-{team.losses}
            </span>
            <span className="font-body text-[10px] text-[#5c403c] uppercase font-bold">Record</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-[#ebeef7]">
            <span className="font-headline text-[18px] font-black text-[#00864b] block">
              +{team.diff}
            </span>
            <span className="font-body text-[10px] text-[#5c403c] uppercase font-bold">Run Diff</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-[#ebeef7]">
            <span className="font-headline text-[18px] font-black text-[#b81313] block">
              {team.points}
            </span>
            <span className="font-body text-[10px] text-[#5c403c] uppercase font-bold">Points</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-[#ebeef7]">
            <span className="font-headline text-[18px] font-black text-[#775a00] block">
              {team.beerCupPoints}
            </span>
            <span className="font-body text-[10px] text-[#5c403c] uppercase font-bold">Beer Cup</span>
          </div>
        </div>

        {/* Full Team Roster */}
        <div className="mt-5">
          <h3 className="font-headline text-[16px] font-bold text-[#181c23] mb-2 flex items-center justify-between">
            <span>Team Roster ({team.roster.length} Players)</span>
            <span className="font-body text-[11px] text-[#5c403c] font-normal">
              Spring &apos;25
            </span>
          </h3>

          <div className="space-y-2">
            {team.roster.map((player) => (
              <div
                key={player.id}
                className="bg-white p-2.5 rounded-xl border border-[#ebeef7] flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={player.avatarUrl}
                    alt={player.name}
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-body text-[12px] font-bold text-[#181c23] flex items-center gap-1.5">
                      <span>{player.name}</span>
                      <span className="text-[10px] font-semibold text-[#5c403c]">
                        #{player.number}
                      </span>
                    </div>
                    <div className="font-body text-[10px] text-[#5c403c]">{player.position}</div>
                  </div>
                </div>

                <div className="text-right text-[11px]">
                  <span className="font-body font-bold text-[#181c23] block">
                    {player.kickAvg} AVG
                  </span>
                  <span className="font-body text-[10px] text-[#b81313] font-semibold">
                    {player.homeRuns} HR • {player.rbis} RBI
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close button */}
        <div className="mt-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#181c23] text-white font-body text-[12px] font-bold tracking-wide hover:bg-[#2d3138] transition-colors cursor-pointer"
          >
            Close Club Card
          </button>
        </div>
      </div>
    </div>
  );
};
