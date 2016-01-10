import { createClass } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const DraftBoardUserItem = createClass({
  render() {
    return (
      <ListGroup>
        <ListGroupItem>
          <h4><strong> {this.props.user.username} </strong></h4> Money: <strong>{this.props.user.profile.draftMoney}</strong>
        </ListGroupItem>
        {this.props.user.profile.team.players.map(function(player, index) {
          return (<ListGroupItem key={index}> <strong>{player.playerName}</strong> | bought for <strong>{player.boughtFor}</strong> </ListGroupItem>);
        })}
      </ListGroup>
    );
  }
});

export default DraftBoardUserItem;
