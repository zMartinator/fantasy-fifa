import React from 'react';
import { graphql } from 'react-apollo';
import { compose, withState, withHandlers } from 'recompose';
import CREATE_LEAGUE_MUTATION from '../../graphql/CreateLeagueMutation.graphql';

const Form = ({
  done,
  onSubmit,
  name,
  onChangeName,
  maxSize,
  onChangeMaxSize,
  teamSize,
  onChangeTeamSize,
  startingMoney,
  onChangeStartingMoney,
  nominationTime,
  onChangeNominationTime,
  bidTime,
  onChangeBidTime,
}) => (
  <form className="leagueCreationForm" onSubmit={onSubmit}>
    <div>
      <label htmlFor="leagueName">League name</label>
      <input
        type="text"
        id="leagueName"
        value={name}
        onChange={onChangeName}
        placeholder="e.g., Romeo Rumble"
        maxLength="30"
      />
    </div>
    <div>
      <label htmlFor="leagueMaxSize">Max League Size</label>
      <input
        type="number"
        min="2"
        max="128"
        step="1"
        value={maxSize}
        onChange={onChangeMaxSize}
        id="leagueMaxSize"
      />
    </div>
    <div>
      <label htmlFor="maxTeamSize">Max Team Size</label>
      <input
        type="number"
        min="1"
        max="100"
        step="1"
        value={teamSize}
        onChange={onChangeTeamSize}
        id="maxTeamSize"
      />
    </div>
    <div>
      <label htmlFor="auctionStartingMoney">Starting Auction Money</label>
      <input
        type="number"
        min="1"
        step="1"
        value={startingMoney}
        onChange={onChangeStartingMoney}
        id="auctionStartingMoney"
      />
    </div>
    <div>
      <label htmlFor="timeBetweenNomination">Time Between Nomination</label>
      <input
        type="number"
        min="5"
        step="1"
        value={nominationTime}
        onChange={onChangeNominationTime}
        id="timeBetweenNomination"
      />
    </div>
    <div>
      <label htmlFor="bidTime">Bid Time</label>
      <input
        type="number"
        min="5"
        step="1"
        value={bidTime}
        onChange={onChangeBidTime}
        id="bidTime"
      />
    </div>

    <button type="submit" className="btn btn-primary">
      Submit
    </button>
    <button type="button" className="btn btn-default" onClick={done}>
      Close
    </button>
  </form>
);

const onSubmit = ({
  done,
  name,
  maxSize,
  teamSize,
  startingMoney,
  nominationTime,
  bidTime,
  createLeagueMutation,
}) => async event => {
  event.preventDefault();

  await createLeagueMutation({
    variables: {
      name,
      maxSize,
      teamSize,
      startingMoney,
      nominationTime,
      bidTime,
    },
  });

  done();
};

const enhance = compose(
  withState('name', 'changeName', ''),
  withState('maxSize', 'changeMaxSize', 4),
  withState('teamSize', 'changeTeamSize', 18),
  withState('startingMoney', 'changeStartingMoney', 100),
  withState('nominationTime', 'changeNominationTime', 15),
  withState('bidTime', 'changeBidTime', 10),
  graphql(CREATE_LEAGUE_MUTATION, { name: 'createLeagueMutation' }),
  withHandlers({
    onSubmit,
    onChangeName: ({ changeName }) => e => changeName(e.target.value),
    // TODO: check if it's necessary to parseInt.
    onChangeMaxSize: ({ changeMaxSize }) => e =>
      changeMaxSize(parseInt(e.target.value, 10)),
    onChangeTeamSize: ({ changeTeamSize }) => e =>
      changeTeamSize(parseInt(e.target.value, 10)),
    onChangeStartingMoney: ({ changeStartingMoney }) => e =>
      changeStartingMoney(parseInt(e.target.value, 10)),
    onChangeNominationTime: ({ changeNominationTime }) => e =>
      changeNominationTime(parseInt(e.target.value, 10)),
    onChangeBidTime: ({ changeBidTime }) => e =>
      changeBidTime(parseInt(e.target.value, 10)),
  })
);

export default enhance(Form);
