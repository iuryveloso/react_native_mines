import React from 'react'
import Style from '../styles/place'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  MinesInterface,
  ItemsNumberInterface,
  PlaceInterface,
} from '../interfaces'
import {Text, TouchableHighlight} from 'react-native'
import {
  convertFromPlaceValue,
  getPlaceColor,
  placeAction,
} from '../functions/place'

interface PlaceComponentInterface {
  place: PlaceInterface
  index: number
  columns: number
  places: PlaceInterface[]
  setPlaces: React.Dispatch<React.SetStateAction<PlaceInterface[]>>
  action: MinesInterface['action']
  firstClick: boolean
  seconds: number
  setFirstClick: React.Dispatch<React.SetStateAction<boolean>>
  difficult: MinesInterface['difficult']
  setMode: React.Dispatch<React.SetStateAction<MinesInterface['mode']>>
  minesNumber: ItemsNumberInterface
  placesNumber: ItemsNumberInterface
}

function Place({
  place,
  index,
  columns,
  places,
  setPlaces,
  action,
  difficult,
  firstClick,
  seconds,
  setFirstClick,
  setMode,
  minesNumber,
  placesNumber,
}: PlaceComponentInterface) {
  const backgroundColor = () => {
    if (place.status !== 'visible') {
      return '#3ec6ff'
    } else {
      return '#fff'
    }
  }
  const style = Style(backgroundColor())

  return (
    <TouchableHighlight
      style={style.Place}
      underlayColor={place.status === 'visible' ? '#fff' : '#44bbff'}
      onPress={() =>
        placeAction(
          columns,
          index,
          seconds,
          difficult,
          placesNumber,
          minesNumber,
          place,
          places,
          setPlaces,
          action,
          firstClick,
          setFirstClick,
          setMode,
        )
      }>
      {place.status === 'marked' ? (
        <Icon name={'flag-triangle'} size={15} color={'#b00'} />
      ) : place.status === 'unknown' ? (
        <Icon name={'map-marker-question-outline'} size={15} color={'black'} />
      ) : place.status === 'visible' ? (
        <Text style={{color: getPlaceColor(place)}}>
          {convertFromPlaceValue(place.value) === 'mine' ? (
            <Icon name={'bomb'} size={15} color={'black'} />
          ) : convertFromPlaceValue(place.value) === 0 ? (
            ''
          ) : (
            convertFromPlaceValue(place.value)
          )}
        </Text>
      ) : (
        <Text />
      )}
    </TouchableHighlight>
  )
}

export default Place
