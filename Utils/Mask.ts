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

export function Money(value: string, symbol = '') {
  let formatted = value.replace(/\D/g, '');
  formatted = formatted.replace(/(\d)(\d{2})$/, '$1,$2');
  formatted = formatted.replace(/(?=(\d{3})+(\D))\B/g, '.');
  if (symbol !== '') {
    return `${symbol} ${formatted}`;
  }
  return formatted;
}

export const money = (value: any, symbol = false) => {
  if (!value) {
    return value;
  }

  if (symbol) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  }).format(value);
};

export const MoneyToFloat = (value: string) => {
  return value.replace(/\D/g, '').replace(/(\d{2})$/g, '.$1');
};
