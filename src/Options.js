// @flow
import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import Option from './Option';

const { width } = Dimensions.get('window');
const optionWidth = (width)/3-10;

export default class Options extends Component {
	static propTypes ={
		values: PropTypes.array.isRequired,
		chosen: PropTypes.number,
		onChoose: PropTypes.func.isRequired
	}

	render(){
		const { values, chosen, onChoose } = this.props;
		return (
			<View>
				<ScrollView ref={scrollView =>this._scrollView = scrollView}
					horizontal={true}
					vertical={false}
					decelrationRate={0.1}
					showHorizontalScrollIndicator={false}
					showVerticalScrollIndicator={false}
					automaticallyAdjustContentInsets={false}
					snapToInterval={optionWidth}
					styes={styles.options}>
						{values.map((value, index)=>
							<View style={{ width: optionWidth }} key={index}>
				              <Option
				                value={value}
				                isChosen={index === chosen}
				                onChoose={() => onChoose(index)}
				              />
				            </View>
							)}

				</ScrollView>
			</View>
			)
	}
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  options: {
    flexDirection: 'row',
    marginRight: -10,
  },
});