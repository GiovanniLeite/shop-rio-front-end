/* eslint-disable no-unused-expressions */
export const formatDate = () => {
  let date = new Date();
  let hours = date.getHours();
  hours < 10 ? (hours = `0${hours}`) : hours;
  let minutes = date.getMinutes();
  minutes < 10 ? (minutes = `0${minutes}`) : minutes;
  date = date.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });

  return `Gerado: ${hours}:${minutes} do dia ${date}`;
};
