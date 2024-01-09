import {StyleSheet} from 'react-native'

export default function AppStyle() {
  return StyleSheet.create({
    SafeArea: {
      backgroundColor: '#eee',
      flexGrow: 1,
    },
    View: {
      flexGrow: 1,
      justifyContent: 'center',
    },
  })
}
