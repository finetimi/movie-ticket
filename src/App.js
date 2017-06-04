import React from 'react';
import { StackNavigator } from 'react-navigation';
import Movies from './Movies';

const App = StackNavigator({
	Home: {screen: Movies},
})

export default App;