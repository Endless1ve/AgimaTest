export function getCurrentDate() {
  return new Date().toISOString();
}

export function getFormattedDate(date) {
  const correctDate = new Date(date);
  const formatter = new Intl.DateTimeFormat("ru");
  const formattedDate = formatter.format(correctDate);
  return formattedDate;
}
