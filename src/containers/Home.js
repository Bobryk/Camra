import React, { PropTypes } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native'

import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'

import { mainStyle as styles } from '../styles'

import { updateImage } from '../actions';

class Home extends React.Component {

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
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.props.image === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.props.image} />
          }
          </View>
        </TouchableOpacity>
      </View>
    )
  }

}

Home.propTypes = {
  image: PropTypes.object.isRequired,
  onImageSelect: PropTypes.func.isRequired
}

export { Home }

const mapStateToProps = state => ({
  image: state.image
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
