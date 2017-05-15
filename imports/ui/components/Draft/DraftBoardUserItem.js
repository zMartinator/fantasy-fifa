import React from 'react';

const DraftBoardUserItem = ({ user }) => (
  <div>
    <div>
      <h4><strong> {user.username} </strong></h4>
      {' '}
      Money:
      {' '}
      <strong>{user.profile.draftMoney}</strong>
    </div>
    {user.profile.team.players.map((player, index) => (
      <div key={index}>
        {' '}
        <strong>{player.playerId}</strong>
        {' '}
        | bought for
        {' '}
        <strong>{player.boughtFor}</strong>
        {' '}
      </div>
    ))}
  </div>
);

export default DraftBoardUserItem;
