import {StyleSheet, Dimensions} from 'react-native'

export default function MainStyle() {
  return StyleSheet.create({
     SafeArea: {
      backgroundColor: '#eee',
      flexGrow: 1,
    },
     Title: {
      marginTop: 20,
      fontSize: 35,
      fontWeight: 'bold',
      textAlign: 'center',
    },
     SubTitle: {
      fontSize: 25,
      fontWeight: '500',
      textAlign: 'center',
    },
     View: {
      flexGrow: 1,
      justifyContent: 'center',
    },
     DifficultView: {
      marginBottom: 10,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
  })
}
