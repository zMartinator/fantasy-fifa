import { HTTP } from 'meteor/http';
import { Player } from '../api/collections';

const url =
  'https://www.easports.com/fifa/ultimate-team/api/fut/item?jsonParamObject=';

const fetchData = (url, params) =>
  JSON.parse(HTTP.get(url, { params }).content);

const importData = () => {
  const params = {
    page: 1,
    quality: 'bronze,silver,gold,rare_bronze,rare_silver,rare_gold',
    position: 'LF,CF,RF,ST,LW,LM,CDM,CM,RM,RW,LWB,LB,CB,RB,RWB,GK',
    ovr: '70:99',
  };

  const players = [];

  try {
    let data;
    const first = fetchData(url, params);
    players.push(...first.items);

    for (let i = 2; i <= first.totalPages; i++) {
      console.log(i);
      params.page = i;
      data = fetchData(url, params);
      players.push(...data.items);
    }

    players.forEach(player => {
      Player.insert(player);
    });
  } catch (e) {
    console.error(e);
  }
};

export default importData;
