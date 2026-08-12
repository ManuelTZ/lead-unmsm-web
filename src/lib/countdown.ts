export interface CountdownState {
  isValid: boolean;
  isExpired: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const invalidState: CountdownState = {
  isValid: false,
  isExpired: false,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function getCountdownState(deadline: string, now: Date = new Date()): CountdownState {
  const deadlineMs = Date.parse(deadline);
  const nowMs = now.getTime();

  if (!deadline || Number.isNaN(deadlineMs) || Number.isNaN(nowMs)) return invalidState;

  const diff = deadlineMs - nowMs;
  if (diff <= 0) {
    return { isValid: true, isExpired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return { isValid: true, isExpired: false, days, hours, minutes, seconds };
}
