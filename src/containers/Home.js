import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  Platform
} from 'react-native'

import { connect } from 'react-redux'

import ImagePicker from 'react-native-image-picker'

import { mainStyle as styles } from '../styles'

import { updateImage } from '../actions'

const placeholderImage = require('../images/placeholder.png')



class Home extends Component {
  static get defaultProps() {
    return {
      title: 'Home'
    }
  }

  selectPhotoTapped = () => {
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
        this.props.onForward(1)


      }
    })
  }

  render = () => {
    return (
      <View style={styles.container}>

        <Text style={styles.header}>CAMRA</Text>

        <View style={styles.avatarContainer}>
          <Image style={styles.placeholderImage} source={require('../images/placeholder.png')} />
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
  loaded: PropTypes.bool.isRequired,
  onForward: PropTypes.func.isRequired,
  title: PropTypes.string
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

export default ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
