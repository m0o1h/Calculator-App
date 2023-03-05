import React,{useState} from 'react';
import { View } from 'react-native'
import MainScreen from './Views/MainScreen';
import IntroScreen from './Views/IntroScreen';
import { ExternalStyle } from './ExternalStyle';
import { RecoilRoot } from 'recoil';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  setTimeout(() => {
    setIsLoaded(true)
  }, 2000);

  return (
    <RecoilRoot>
    <View style={ExternalStyle.container} >
      {isLoaded?<MainScreen />:<IntroScreen />}
    </View>
    </RecoilRoot>
  )
}

export default App
