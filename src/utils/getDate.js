export const getDate = (e) => {
  let date;
  if (e) {
    date = new Date(e).toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });
  } else {
    date = new Date().toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });
  }

  return date;
};
