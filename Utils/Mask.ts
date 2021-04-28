export const cpfMask = (value: string) => {
   return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
}

export const cnpjMask = (value: string) => {
   return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
}

export const birthDayMask = (value: string) => {
   return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
}


export const Money = (value: any) => {
   console.log(value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
   return value.toLocaleString('pt-br', {minimumFractionDigits: 2});
   // console.log(value);
   // return value.replace(/\D/g, '')
   //    .replace(/(\d{2})$/g, ",$1")
   //    .replace(/(\d{6})$/g, ".$1");
}