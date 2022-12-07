export const DAYS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
export const MONTHS_SHORT = ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн", "Июл", "Авг", "Сен", "Ноя", "Дек"];
export const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;
export const TODAY = new Date();
export const TODAY_STR = TODAY.toISOString().slice(0, 10);

//export const isToday = (time: string): boolean => time.slice(0, 10) === TODAY_STR;
export const isThisWeek = (date: Date): boolean =>
  (TODAY.getTime() - date.getTime()) / TWENTY_FOUR_HOURS < 7 && TODAY.getDay() >= (date.getDay() || 7);
export const getWeekDay = (date: Date) => DAYS[date.getDay()];
export const isToday = (date: Date) => {
  return (
    date.getDate() === TODAY.getDate() &&
    date.getMonth() === TODAY.getMonth() &&
    date.getFullYear() === TODAY.getFullYear()
  );
};

export const formatedDate = (date: Date) =>
  `${String(date.getDate()).replace(/0(\d)/, "$1")} ${MONTHS_SHORT[date.getMonth()-1]} ${date.getFullYear()}`;

const addZero = (num: number): string | number => {
  return String(num).length > 1 ? num : "0" + num;
};

const getTime = (date: Date) => {
  return addZero(date.getHours()) + ":" + addZero(date.getMinutes());
};

export const formattedTime = (time: string, format: string): string => {
  const date = new Date(time);

  if (format === "hh:mm") {
    return getTime(date);
  } else if (format === "ranged") {
    if (isThisWeek(date)) return getWeekDay(date);
    return formatedDate(date);
  }

  if (isToday(date)) return getTime(date);
  if (isThisWeek(date)) return getWeekDay(date);
  return formatedDate(date);
};
