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
		popUpisOpen: false,
		chosenDay: 0, // Day chosen by user
		chosenTime: null // Time chosen by user
	}
	openMovie(movie: Object){
		this.setState({
			popUpisOpen: true,
			movie
		})
	}
	closeMovie(){
		this.setState({
			popUpisOpen: false,
			chosenDay: 0,
			chosenTime: null
		});
	}
	// set chosen date in state
	chooseDay(day){
		this.setState({
			chooseDay: day,
		});
	}
	// set chosing time in state
	chooseTime(time){
		this.setState({
			chooseTime: time,
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
						key    = {index} 
						movie  = {movie} 
						onOpen = {this.openMovie.bind(this)} />)}
				</ScrollView>
					<MoviePopup 
						isOpen       = {this.state.popUpisOpen} 
						movie 		 = {this.state.movie} 
						onClose      = {this.closeMovie.bind(this)}
						chosenDay    = {this.state.chosenDay}
						chosenTime   = {this.state.chosenTime}
						onChooseDay  = {this.chooseDay.bind(this)}
						onChooseTime = {this.chooseTime.bind(this)}
						/>
			</View>
			)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
	},
	scrollContent:{
		flexDirection: 'row', // arrange in rows
		flexWrap: 'wrap' // allow multiple rows
	}
})