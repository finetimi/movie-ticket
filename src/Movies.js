// @flow
import React, { Component } from 'react';
import { 
	View,
	ScrollView,
	StyleSheet,
	Dimensions 
} from 'react-native';
import { movies } from './Data';
import MoviePoster from './MoviePoster';
import MoviePopup from './MoviePopup';

export default class Movies extends Component {
	state ={
		popUpisOpen: false
	}
	openMovie(movie: Object){
		this.setState({
			popUpisOpen: true,
			movie
		})
	}
	closeMovie(){
		this.setState({
			popUpisOpen: false
		})
	}
	render(){
		return (
			<View style={styles.container}>
				<ScrollView 
					contentContainerStyle = {styles.scrollContent}
					showHorizontalScollIndicator={false}
					showVerticalScrollIndicator={false}>
					{movies.map((movie, index)=> <MoviePoster 
						key={index} 
						movie={movie} 
						onOpen={this.openMovie.bind(this)} />)}
				</ScrollView>
				<MoviePopup 
					isOpen={this.state.popUpisOpen} 
					movie={this.state.movie} 
					onClose={this.closeMovie.bind(this)}/>
			</View>
			)
	}
}

console.log(Dimensions.get('window'))
const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
	},
	scrollContent:{
		flexDirection: 'row', // arrange in rows
		flexWrap: 'wrap' // allow multiple rows
	}
})