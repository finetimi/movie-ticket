import React, { Component, PropTypes } from 'react';
import {
	View,
	Dimensions,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { defaultStyles } from './styles';

// Get screen size and store in constants
const { width, height } = Dimensions.get('window');
const cols = 3, rows = 3;

export default class MoviePoster extends Component {
	static propTypes = {
		movie: PropTypes.object.isRequired,
		onOpen: PropTypes.func.isRequired
	}
	render(){
		// destructure movie
		const { movie, onOpen } = this.props;
		return (
			<TouchableOpacity 
				style={styles.container}
				onPress={()=>onOpen(movie)}>
				<View style={style.imageContainer}>
					<Image source ={{uri: movie.poster}} 
						   style={styles.image} />
				</View>
				<Text styles={style.title} numberOfLines={1}>
					 {movie.title} 
				</Text>
				<Text styles={style.genre} numberOfLines={1}>
					 {movie.genre} 
				</Text>
			</TouchableOpacity>
			)
	}
}
const styles = StyleSheet.create({
	container: {
		marginLeft: 10,
		marginBottom: 10,
		height: (height - 20 - 20 )/ rows - 10,
		width: (width - 10)/ cols - 10
	},
	imageContainer:{
		flex: 1,
	},
	image: {
		borderRadius: 10,
		...StyleSheet.absoluteFillObject // Fill up the space in the container
	},
	title: {
		...defaultStyles.text,
		fontSize: 14,
		marginTop: 4,
	},
	genre: {
		...defaultStyles.text,
		color: '#BBB',
		fontSize: 12,
		lineHeight: 14
	},
})