const hundreds = (number) => {
  number = parseInt(number, 10).toString();
  const reg = /(\d+)(\d{3})/;
  while (reg.test(number)) {
    number = number.replace(reg, '$1.$2');
  }
  return number;
};

const round = (number) => {
  number = Math.round(number);
  return number;
};

export default {
  hundreds,
  round,
};
