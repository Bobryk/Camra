import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  Slider,
  Platform,
  ToastAndroid
} from 'react-native'

import { connect } from 'react-redux'

import { Surface } from 'gl-react-native'
import SaturationGL from '../GL/saturation'

import { updateBase64 } from '../actions'

import { mainStyle as styles } from '../styles'

const placeholderImage = require('../images/placeholder.png')



class Saturation extends Component {
  static get defaultProps() {
    return {
      title: 'Saturation'
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      saturationFactor: 1,
    }
  }

  saveAndContinue = () => {
    ToastAndroid.show('One Moment..',ToastAndroid.SHORT)
    this.refs.surface.captureFrame().then(data64 => {
      this.props.onSaveAndContinue(data64)
      this.props.onForward(2)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render = () => {
    const saturationFactor = this.state.saturationFactor
    return (
      <View style={styles.container}>

        <Text style={styles.header}>{this.props.title}</Text>

        <View style={styles.avatarContainer}>
        { !this.props.loaded ?
          <Image style={styles.placeholderImage} source={require('../images/placeholder.png')} /> :
          <Surface ref='surface' style={styles.surface} width={300} height={400}>
            <SaturationGL
              factor={saturationFactor}
              image={this.props.image}
            />
          </Surface>
        }
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.saturationText}>Saturation</Text>
          <Slider
            style={styles.saturationSlider}
            maximumValue={8}
            value={saturationFactor}
            onValueChange={value => this.setState({ saturationFactor: value })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.touch} onPress={this.saveAndContinue.bind(this)}>
            <Text style={styles.selectText}>Next</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

}

Saturation.propTypes = {
  image: PropTypes.object.isRequired,
  onSaveAndContinue: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  onForward: PropTypes.func.isRequired,
  title: PropTypes.string
}

export { Saturation }

const mapStateToProps = state => ({
  image: state.image.source,
  loaded: state.image.loaded
})

const mapDispatchToProps = dispatch => ({
  onSaveAndContinue: (data) => {
    dispatch(updateBase64(data))
  }
})

export default ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Saturation)
