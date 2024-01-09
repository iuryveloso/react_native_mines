import {
  MinesInterface,
  ItemsNumberInterface,
  PlaceInterface,
} from '../interfaces'
import {Alert} from 'react-native'
import {getTimer} from './field'

export function convertFromPlaceValue(value: string) {
  switch (value) {
    case 'none':
      return 0
    case 'adj1':
      return 1
    case 'adj2':
      return 2
    case 'adj3':
      return 3
    case 'adj4':
      return 4
    case 'adj5':
      return 5
    case 'adj6':
      return 6
    case 'adj7':
      return 7
    case 'adj8':
      return 8
    default:
      return 'mine'
  }
}

function convertToPlaceValue(number: number): PlaceInterface['value'] {
  switch (number) {
    case 0:
      return 'none'
    case 1:
      return 'adj1'
    case 2:
      return 'adj2'
    case 3:
      return 'adj3'
    case 4:
      return 'adj4'
    case 5:
      return 'adj5'
    case 6:
      return 'adj6'
    case 7:
      return 'adj7'
    case 8:
      return 'adj8'
    default:
      return 'mine'
  }
}

export function getPlaceColor(place: PlaceInterface) {
  switch (place.value) {
    case 'adj1':
      return '#00ff00'
    case 'adj2':
      return '#00aa00'
    case 'adj3':
      return '#eeee00'
    case 'adj4':
      return '#aaaa00'
    case 'adj5':
      return '#aa6600'
    case 'adj6':
      return '#aa1700'
    case 'adj7':
      return '#770000'
    case 'adj8':
      return '#440000'
    default:
      return '#000000'
  }
}

function getAdjacents(
  pivotIndex: number,
  columns: number,
  difficult: MinesInterface['difficult'],
  placesNumber: ItemsNumberInterface,
) {
  const adjacents = {
    topLeft: pivotIndex - columns - 1,
    top: pivotIndex - columns,
    topRight: pivotIndex - columns + 1,
    left: pivotIndex - 1,
    right: pivotIndex + 1,
    bottomLeft: pivotIndex + columns - 1,
    bottom: pivotIndex + columns,
    bottomRight: pivotIndex + columns + 1,
  }

  const corners = {
    topLeft: 0,
    topRight: columns - 1,
    bottomLeft:
      (difficult === 'easy'
        ? placesNumber.easy
        : difficult === 'medium'
        ? placesNumber.medium
        : placesNumber.hard) - columns,
    bottomRight:
      (difficult === 'easy'
        ? placesNumber.easy
        : difficult === 'medium'
        ? placesNumber.medium
        : placesNumber.hard) - 1,
  }

  if (pivotIndex === corners.topLeft) {
    return [adjacents.right, adjacents.bottom, adjacents.bottomRight]
  } else if (pivotIndex === corners.topRight) {
    return [adjacents.left, adjacents.bottomLeft, adjacents.bottom]
  } else if (pivotIndex === corners.bottomLeft) {
    return [adjacents.top, adjacents.topRight, adjacents.right]
  } else if (pivotIndex === corners.bottomRight) {
    return [adjacents.topLeft, adjacents.top, adjacents.left]
  } else if (pivotIndex > corners.topLeft && pivotIndex < corners.topRight) {
    return [
      adjacents.left,
      adjacents.right,
      adjacents.bottomLeft,
      adjacents.bottom,
      adjacents.bottomRight,
    ]
  } else if (
    pivotIndex > corners.bottomLeft &&
    pivotIndex < corners.bottomRight
  ) {
    return [
      adjacents.topLeft,
      adjacents.top,
      adjacents.topRight,
      adjacents.left,
      adjacents.right,
    ]
  } else if (
    pivotIndex % columns === corners.topLeft &&
    pivotIndex > corners.topLeft &&
    pivotIndex < corners.bottomLeft
  ) {
    return [
      adjacents.top,
      adjacents.topRight,
      adjacents.right,
      adjacents.bottom,
      adjacents.bottomRight,
    ]
  } else if (
    pivotIndex % columns === corners.topRight &&
    pivotIndex > corners.topRight &&
    pivotIndex < corners.bottomRight
  ) {
    return [
      adjacents.topLeft,
      adjacents.top,
      adjacents.left,
      adjacents.bottomLeft,
      adjacents.bottom,
    ]
  } else {
    return [
      adjacents.topLeft,
      adjacents.top,
      adjacents.topRight,
      adjacents.left,
      adjacents.right,
      adjacents.bottomLeft,
      adjacents.bottom,
      adjacents.bottomRight,
    ]
  }
}

