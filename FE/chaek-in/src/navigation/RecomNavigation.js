import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OurRecomScreen from '../screens/Recom/OurRecomScreen';
import CFScreen from '../screens/Recom/CFScreen';
import CBFScreen from '../screens/Recom/CBFScreen';

const RecomTab = createMaterialTopTabNavigator();

function MemoNavigation() {
  return (
    <RecomTab.Navigator initialRouteName='OurRecomScreen'>
      <RecomTab.Screen name='OurRecomScreen' component={OurRecomScreen}></RecomTab.Screen>
      <RecomTab.Screen name='CFScreen' component={CFScreen}></RecomTab.Screen>
      <RecomTab.Screen name='CBFScreen' component={CBFScreen}></RecomTab.Screen>
    </RecomTab.Navigator>
  );
}

export default MemoNavigation;
