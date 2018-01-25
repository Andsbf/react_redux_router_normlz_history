# React +  Redux + Router + history

This project is basically a React + Redux app.

# Getting Started

## Requirements:

  Requirement   | Recommended Version
  ------------- | -------------
  [Node](https://nodejs.org/en/) | v8.9.3
  [npm](https://www.npmjs.com/) | 5.5.1
  [Yarn](https://yarnpkg.com/lang/en/) | 1.3.2

## Recommended Tools:
  [Redux DevTools - Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

  [React Developer Tools - Chrome Exntension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)


## Installing project's dependecies

### `yarn install`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](#running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Project Concepts

### Structure

This project uses the domain design to structure the React Components. Eg:

/src
|-- sharedComponents
|   |--input
|   |--dropdown
|-- root
|   |--rootComponent
|   |--rootReducers
|   |--rootActions
|-- domain1
|   |--domain1AddComponent
|   |--domain1EditComponent
|   |--domain1Reducers
|   |--domain1Actions
|-- domain2
|   |--domain2AddComponent
|   |--domain2EditComponent
|   |--domain2Reducers
|   |--domain2Actions
  .
  .
  .

### 3rd Party Libs

All 3rd party libraries are abstracted in the 'lib/index.js' file.
That way it is easy to replace/patch any library.