function modifyAdjacents(
  pivotIndex: number,
  modifiedPlaces: PlaceInterface[],
  columns: number,
  difficult: MinesInterface['difficult'],
  placesNumber: ItemsNumberInterface,
) {
  getAdjacents(pivotIndex, columns, difficult, placesNumber).forEach(adj => {
    if (
      modifiedPlaces[adj].value !== 'mine' &&
      modifiedPlaces[adj].status === 'hidden'
    ) {
      modifiedPlaces[adj] = {...modifiedPlaces[adj], status: 'visible'}
      if (modifiedPlaces[adj].value === 'none') {
        const modfiedAdjacents = modifyAdjacents(
          adj,
          modifiedPlaces,
          columns,
          difficult,
          placesNumber,
        )
        modifiedPlaces = modfiedAdjacents
      }
    }
  })
  return modifiedPlaces
}

function changePlaceStatus(
  placesToBeChanged: PlaceInterface[],
  place: PlaceInterface,
  action: MinesInterface['action'],
  index: number,
  columns: number,
  difficult: MinesInterface['difficult'],
  placesNumber: ItemsNumberInterface,
) {
  if (place.status !== 'visible') {
    if (
      action === 'visible' &&
      place.status === 'hidden' &&
      place.value === 'none'
    ) {
      const modifiedPlaces = placesToBeChanged
      modifiedPlaces[index] = {...modifiedPlaces[index], status: action}
      return modifyAdjacents(
        index,
        modifiedPlaces,
        columns,
        difficult,
        placesNumber,
      )
    }
    if (
      (action === 'marked' && place.status === 'marked') ||
      (action === 'unknown' && place.status === 'unknown')
    ) {
      const modifiedPlaces = placesToBeChanged
      modifiedPlaces[index] = {...modifiedPlaces[index], status: 'hidden'}
      return modifiedPlaces
    }
    if (
      (action === 'marked' && place.status === 'unknown') ||
      (action === 'unknown' && place.status === 'marked')
    ) {
      const modifiedPlaces = placesToBeChanged
      modifiedPlaces[index] = {...modifiedPlaces[index], status: action}
      return modifiedPlaces
    }
    if (
      action === 'visible' &&
      (place.status === 'marked' || place.status === 'unknown')
    ) {
      return placesToBeChanged
    }
    if (
      (action === 'visible' || action === 'marked' || action === 'unknown') &&
      place.status === 'hidden'
    ) {
      const modifiedPlaces = placesToBeChanged
      modifiedPlaces[index] = {...modifiedPlaces[index], status: action}
      return modifiedPlaces
    }
  }
  return placesToBeChanged
}

