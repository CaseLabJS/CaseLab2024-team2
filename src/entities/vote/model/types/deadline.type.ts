interface Duration {
  seconds: number; // `integer($int64)` соответствует `number`
  zero: boolean;
  nano: number; // `integer($int32)` соответствует `number`
  negative: boolean;
  positive: boolean;
}

interface Unit {
  durationEstimated: boolean;
  duration: Duration; // Используем интерфейс `Duration` для вложенной структуры
  timeBased: boolean;
  dateBased: boolean;
}

export interface Deadline {
  description: string;
  seconds: number; // `integer($int64)` соответствует `number`
  zero: boolean;
  nano: number; // `integer($int32)` соответствует `number`
  negative: boolean;
  positive: boolean;
  units: Unit[]; // Массив объектов `Unit`
}
