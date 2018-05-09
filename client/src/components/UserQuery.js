import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import USER_QUERY from '../graphql/UserQuery.graphql';
import { AUTH_TOKEN } from '../constants';

const UserQuery = ({ children, network }) => {
  return (
    <Query
      query={USER_QUERY}
      fetchPolicy={network ? 'network-only' : 'cache-first'}
    >
      {({ loading, error, data }) => {
        if (error) {
          localStorage.removeItem(AUTH_TOKEN);
        }
        return loading ? (
          <div>loading</div>
        ) : (
          <Fragment>{children({ user: (data && data.user) || null })}</Fragment>
        );
      }}
    </Query>
  );
};

export default UserQuery;
