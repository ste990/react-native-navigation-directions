[![NPM version](https://img.shields.io/npm/v/react-native-navigation-directions.svg?style=flat-square)](https://www.npmjs.com/package/react-native-navigation-directions)
[![Build](https://travis-ci.org/laki944/react-native-navigation-directions.svg?branch=master)](https://travis-ci.org/laki944/react-native-navigation-directions)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# react-native-navigation-directions

A simple react-native module which allows you to open default navigation app(**IOS**: Apple Maps, **Android**: Google Maps) with drive direction between two points. After open the navigation app OpenMapDirections receive callback. Also work with the EXPO(https://expo.io/).

This has been forked to allow navigation based on address rather than co-ordinates.o

![alt text](https://media.giphy.com/media/3oFzmgxYq1MctUbXTW/giphy.gif) ![alt text](https://media.giphy.com/media/d3ess97l8lQ5Cx6E/giphy.gif)

**Installation**
----------
    npm i ste990/react-native-navigation-directions --save
**Props:**

| Prop |Type| Required| Note |
|--|--|--|--|
|startPoint| Object | false | Start point for directions, if this prop is null the start point is device location.
|endPoint| Object |true| This is the end position and this prop cannot be empty.
|transportType|String|true| Available values: d => (by car), w => (by foot), r => (by public transit) or b => (biking). If you don’t specify any value, Maps uses the user’s preferred transport type or the previous setting.

**Example:**

    import { OpenMapDirections } from 'react-native-navigation-directions';
    
	export default class App extends React.Component {
	 _callShowDirections = () => {
	    const startPoint = {
	      longitude: -8.945406,
	      latitude: 38.575078
	      Address: 161+Duke+St,+Glasgow+G31+1JD //Only use Address if you are not using coordinates.
	    } 

	    const endPoint = {
	      longitude: -8.9454275,
	      latitude: 38.5722429
	      Address: 161+Duke+St,+Glasgow+G31+1JD //Only use Address if you are not using coordinates.
	    }

			const transportPlan = 'w';

	    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
	      console.log(res)
	    });
	  }
	  
	  render() {
	    return (
	      <View style={styles.container}>
	        <Text>Show direction between two random points!</Text>
	        <Button
            onPress={() => { this._callShowDirections() }}
            title="Open map"
            color="#841584"
          />
	      </View>
	    );
	  }
	}
    

**Issues**
----------
Feel free to submit issues and enhancement requests.

