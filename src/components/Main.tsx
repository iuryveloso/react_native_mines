import React from 'react'
import Style from '../styles/main'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {MinesInterface} from '../interfaces'
import {Text, SafeAreaView, View, Button} from 'react-native'

interface MainInterface {
  setMode: React.Dispatch<React.SetStateAction<MinesInterface['mode']>>
  setDifficult: React.Dispatch<
    React.SetStateAction<MinesInterface['difficult']>
  >
}

function Main({setMode, setDifficult}: MainInterface) {
  const style = Style()

  return (
    <SafeAreaView style={style.SafeArea}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={style.Title}>Mines</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              // transform: [{rotate: '-30deg'}],
              marginRight: -16,
              marginBottom: 10,
            }}
            >
            <Icon name={'flag-triangle'} size={25} color={'#ff4400'} />
          </Text>
          <Text style={{marginTop: 8}}>
            <Icon name={'bomb'} size={25} color={'#000000'} />
          </Text>
        </View>
      </View>
      <Text style={style.SubTitle}>Select difficult level:</Text>
      <View style={style.View}>
        <View style={style.DifficultView}>
          <Button
            title={'Easy'}
            onPress={() => {
              setDifficult('easy')
              setMode('field')
            }}
          />
        </View>
        <View style={style.DifficultView}>
          <Button
            title={'Medium'}
            onPress={() => {
              setDifficult('medium')
              setMode('field')
            }}
          />
        </View>
        <View style={style.DifficultView}>
          <Button
            title={'Hard'}
            onPress={() => {
              setDifficult('hard')
              setMode('field')
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Main
