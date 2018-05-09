import React, { Component } from 'react';
import { Query } from 'react-apollo';
import DraftStartButton from '../components/Draft/DraftStartButton';
import DraftCurrentBid from '../components/Draft/DraftCurrentBid';
import DraftBoardUserItem from '../components/Draft/DraftBoardUserItem';
import DraftPlayerPicker from '../components/Draft/DraftPlayerPicker';
import LEAGUE_SUBSCRIPTION from '../graphql/LeagueSubscription.graphql';
import LEAGUE_QUERY from '../graphql/LeagueQuery.graphql';

const leagueStatusText = status => {
  switch (status) {
    case 'IDLE':
      return 'Awaiting league creator to start.';
    case 'IN_PROGRESS':
      return 'Draft Underway!';
    case 'PAUSED':
      return 'Draft has been paused.';
    case 'ENDED':
      return 'Draft Done! We did it!';
    default:
      return '';
  }
};

class DraftPage extends Component {
  componentDidMount() {
    this.props.subscribeToLeague();
  }

  render() {
    const { loading, data } = this.props;
    return !loading && data && data.league ? (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>{leagueStatusText(data.league.status)}</p>
          <DraftStartButton league={data.league} />
        </div>
        <DraftCurrentBid league={data.league} />
        <DraftPlayerPicker league={data.league} />
        <div>
          {data.league.members.map((member, i) => (
            <DraftBoardUserItem
              key={member.id}
              member={member}
              team={data.league.teams[i]}
              teamSize={data.league.teamSize}
            />
          ))}
        </div>
      </div>
    ) : null;
  }
}

const Draft = ({ match }) => (
  <Query query={LEAGUE_QUERY} variables={{ id: match.params.leagueId }}>
    {({ subscribeToMore, ...result }) => {
      return (
        <DraftPage
          {...result}
          subscribeToLeague={() =>
            subscribeToMore({
              document: LEAGUE_SUBSCRIPTION,
              variables: { id: match.params.leagueId },
            })
          }
        />
      );
    }}
  </Query>
);

export default Draft;
