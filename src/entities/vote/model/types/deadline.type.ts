interface Duration {
  seconds: number;
  zero: boolean;
  nano: number;
  negative: boolean;
  positive: boolean;
}

interface Unit {
  durationEstimated: boolean;
  duration: Duration;
  timeBased: boolean;
  dateBased: boolean;
}

export interface Deadline {
  seconds: number;
  zero: boolean;
  nano: number;
  negative: boolean;
  positive: boolean;
  units: Unit[];
}
