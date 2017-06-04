// @flow
import React, { Component } from 'react';
import { 
	View,
	ScrollView,
	Text,
	StyleSheet 
} from 'react-native';
import { movies } from './Data';
import MoviePoster from './Movies';

export default class Movies extends Component {
	openMovie(movie){
			return console.log(movie)
		}
	render(){

		return (
			<View >
				<ScrollView>
					{movies.map((movie, index)=> <MoviePoster 
						key={index} 
						movie={movie} 
						 />)}
				</ScrollView>
			</View>
			)
	}
}