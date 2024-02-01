import React, {useEffect, useState} from 'react'
import Style from '../styles/field'
import {Text, View, TouchableHighlight} from 'react-native'
import {MinesInterface, ItemsNumberInterface, PlaceInterface} from '../interfaces'
import Place from './Place'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { changeAction, getRemainMines, getTimer, surrender } from '../functions/field'

interface FieldInterface {
  setMode: React.Dispatch<React.SetStateAction<MinesInterface['mode']>>
  difficult: MinesInterface['difficult']
  minesNumber: ItemsNumberInterface
  placesNumber: ItemsNumberInterface
  columns: number
}

function Field({
  setMode,
  difficult,
  minesNumber,
  placesNumber,
  columns
}: FieldInterface) {
  const style = Style()

  const [places, setPlaces] = useState<PlaceInterface[]>([])
  const [action, setAction] = useState<MinesInterface['action']>(
    'visible',
  )
  const [seconds, setSeconds] = useState(0)
  const [firstClick, setFirstClick] = useState(false)


  // Generate default Places
  useEffect(() => {
    const totalPlaces =
      difficult === 'easy'
        ? placesNumber.easy
        : difficult === 'medium'
        ? placesNumber.medium
        : placesNumber.hard
    const arrayMines: PlaceInterface[] = new Array(totalPlaces).fill({status: 'hidden', value: 'none'})
    setPlaces(arrayMines)
  }, [])

  // Activate Timer
  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
    if (seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [])

  return (
    <View style={style.SafeArea}>
      <View style={style.HeaderView}>
        <TouchableHighlight
          style={style.Touchable}
          onPress={() => surrender(setMode)}
          underlayColor={'#44bbff'}>
          <Icon name={'arrow-left'} size={25} color={'white'} />
        </TouchableHighlight>
        <TouchableHighlight
          style={style.Touchable}
          onPress={() => changeAction(firstClick, action, setAction)}
          underlayColor={'#44bbff'}>
          <Icon
            name={
              action === 'marked'
                ? 'flag-triangle'
                : action === 'visible'
                ? 'eye'
                : 'map-marker-question-outline'
            }
            size={25}
            color={'white'}
          />
        </TouchableHighlight>
        <View style={style.HeaderStatusView}>
          <Text style={style.SubTitle}>
            {getRemainMines(difficult, minesNumber, places)} <Icon name={'bomb'} size={25} />{' '}
          </Text>
          <Text style={style.SubTitle}>{getTimer(seconds)}</Text>
        </View>
      </View>
      <View style={style.FieldView}>
        {places.map((place, i) => {
          return (
            <Place
              key={i}
              index={i}
              columns={columns}
              place={place}
              action={action}
              places={places}
              setPlaces={setPlaces}
              firstClick={firstClick}
              setFirstClick={setFirstClick}
              difficult={difficult}
              setMode={setMode}
              minesNumber={minesNumber}
              placesNumber={placesNumber}
              seconds={seconds}
            />
          )
        })}
      </View>
    </View>
  )
}

export default Field
