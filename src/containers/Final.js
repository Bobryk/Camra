import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  Platform
} from 'react-native'

import { connect } from 'react-redux'

import { mainStyle as styles } from '../styles'

const placeholderImage = require('../images/placeholder.png')

class Final extends Component {
  render = () => (
    <View style={styles.container}>
      <Text style={styles.header}>Camra</Text>
      <View style={styles.avatarContainer}>
        <Image style={styles.placeholderImage} source={require('../images/placeholder.png')} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight style={styles.touch} onPress={() => {
          this.props.onReset
          this.props.onForward(0) }}>
          <Text style={styles.selectText}>Start Over</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

Final.propTypes = {
  image: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired,
  onForward: PropTypes.func.isRequired,
  onReset:PropTypes.func.isRequired
}
export { Final }

const mapStateToProps = state => ({
  image: state.image.source,
  loaded: state.image.loaded
})

const mapDispatchToProps = dispatch => ({
  onReset: () => {
    dispatch(reset())
  }
})

export default ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Final)
