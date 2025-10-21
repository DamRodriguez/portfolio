export function calculateTotalTime(
  initialDate: string,
  finalDate: string,
  t: ReturnType<typeof import("next-intl").useTranslations>
): string {
  const start = new Date(initialDate);
  const end = finalDate === "present" ? new Date() : new Date(finalDate);

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (end.getDate() < start.getDate()) {
    months -= 1;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0 && remainingMonths === 0) {
    return "";
  }

  const totalTime =
    (years > 0 ? `${t("workItem.years", { count: years })} ` : "") +
    (remainingMonths > 0 ? `${t("workItem.months", { count: remainingMonths })}` : "");

  return totalTime.trim();
}
