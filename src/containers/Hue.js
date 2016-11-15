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
import HueGL from '../GL/hue'

import { updateBase64 } from '../actions'

import { mainStyle as styles } from '../styles'

const placeholderImage = require('../images/placeholder.png')



class Hue extends Component {
  static get defaultProps() {
    return {
      title: 'Hue'
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      hue: 0,
    }
  }

  saveAndContinue() {
    ToastAndroid.show('One Moment..',ToastAndroid.SHORT)
    this.refs.surface.captureFrame().then(data64 => {
      this.props.onSaveAndContinue(data64)
      this.props.onForward(3)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    const hue = this.state.hue
    return (
      <View style={styles.container}>

        <Text style={styles.header}>{this.props.title}</Text>

        <View style={styles.avatarContainer}>
        { !this.props.loaded && this.props.image==='' ?
          <Image style={styles.placeholderImage} source={require('../images/placeholder.png')} /> :
          <Surface ref='surface' style={styles.surface} width={300} height={400}>
            <HueGL
              hue={hue}
              image={this.props.image}
            />
          </Surface>
        }
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.saturationText}>Hue</Text>
          <Slider
            style={styles.saturationSlider}
            maximumValue={2 * Math.PI}
            value={hue}
            onValueChange={hue => this.setState({ hue })}
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

Hue.propTypes = {
  image: PropTypes.object.isRequired,
  onSaveAndContinue: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  onForward: PropTypes.func.isRequired,
  title: PropTypes.string
}

export { Hue }

const mapStateToProps = state => ({
  image: { uri: state.image.base64, isStatic: true },
  loaded: state.image.loaded
})
// TODO kill es-lint disable when using dispatch
/* eslint-disable no-unused-vars */
const mapDispatchToProps = dispatch => ({
  onSaveAndContinue: (data) => {
    dispatch(updateBase64(data))
  }
})

export default ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hue)
