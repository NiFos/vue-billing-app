import Vue from "vue";
import VueApollo from "vue-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import resolvers from "./state/graphql/resolvers";
import typeDefs from "./state/graphql/types/typeDefs";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";

const cache = new InMemoryCache();

export const transactionsLocalstorageKey = "transactions";

cache.writeData({
  data: {
    transactions: [],
  },
});

export let persistor;
export async function waitPersistCache() {
  persistor = new CachePersistor({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
    debug: process.env.NODE_ENV !== "production",
  });
  await persistor.restore();
}

const apolloClient = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache,
  resolvers,
  typeDefs,
});

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
