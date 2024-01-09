import React, {useState} from 'react'
import Style from './styles/app'
import {SafeAreaView, View} from 'react-native'
import DataMines from './data/mines'
import {MinesInterface} from './interfaces'

import Main from './components/Main'
import Field from './components/Field'

function App() {
  const style = Style()
  const data = DataMines()

  const [mode, setMode] = useState<MinesInterface['mode']>('main')
  const [difficult, setDifficult] =
    useState<MinesInterface['difficult']>('easy')

  const columns = data.columns
  const minesNumber = data.mines
  const placesNumber = data.places

  return (
    <SafeAreaView style={style.SafeArea}>
      <View style={style.View}>
        {mode === 'main' ? (
          <Main setMode={setMode} setDifficult={setDifficult} />
        ) : (
          <Field
            setMode={setMode}
            columns={columns}
            difficult={difficult}
            minesNumber={minesNumber}
            placesNumber={placesNumber}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default App
