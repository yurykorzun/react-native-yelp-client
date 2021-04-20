# React Native Yelp Client
React Native app using Yelp GraphQL API 

## Description
- Search yelp graph api using key words
- Search based on current location or location based on geocoding search
- Filter by category to narrow results
- Results limited to top 10 results
- Toggle between the list and the map view

## How to run locally

1. Set up the machine for react native development [RN Docs](https://reactnative.dev/docs/environment-setup)
2. Clone this repository
3. In the root of this repo, execute `yarn install`, which will install node_modules.
4. Run `npx pod-install` to make sure all pods are installed correctly
6. Create Yelp API Key [Yelp Developers](https://www.yelp.com/developers/v3/manage_app) and Google API Key [Google API credentials](https://console.cloud.google.com/apis/credentials)
6. Enable Maps SDK for Android/iOS and Geocoding for your Google API [Google API Library](https://console.cloud.google.com/apis/library)
7. In `.env` configuration file set `YELP_API_KEY` and `GOOGLE_API_KEY`
8. In `android/app/src/main/AndroidManifest.xml` set your Google API key to `com.google.android.geo.API_KEY`
9. Run `npx react-native run-android` or  `npx react-native run-ios`

## TODO
- Fix Typescript errors and warnings
- Fix UI and layout issues, apply Yelp's color theme
- Fix multiselect filter
- Add more filters
- Add more information to the Details screen, including reviews
- Implement paged loading of results in the FlatList
- Update Google map makers to include more details about a business

<img src="https://github.com/yurykorzun/react-native-yelp-client/blob/main/app.gif?raw=true)" width="350"/>
