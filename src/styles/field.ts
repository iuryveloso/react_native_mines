import {StyleSheet, Dimensions} from 'react-native'

export default function FieldStyle() {
  return StyleSheet.create({
    SafeArea: {
      backgroundColor: '#eee',
      flexGrow: 1,
    },
    SubTitle: {
      fontSize: 25,
      fontWeight: '500',
      textAlign: 'center',
    },
    FieldView: {
      flexGrow: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
      margin: 10,
    },
    HeaderView: {
      marginTop: 10,
      paddingHorizontal: 10,
      flexDirection: 'row',
    },
    HeaderStatusView: {
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    Touchable: {
      width: Dimensions.get('window').width / 8,
      height: Dimensions.get('window').width / 8,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: '#33aaff',
      padding: 5,
      margin: 5,
    },
  })
}