function populatePlaces(
  columns: number,
  index: number,
  difficult: MinesInterface['difficult'],
  placesNumber: ItemsNumberInterface,
  minesNumber: ItemsNumberInterface,
  place: PlaceInterface,
  setPlaces: React.Dispatch<React.SetStateAction<PlaceInterface[]>>,
  action: MinesInterface['action'],
) {
  const getNewPlaces = (prevPlaces: PlaceInterface[], minePlaces: number[]) => {
    const newPlaces = prevPlaces.map((prevPlace, placeIndex) => {
      if (minePlaces.filter(bomb => bomb === placeIndex).length > 0) {
        const newPlace: PlaceInterface = {
          status: prevPlace.status,
          value: 'mine',
        }
        return newPlace
      } else {
        const adjacentsBombs = getAdjacents(
          placeIndex,
          columns,
          difficult,
          placesNumber,
        ).reduce(
          (prev, cur) =>
            minePlaces.filter(bomb => bomb === cur).length > 0
              ? prev + 1
              : prev,
          0,
        )
        const newPlace: PlaceInterface = {
          status: prevPlace.status,
          value: convertToPlaceValue(adjacentsBombs),
        }
        return newPlace
      }
    })
    return newPlaces
  }
  const randomMinePlaces = () => {
    const resultsGenerated: number[] = []
    const totalMines =
      difficult === 'easy'
        ? minesNumber.easy
        : difficult === 'medium'
        ? minesNumber.medium
        : minesNumber.hard
    const totalPlaces =
      difficult === 'easy'
        ? placesNumber.easy
        : difficult === 'medium'
        ? placesNumber.medium
        : placesNumber.hard
    function generateRandom() {
      const generatedNumber = Math.floor(Math.random() * totalPlaces)
      const adjacentNumbers = getAdjacents(
        index,
        columns,
        difficult,
        placesNumber,
      )
      if (
        !resultsGenerated.includes(generatedNumber) &&
        generatedNumber !== index &&
        !(adjacentNumbers.filter(num => num === generatedNumber).length > 0)
      ) {
        resultsGenerated.push(generatedNumber)
      } else {
        generateRandom()
      }
    }
    for (let i = 0; i < totalMines; i++) {
      generateRandom()
    }
    return resultsGenerated
  }

  const minePlaces = randomMinePlaces()
  setPlaces(prevPlaces =>
    changePlaceStatus(
      getNewPlaces(prevPlaces, minePlaces),
      place,
      action,
      index,
      columns,
      difficult,
      placesNumber,
    ),
  )
}

export function placeAction(
  columns: number,
  index: number,
  seconds: number,
  difficult: MinesInterface['difficult'],
  placesNumber: ItemsNumberInterface,
  minesNumber: ItemsNumberInterface,
  place: PlaceInterface,
  places: PlaceInterface[],
  setPlaces: React.Dispatch<React.SetStateAction<PlaceInterface[]>>,
  action: MinesInterface['action'],
  firstClick: boolean,
  setFirstClick: React.Dispatch<React.SetStateAction<boolean>>,
  setMode: React.Dispatch<React.SetStateAction<MinesInterface['mode']>>,
) {
  if (action === 'visible' && firstClick === false) {
    populatePlaces(
      columns,
      index,
      difficult,
      placesNumber,
      minesNumber,
      place,
      setPlaces,
      action,
    )
    setFirstClick(true)
  } else if (
    action === 'visible' &&
    place.value === 'mine' &&
    place.status === 'hidden' &&
    firstClick === true
  ) {
    setPlaces(prevPlaces =>
      prevPlaces.map(prevPlace =>
        prevPlace.value === 'mine'
          ? {...prevPlace, status: 'visible'}
          : prevPlace,
      ),
    )
    Alert.alert('Game Over', 'Returning to Main Menu', [
      {text: 'OK', onPress: () => setMode('main')},
    ])
  } else if (action === 'marked' && place.value === 'mine') {
    const totalMines =
      difficult === 'easy'
        ? minesNumber.easy
        : difficult === 'medium'
        ? minesNumber.medium
        : minesNumber.hard
    const markedMines = changePlaceStatus(
      places,
      place,
      action,
      index,
      columns,
      difficult,
      placesNumber,
    ).reduce(
      (prev, place) =>
        place.status === 'marked' && place.value === 'mine'
          ? {...prev, correct: prev.correct + 1}
          : place.status === 'marked' && place.value !== 'mine'
          ? {...prev, incorrect: prev.incorrect + 1}
          : prev,
      {correct: 0, incorrect: 0},
    )
    if (markedMines.correct === totalMines && markedMines.incorrect === 0) {
      Alert.alert(
        'You Win!',
        `Congratulations, you took ${getTimer(seconds)} to win the ${difficult
          .charAt(0)
          .toUpperCase()}${difficult.slice(1)} Mode !`,
        [{text: 'OK', onPress: () => setMode('main')}],
      )
    } else {
      setPlaces(prevPlaces =>
        changePlaceStatus(
          prevPlaces,
          place,
          action,
          index,
          columns,
          difficult,
          placesNumber,
        ),
      )
    }
  } else {
    setPlaces(prevPlaces =>
      changePlaceStatus(
        prevPlaces,
        place,
        action,
        index,
        columns,
        difficult,
        placesNumber,
      ),
    )
  }
}
