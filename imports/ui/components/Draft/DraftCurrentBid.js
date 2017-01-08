import React from 'react';
import DraftCurrentBidButton from './DraftCurrentBidButton';

const DraftCurrentBid = (props) => {
  const currentBid = props.currentLeague.currentBids.length > 0 ?
    props.currentLeague.currentBids[props.currentLeague.currentBids.length - 1] :
    -1;
  const currentPlayerUpForBid = props.currentLeague.currentPlayerUpForBidId !== -1 ?
    props.currentLeague.currentPlayerUpForBidId :
    'Waiting For Nomination';

  return (
    <div>
      <h2>
        { props.currentLeague.currentNominationClock === 0 ?
          props.currentLeague.currentBidClock :
          props.currentLeague.currentNominationClock
        }
      </h2>
      {props.currentLeague.currentBidClock !== 0 && <h4>{currentPlayerUpForBid} for {currentBid.value} by {currentBid.username}</h4>}
      <DraftCurrentBidButton
        currentUser={props.currentUser}
        currentLeague={props.currentLeague}
        currentBid={currentBid}
        handleBidCallback={props.handleBidCallback}
      />
    </div>
  );
};

export default DraftCurrentBid;
