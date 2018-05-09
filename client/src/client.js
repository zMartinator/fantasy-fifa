import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import links from './links';

let client = null;

function getClient() {
  if (client) {
    return client;
  }

  const cache = new InMemoryCache();

  client = new ApolloClient({
    link: links,
    cache,
    connectToDevTools: true,
  });
  return client;
}

export default getClient;
