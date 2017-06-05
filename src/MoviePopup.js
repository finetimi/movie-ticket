// @flow
import React, { Component, PropTypes } from 'react';
import {
	View,
	Dimensions,
	Animated,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Text,
} from 'react-native';
import { defaultStyles } from './styles';

const { width, height } = Dimensions.get('window');

export default class MoviePopup extends Component{
	static propTypes = {
		isOpen: PropTypes.bool.isRequired
	}

	state ={
		position: new Animated.Value(this.props.isOpen ? 0 : height),
		visible: this.props.isOpen
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

	// Open Popup
	animateOpen(){
		this.setState({
			visible: true
		}, ()=>{
			console.log(width)
			// Animate popup position to 0 from height
			Animated.timing(this.state.position, {toValue: 0}).start(()=>console.log(this.state.position));
		});
	}
	animateClose(){
		Animated.timing(this.state.position,
		{
			toValue: height,
		}).start(()=>this.setState({visible: false}));
	}
	render(){
		if (!this.state.visible){
			return null;
		}
		return(
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={this.props.onClose}>
					<Animated.View  style={styles.backdrop}/>
				</TouchableWithoutFeedback>
					<Animated.View 
						style={[styles.modal, 
							{transform:[{translateY: this.state.position}, {translateX: 0}]}
							]}>
						<Text>Pop up</Text>
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
		opacity: 0.5
	},
	modal: {
		height: height / 2,
		backgroundColor: 'white'
	},
});

