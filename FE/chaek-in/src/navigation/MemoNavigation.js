import { createStackNavigator } from '@react-navigation/stack';
import MemoCreateScreen from '../screens/Memo/MemoCreateScreen';
import MemoListScreen from '../screens/Memo/MemoListScreen';
import OCRScreen from '../screens/OCR/OCRScreen';

const MemoStack = createStackNavigator();

function MemoNavigation() {
  return (
    <MemoStack.Navigator initialRouteName='MemoList'>
      <MemoStack.Screen name='MemoList' component={MemoListScreen}></MemoStack.Screen>
      <MemoStack.Screen name='MemoCreate' component={MemoCreateScreen}></MemoStack.Screen>
      <MemoStack.Screen name='OCR' component={OCRScreen}></MemoStack.Screen>
    </MemoStack.Navigator>
  );
}

export default MemoNavigation;
