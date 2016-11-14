import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  Slider,
  Platform
} from 'react-native'

import { connect } from 'react-redux'

import ImagePicker from 'react-native-image-picker'
import { Surface } from 'gl-react-native'
import Saturation from './saturation'

import { mainStyle as styles } from '../styles'

import { updateImage } from '../actions'

const placeholderImage = require('../images/placeholder.png')



class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      saturationFactor: 1,
    }
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error && !response.customButton) {
        let source

        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true}
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true}
        }
        this.props.onImageSelect(source)
      }
    })
  }

  render() {
    const saturationFactor = this.state.saturationFactor
    return (
      <View style={styles.container}>

        <Text style={styles.header}>CAMRA</Text>

        <View style={styles.avatarContainer}>
        { !this.props.loaded ?
          <Image style={styles.placeholderImage} source={require('../images/placeholder.png')} /> :
          <Surface style={styles.surface} width={225} height={400}>
            <Saturation
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
          <TouchableHighlight style={styles.touch} onPress={this.selectPhotoTapped.bind(this)}>
            <Text style={styles.selectText}>Load Image</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

}

Home.propTypes = {
  image: PropTypes.object.isRequired,
  onImageSelect: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired
}

export { Home }

const mapStateToProps = state => ({
  image: state.image.source,
  loaded: state.image.loaded
})
// TODO kill es-lint disable when using dispatch
/* eslint-disable no-unused-vars */
const mapDispatchToProps = dispatch => ({
  onImageSelect: (imageLoc) => {
    dispatch(updateImage(imageLoc))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
