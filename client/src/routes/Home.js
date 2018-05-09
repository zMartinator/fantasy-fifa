import React from 'react';
import LeagueListContainer from '../components/Leagues/LeagueListContainer';
import LeagueCreationButton from '../components/Leagues/LeagueCreationButton';

const Home = () => (
  <div>
    <h1>Join A League!</h1>
    <LeagueListContainer />
    <LeagueCreationButton />
  </div>
);

export default Home;
