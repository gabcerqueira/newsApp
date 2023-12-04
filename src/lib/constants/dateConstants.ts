interface dateFormatTypes {
  mm: number;
  dd: number;
  yy: string;
  yyyy: number;
}

export function getHourFromDate(date: Date): string {
  return `${date.getHours()}:${date.getMinutes()}`;
}

export function formatDate(date: Date): string {
  if (date === undefined) {
    return formatDate(new Date());
  }
  const map = {
    mm:
      (date.getMonth() + 1).toString().length > 1
        ? date.getMonth() + 1
        : `0${date.getMonth() + 1}`,
    dd:
      date.getDate().toString().length > 1
        ? date.getDate()
        : `0${date.getDate()}`,
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return (
    map.dd.toString() + '/' + map.mm.toString() + '/' + map.yyyy.toString()
  );
}

export const DateConstants = {
  DATE_NOW: formatDate(new Date()),
};
