import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import LeagueJoinButton from './LeagueJoinButton';

class LeagueItem extends Component {
  constructor(props) {
    super(props);

    this.handleJoinLeague = this.handleJoinLeague.bind(this);
  }

  handleJoinLeague() {
    Meteor.call(
      'registerUserForLeague',
      this.props.leagueInfo._id,
      this.props.user._id
    );
  }

  render() {
    const isAlreadyInLeague = this.props.user ?
      this.props.leagueInfo.usersInLeague.includes(this.props.user._id) :
      false;

    return (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <h4><Link to={`/draft/${this.props.leagueInfo._id}`}> {this.props.leagueInfo.name} </Link></h4>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <p style={{margin: '0'}}>{this.props.leagueInfo.usersInLeague.length}/{this.props.leagueInfo.maxLeagueSize} Spots</p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <LeagueJoinButton
              handleClick={this.handleJoinLeague}
              isLoggedIn={this.props.user}
              isAlreadyInLeague={isAlreadyInLeague}
              isFull={this.props.leagueInfo.usersInLeague.length === this.props.leagueInfo.maxLeagueSize}
            />
          </div>
        </div>
    );
  }

};

export default LeagueItem;
