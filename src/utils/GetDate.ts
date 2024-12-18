export function getActualDate() {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
  const ano = data.getFullYear();

  return `${dia} / ${mes} / ${ano}`;
}
