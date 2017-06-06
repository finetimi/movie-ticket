// @flow
import React, { Component, PropTypes } from 'react';
import {
	View,
	Dimensions,
	Animated,
	Image,
	StyleSheet,
	TouchableHighlight,
	TouchableWithoutFeedback,
	Text,
	PanResponder,
	LayoutAnimation
} from 'react-native';
import { defaultStyles } from './styles';
import Options from './Options';

const { width, height } = Dimensions.get('window');
const defaultHeight = height * 0.67;

export default class MoviePopup extends Component{
	static propTypes = {
		isOpen: PropTypes.bool.isRequired,
    // Movie object that has title, genre, poster, days and times
	    movie: PropTypes.object,
	    // Index of chosen day
	    chosenDay: PropTypes.number,
	    // Index of chosem show time
	    chosenTime: PropTypes.number,
	    // Gets called when user chooses day
	    onChooseDay: PropTypes.func,
	    // Gets called when user chooses time
	    onChooseTime: PropTypes.func,
	    // Gets called when user books their ticket
	    onBook: PropTypes.func,
	    // Gets called when popup closed
	    onClose: PropTypes.func,
	}

	// For storing original height when pulling popup
	_previousHeight = 0;

	state ={
		position: new Animated.Value(0),
		visible: this.props.isOpen,
		height: defaultHeight,
		expanded: false,
		opacity: new Animated.Value(0)
	}

	// Handle animation for Opening and Closing popup
	componentWillReceiveProps(nextProps: Object){
		if (!this.props.isOpen && nextProps.isOpen){
			this.animateOpen();
		}
		else if (this.props.isOpen && !nextProps.isOpen){
			this.animateClose();			
		}
	}

