const {
  ListGroup,
  ListGroupItem
} = bootstrap;

DraftBoardUserItem = React.createClass({
  render() {
    return (
      <ListGroup>
        <ListGroupItem>
          <h4><strong> {this.props.user.username} </strong></h4> Money: {this.props.user.profile.draftMoney}
        </ListGroupItem>
        {this.props.user.profile.team.players.map(function(player, index) {
          return (<ListGroupItem key={index}> <strong>{player.playerName}</strong> | bought for {player.boughtFor} </ListGroupItem>);
        })}
      </ListGroup>
    );
  }
});
