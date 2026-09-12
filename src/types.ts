export interface Team {
  id: string;
  name: string;
  shortName: string;
  rank: number;
  emoji: string;
  wins: number;
  losses: number;
  ties?: number;
  runsFor: number;
  runsAgainst: number;
  diff: number;
  points: number;
  form: ('W' | 'L' | 'T')[];
  streak: string;
  captain: string;
  motto: string;
  primaryColor: string;
  accentColor: string;
  roster: Player[];
  beerCupRank: number;
  beerCupPoints: number;
  coolersEmptied: number;
  snackScore: string;
}

export interface Player {
  id: string;
  name: string;
  nickname?: string;
  number: string;
  teamId: string;
  teamName: string;
  position: string;
  avatarUrl: string;
  kickAvg: string;
  homeRuns: number;
  rbis: number;
  runs: number;
  ksPitched?: number;
  era?: string;
  snackDutyAttended: string;
  badges: string[];
}

export interface StatLeaderItem {
  id: string;
  title: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  statValue: string;
  statLabel: string;
  icon: string;
  iconBg: string;
  player: {
    name: string;
    team: string;
    jersey?: string;
    avatarUrl: string;
  };
}

export interface Game {
  id: string;
  week: number;
  date: string;
  time: string;
  field: string;
  status: 'upcoming' | 'live' | 'final';
  statusText: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  inning?: string;
  runnersOnBase?: [boolean, boolean, boolean]; // 1st, 2nd, 3rd
  refereeTeam?: string;
  coolerDutyTeam?: string;
  isMatchOfTheWeek?: boolean;
}

export type TabType = 'leaderboard' | 'schedule' | 'teams' | 'my-stats';
export type StandingsSubTab = 'standings' | 'leaders' | 'cup';
