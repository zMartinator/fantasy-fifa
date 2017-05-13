import React from 'react';

const DraftBoardUserItem = props =>
  (console.log(props), (
    <div>
      <div>
        <h4><strong> {props.user.username} </strong></h4>
        {' '}
        Money:
        {' '}
        <strong>{props.user.profile.draftMoney}</strong>
      </div>
      {props.user.profile.team.players.map((player, index) => (
        <div key={index}>
          {' '}
          <strong>{player.playerName}</strong>
          {' '}
          | bought for
          {' '}
          <strong>{player.boughtFor}</strong>
          {' '}
        </div>
      ))}
    </div>
  ));

export default DraftBoardUserItem;