	componentWillMount(){
		// Initialize PanResponder
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState)=>true,
			onMoveShouldSetPanResponder: (evt, gestureState)=>{
				const {dx, dy} = gestureState;
				// Ignore Taps 
				// Check for movement on x-axis and y-axis
				if (dx !== 0 && dy===0){
					return true
				}
				return false;
			},
			onPanResponderGrant: (evt, gestureState)=>{
				this._previousHeight = this.state.height;
			},
			onPanResponderMove:(evt, gestureState)=>{
				const { dy, vy} = gestureState;
				// newHeight is previous height subtracted by delta y
				let newHeight = this._previousHeight - dy;

				// Animate height change 
				LayoutAnimation.easeInEaseOut();

				// If newheight is larger than 80% of screen
				// swtich to expanded mode
				if (newHeight > height * .80){
					this.setState({expanded: true})
				}
				else {this.setState({expanded: false})}

				// Expand if pulled up rapidly
				if (vy < -0.75){
					this.setState({
						expanded: true,
						height: height
					})
				}
				// Close if pulled down rapidly
				else if (vy > 0.75){
					this.props.onClose();
				}
				// Close if pulled below 75% mark of default height
				else if (newHeight < defaultHeight * 0.75){
					this.props.onClose();
				}
				else{
					this.setState({height: newHeight});
				}
			},
			onPanResponderTerminateRequest: (evt, gestureState) =>true,
			onPanResponderRelease: (evt, gestureState)=>{
				const { dy } = gestureState;
				const newHeight = this._previousHeight - dy;

				// Close popup if pulled below defaultHeight
				if (newHeight < defaultHeight){
					this.props.onClose();
				}

				// Update previous height
				this._previousHeight = this.state.height;
			},
			onShouldBlockNativeResponder: (evt, gestureState)=>{
				return true;
			}

		})
	}

	// Open Popup
	animateOpen(){
		this.setState({
			visible: true
		}, ()=>{
			Animated.parallel([
				// Animate opacity from 0 to 0.5
				Animated.timing(this.state.opacity, {toValue: 0.5}),
				// Animate popup position to 0 from height
				Animated.timing(this.state.position, {toValue: 0})
				]).start();
		});
	}

	animateClose(){
		Animated.parallel([
		Animated.timing(this.state.position,{toValue: height}),
		Animated.timing(this.state.opacity, {toValue:0})
		]).start(()=>this.setState({visible: false, expanded: false, height: defaultHeight}));
	}
	getStyles (){
		return {
			imageContainer: this.state.expanded ? {
				width: width/2,
			}: {maxWidth: 110,
				marginRight: 10
			},
			movieContainer: this.state.expanded ? {
				flexDirection: 'column',
				alignItems: 'center'
			} : {
				flexDirection: 'row'
			},
			movieInfo: this.state.expanded ?{
				flex: 0,
				alignItems: 'center',
				justifyContent: 'center'
			}: {
				flex: 1,
				justifyContent: 'center'
			},
			title: this.state.expanded ? {
				textAlign: 'center'
			}: {}
		};
	}
	render(){
		const {
			movie,
			chosenDay,
			chosenTime,
			onChooseDay,
			onChooseTime,
			onBook
		} = this.props;

		if (!this.state.visible){
			return null
		}
		return( 
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={this.props.onClose}>
					<Animated.View  style={[styles.backdrop, {opacity: this.state.opacity}]}/>
				</TouchableWithoutFeedback>
					<Animated.View 
						style={[styles.modal, 
							{height:this.state.height, transform:[{translateY: this.state.position}, {translateX: 0}]}
							]}>
							<View style = {styles.content}>
								{/* Movie Poster, title and genre*/}
								<View style={[styles.movieContainer, this.getStyles().movieContainer
									]} 
									{...this._panResponder.panHandlers} >
								
									{/* Poster */}
									<View style={[styles.imageContainer, this.getStyles().imageContainer]} >
										<Image source={{ uri: movie.poster }}  style={styles.image}/>
									</View>

									{/* Title and genre */}
									<View style={[styles.movieInfo, this.getStyles().movieInfo]}>
										<Text style={[styles.title, this.getStyles().title]}>{movie.title}</Text>
										<Text style={styles.genre}>{movie.genre}</Text>
									</View>
								</View>
								<View>
									  {/* Day */}
						              <Text style={styles.sectionHeader}>Day</Text>
						              	<Options
										  values={movie.days}
										  chosen={chosenDay}
										  onChoose={onChooseDay}
										/>
						              {/* Time */}
						              <Text style={styles.sectionHeader}>Showtime</Text>
						              <Options
										  values={movie.times}
										  chosen={chosenDay}
										  onChoose={onChooseDay}
										/>
								</View>
							</View>

							<View style={styles.footer}>
								<TouchableHighlight style={styles.buttonContainer}
									underlayColor = "#9575CD"
									onPress ={this.props.onBook}
									>
									<Text style={styles.button}>
									 	Book Tickets 
									 </Text>
								</TouchableHighlight>
							</View>
					</Animated.View>
			</View>
			)
	}
} 

const styles = StyleSheet.create({
	container:{
		...StyleSheet.absoluteFillObject, // Fill up the entire screen
		justifyContent: 'flex-end',
		backgroundColor: 'transparent',
	},
	backdrop: {
		...StyleSheet.absoluteFillObject, // Fill up entire screen
		backgroundColor: 'black',
	},
	modal: {
		height: height / 2,
		backgroundColor: 'white'
	},
	content:{
		flex: 1,
		margin: 20,
		marginBottom:0
	},
	movieContainer: {
		flex: 1,
		marginBottom: 20,
	},
	imageContainer:{
		flex: 1
	},
	image: {
		borderRadius: 10,
		...StyleSheet.absoluteFillObject
	},
	sectionHeader: {
		...defaultStyles.text,
		color: '#AAAAAA'
	},
	footer: {
		padding: 20
	},
	buttonContainer: {
    backgroundColor: '#673AB7',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
	  },
	button: {
	    ...defaultStyles.text,
	    color: '#FFFFFF',
	    fontSize: 18,
	  },
});

