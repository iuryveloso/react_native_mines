import { Dimensions } from "react-native"

export default function getDataMines() {
    const screen = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
    const columns = 10
    return {
        columns,
        mines: {
            easy: 12,
            medium: 24,
            hard: screen.height / screen.width < 1.8 ? 35 : 40,
        },
        places: {
            easy: columns * 8,
            medium: columns * 12,
            hard: columns * (screen.height / screen.width < 1.8 ? 14 : 16),
        }
    }
}