export function relativeTime(time: string) {
  const date = new Date(time || ""),
    diff = (new Date().getTime() - date.getTime()) / 1000,
    day_diff = Math.floor(diff / 86400);
  const year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();

  if (isNaN(day_diff) || day_diff < 0 )
    return (
      year.toString() +
      "-" +
      (month < 10 ? "0" + month.toString() : month.toString()) +
      "-" +
      (day < 10 ? "0" + day.toString() : day.toString())
    );
  return diff < 60
    ?  `now`
    : diff < 3600
    ? Math.floor(diff / 60) + "m"
    : diff < 86400
    ? Math.floor(diff / 3600) + "h"
    : `${day_diff}d`
}