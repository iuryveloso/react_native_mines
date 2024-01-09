import { StyleSheet, Dimensions } from 'react-native'

export default function PlaceStyle(backgroundColor: string) {
    return StyleSheet.create({
        Place: {
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('window').width / 12,
            height: Dimensions.get('window').width / 12,
            borderRadius: Dimensions.get('window').width / 48,
            margin: 2,
            backgroundColor: backgroundColor
        }
    })
}
