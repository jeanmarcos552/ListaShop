export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const cnpjMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const birthDayMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2');
};

export const Money = (value: any) => {
  if (value.length < 3) {
    let val = value;
    return (val / 100).toString().replace('.', ',');
  }

  return value
    .replace(/\D/g, '')
    .replace(/(\d)(\d{2})$/g, '$1,$2')
    .replace(/(?=(\d{3})+(\D))\B/g, '.');
};
export const MoneyToFloat = (value: string) => {
  return value.replace(/\D/g, '').replace(/(\d{2})$/g, '.$1');
};
