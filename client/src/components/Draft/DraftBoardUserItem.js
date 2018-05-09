import React from 'react';

const DraftBoardUserItem = ({ member, team, teamSize }) => (
  <div style={{ marginTop: '5px' }}>
    <div>
      <h4>{member.name}</h4>
      <div>
        Money remaining: <strong>{team.money}</strong>
      </div>
      <div>
        <strong>{team.players.length}</strong> of {teamSize}
      </div>
    </div>
    {team.players.map((player, i) => (
      <div key={player.id}>
        <strong>{player.name}</strong> bought for{' '}
        <strong>{team.paidAmounts[i]}</strong>
      </div>
    ))}
  </div>
);

export default DraftBoardUserItem;
