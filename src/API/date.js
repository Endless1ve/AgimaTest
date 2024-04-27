export function getCurrentDate() {
  return new Date().toISOString();
}

export function getFormattedDate(date) {
  const day = getCorrectDay(new Date(date).getDate());
  const month = getCorrectMonth(new Date(date).getMonth());
  const year = new Date(date).getFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
}

function getCorrectDay(day) {
  if (String(day).length === 1) {
    return `0${day}`;
  } else return day;
}

function getCorrectMonth(month) {
  switch (month) {
    case 0:
      return "01";

    case 1:
      return "02";

    case 2:
      return "03";

    case 3:
      return "04";

    case 4:
      return "05";

    case 5:
      return "06";

    case 6:
      return "07";

    case 7:
      return "08";

    case 8:
      return "09";

    case 9:
      return "10";

    case 10:
      return "11";

    case 11:
      return "12";
  }
}
