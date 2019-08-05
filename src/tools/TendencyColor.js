export const getTendencyColor = tendency => {
  switch (tendency) {
    case 'society':
      return '#8854d0';
    case 'it':
      return '#4b6584';
    case 'sport':
      return '#20bf6b';
    case 'life':
      return '#f7b731';
    case 'politics':
      return '#eb3b5a';
    case 'economy':
      return '#3867d6';
    default:
      return '#a5b1c2';
  }
};
