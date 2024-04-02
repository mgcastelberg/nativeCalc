
import {
  StatusBar,
  useColorScheme,
  View
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { CalculatorScreen } from './presentation/screens/CalculatorScreen';
import { globalStyles } from './config/theme/app-theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={globalStyles.background}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'black'}
      />
      <CalculatorScreen/>
    </View>
  );
}

export default App;
