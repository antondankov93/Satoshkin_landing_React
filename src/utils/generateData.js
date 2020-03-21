const declensions = {
  years: ["год", "года", "лет"],
  days: ["день","дня","дней"],
  hours: ["час","часа","часов"],
};

export const getDeclension = (n, value) => {
  const number = Math.abs(+n) % 100 % 10;
  if (+n > 10 && +n < 20) return declensions[value][2];
  if (number > 1 && number < 5) return declensions[value][1];
  if (number === 1) return declensions[value][0];
  return declensions[value][2];
}