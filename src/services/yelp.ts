import Config from 'react-native-config';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
  useLazyQuery,
} from '@apollo/client';

export const createClient = (): ApolloClient<NormalizedCacheObject> => {
  const token = Config.YELP_API_KEY;
  const url = Config.YELP_API_URL;

  return new ApolloClient({
    uri: url,
    headers: {
      authorization: `Bearer ${token}`,
      'Accept-Language': 'en-US',
    },
    cache: new InMemoryCache(),
  });
};

const SEARCH_QUERY_LOCATION = gql`
  query Search(
    $limit: Int!
    $offset: Int!
    $term: String
    $location: String
    $categories: String!
  ) {
    search(
      term: $term
      location: $location
      limit: $limit
      categories: $categories
      offset: $offset
    ) {
      total
      business {
        id
        name
        photos
        id
        name
        photos
        phone
        rating
        display_phone
        review_count
        price
        coordinates {
          latitude
          longitude
        }
        location {
          formatted_address
        }
        categories {
          title
        }
        location {
          formatted_address
        }
      }
    }
  }
`;

const SEARCH_QUERY_COORDINATES = gql`
  query Search(
    $limit: Int!
    $offset: Int!
    $term: String
    $longitude: Float
    $latitude: Float
    $categories: String!
  ) {
    search(
      term: $term
      longitude: $longitude
      latitude: $latitude
      categories: $categories
      limit: $limit
      offset: $offset
    ) {
      total
      business {
        id
        name
        photos
        id
        name
        photos
        phone
        rating
        price
        display_phone
        review_count
        coordinates {
          latitude
          longitude
        }
        categories {
          title
        }
        location {
          formatted_address
        }
      }
    }
  }
`;

type YelpSearchPropsLocation = {
  offset: number;
  limit: number;
  term?: string;
  location?: string;
  categories?: string;
};

type YelpSearchPropsCoordinates = {
  offset: number;
  limit: number;
  term?: string;
  categories?: string;
  longitude?: number;
  latitude?: number;
};

export const useYelpSearchLocation = (
  searchOptions?: YelpSearchPropsLocation,
) => {
  return useLazyQuery(SEARCH_QUERY_LOCATION, {
    variables: searchOptions,
  });
};

export const useYelpSearchCoordinates = (
  searchOptions?: YelpSearchPropsCoordinates,
) => {
  return useLazyQuery(SEARCH_QUERY_COORDINATES, {
    variables: searchOptions,
  });
};
