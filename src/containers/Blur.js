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
import RNFS from "react-native-fs"

import { Surface } from 'gl-react-native'
import BlurGL from '../GL/blur'

import { mainStyle as styles } from '../styles'

import { updateImage } from '../actions'

const placeholderImage = require('../images/placeholder.png')



class Blur extends Component {
  static get defaultProps() {
    return {
      title: 'Blur'
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      factor: 0,
    }
  }

  saveAndContinue = () => {
    ToastAndroid.show('One Moment..',ToastAndroid.SHORT)
    RNFS.mkdir(RNFS.ExternalStorageDirectoryPath + '/CamraPictures')
    const captureConfig = {
      quality: 1,
      type: "png",
      format: "file"
    }
    var imageNumber = Math.floor(Math.random() * 50000)
    captureConfig.filePath = RNFS.ExternalStorageDirectoryPath + "/CamraPictures/CamraImage"+imageNumber+".png"
    this.props.onImageSave({ uri: 'file://' + captureConfig.filePath, isStatic: true })
    this.refs.surface
    .captureFrame(captureConfig)
    .then(captured => {
      ToastAndroid.show('File Saved',ToastAndroid.SHORT)
      this.props.onForward(4)

    })
    .catch(error => {
      console.log(error)
    })
  }

  render = () => {
    const factor = this.state.factor
    return (
      <View style={styles.container}>

        <Text style={styles.header}>{this.props.title}</Text>

        <View style={styles.avatarContainer}>
        { !this.props.loaded && this.props.image==='' ?
          <Image style={styles.placeholderImage} source={require('../images/placeholder.png')} /> :
          <Surface ref='surface' style={styles.surface} width={300} height={400}>
            <BlurGL
              width={300}
              height={400}
              factor={factor}>{this.props.image}</BlurGL>
          </Surface>
        }
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.saturationText}>Blur</Text>
          <Slider
            style={styles.saturationSlider}
            maximumValue={2}
            value={factor}
            onValueChange={factor => this.setState({ factor })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.touch} onPress={this.saveAndContinue.bind(this)}>
            <Text style={styles.selectText}>Save Image</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

}

Blur.propTypes = {
  image: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired,
  onForward: PropTypes.func.isRequired,
  onImageSave: PropTypes.func.isRequired,
  title: PropTypes.string
}

export { Blur }

const mapStateToProps = state => ({
  image: { uri: state.image.base64, isStatic: true },
  loaded: state.image.loaded
})

const mapDispatchToProps = dispatch => ({
  onImageSave: (source) => {
    dispatch(updateImage(source))
  }
})

export default ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blur)
