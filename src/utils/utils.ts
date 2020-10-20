const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const abbrDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const dateToUriDate = (date: Date, afterDays?: number) => {
  const d = new Date(date);
  if (afterDays) {
    d.setDate(d.getDate() + afterDays);
  }
  const month = `${d.getMonth() + 1}`;
  const day = `${d.getDate()}`;
  const year = d.getFullYear();

  return [year, month, day].join('/');
};

const dateStringToWeekDayAbb = (dateStr: string) => {
  return abbrDays[new Date(dateStr).getUTCDay()];
};

const dateToWeekDay = (date: Date) => {
  return days[date.getUTCDay()];
};

const dateToMonth = (date: Date) => {
  return months[date.getUTCMonth()];
};

const dateToFullWrittenDate = (date: Date) => {
  return `${dateToWeekDay(date)} ${dateToMonth(
    date
  )} ${date.getDate()}, ${date.getFullYear()}`;
};

// eslint-disable-next-line import/prefer-default-export
export {
  dateToUriDate,
  dateStringToWeekDayAbb,
  dateToWeekDay,
  dateToFullWrittenDate
};
