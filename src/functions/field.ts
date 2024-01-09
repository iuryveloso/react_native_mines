import {Alert} from 'react-native'
import {
  ItemsNumberInterface,
  MinesInterface,
  PlaceInterface,
} from '../../interfaces/mines'

interface FieldInterface {
  setMode: React.Dispatch<React.SetStateAction<MinesInterface['mode']>>
  difficult: MinesInterface['difficult']
  minesNumber: ItemsNumberInterface
  places: PlaceInterface[]
  seconds: number
  firstClick: boolean
  action: MinesInterface['action']
  setAction: React.Dispatch<React.SetStateAction<MinesInterface['action']>>
}

export function surrender(setMode: FieldInterface['setMode']) {
  Alert.alert('Surrender', 'Do you want to surrender?', [
    {text: 'No'},
    {text: 'Yes', onPress: () => setMode('main')},
  ])
}

export function getRemainMines(
  difficult: FieldInterface['difficult'],
  minesNumber: FieldInterface['minesNumber'],
  places: FieldInterface['places'],
) {
  const totalBombs =
    difficult === 'easy'
      ? minesNumber.easy
      : difficult === 'medium'
      ? minesNumber.medium
      : minesNumber.hard
  const flagsNumber = places.reduce(
    (prev, cur) => (cur.status === 'marked' ? prev + 1 : prev),
    0,
  )
  return totalBombs - flagsNumber
}

export function getTimer(seconds: FieldInterface['seconds']) {
  return `${parseInt(`${seconds / 3600}`, 10) < 10 ? '0' : ''}${parseInt(
    `${seconds / 3600}`,
    10,
  )}:${parseInt(`${(seconds / 60) % 60}`, 10) < 10 ? '0' : ''}${parseInt(
    `${(seconds / 60) % 60}`,
    10,
  )}:${parseInt(`${seconds % 60}`, 10) < 10 ? '0' : ''}${parseInt(
    `${seconds % 60}`,
    10,
  )}`
}

export function changeAction(
  firstClick: FieldInterface['firstClick'],
  action: FieldInterface['action'],
  setAction: FieldInterface['setAction'],
) {
  if (firstClick === true) {
    switch (action) {
      case 'visible':
        setAction('marked')
        break
      case 'marked':
        setAction('unknown')
        break
      case 'unknown':
        setAction('visible')
        break
      default:
        break
    }
  }
}
