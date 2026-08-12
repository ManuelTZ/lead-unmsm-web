import type { ProfileKey } from '@/data/profileQuiz';

const profileOrder: ProfileKey[] = ['tech', 'impact', 'comms', 'ops'];

export function calculateProfile(answers: ProfileKey[]): ProfileKey | null {
  if (answers.length === 0) return null;

  const scores: Record<ProfileKey, number> = { tech: 0, impact: 0, comms: 0, ops: 0 };
  for (const answer of answers) scores[answer] += 1;

  return profileOrder.reduce((best, candidate) => {
    return scores[candidate] > scores[best] ? candidate : best;
  }, profileOrder[0]);
}
