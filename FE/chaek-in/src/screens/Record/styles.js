import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    overflow: 'scroll',
  },

  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 24,
    padding: 5,
  },
  nameText: {
    fontSize: 16,
  },

  scoreText: {
    fontSize: 16,
    marginBottom: 10,
  },

  button: {
    elevation: 3,
    shadowColor: '#54282A',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3,
  },

  imgWrapper: {
    width: 300,
    height: 200,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default styles;
