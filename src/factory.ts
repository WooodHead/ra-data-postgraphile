import buildGraphQLProvider from 'ra-data-graphql'

import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'

import resource from './resource'

export type FactorySettings = {
  uri: string
  cache?: any
  options: any
}

export const factory = ({ uri, cache, options }: FactorySettings) => {
  const defaultCache = () => {
    return new InMemoryCache({
      dataIdFromObject: (object: any) => object.nodeId || null,
    })
  }
  const client = new ApolloClient({
    uri,
    cache: cache || defaultCache(),
  })
  return buildGraphQLProvider({
    client,
    buildQuery: resource,
    options,
  })
}
