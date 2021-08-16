import { Cards } from '../../interface/CardApi';
const getCards = async (columnId: string): Promise<Cards> => {
  return await fetch('/boards/cards/' + columnId, {
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    mode: 'cors',
  })
    .then((res) => res.json())
    .catch((e) => ({
      error: { message: 'Unable to connect to server. Please try again ' + e },
    }));
};
export default getCards;
