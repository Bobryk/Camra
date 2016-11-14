import { StyleSheet, PixelRatio } from 'react-native'

export const mainStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column'
  },
  header: {
    alignSelf: 'stretch',
    flex: 1,
    fontSize: 35,
    color: '#000000',
    textAlign: 'center'
  },
  touch: {
    borderColor: '#9B9B9B',
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1 / PixelRatio.get(),
  },
  selectText: {
    alignSelf: 'center'
  },
  sliderContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center'
  },
  avatarContainer: {
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 7,
    backgroundColor: '#aaa'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  surface: {
    alignSelf: 'center'
  },
  saturationText: {
    flex: 1,
    textAlignVertical: 'center',
    marginLeft: 10
  },
  saturationSlider: {
    flex: 4
  },
  avatar: {
    alignSelf: 'stretch',
    flex: 1,
    resizeMode: 'contain'
  },
  placeholderImage: {
    alignSelf: 'center',
    flex: 1,
    resizeMode: 'contain'
  }
})
