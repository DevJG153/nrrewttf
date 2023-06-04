import React, { useCallback, useContext } from 'react';
import Screen from '../components/Screen';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../modules/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPageScreen from './MyPageScreen';
import SearchScreen from './SearchScreen';
import DetailScreen from './DetailScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === 'Home') {
              iconName = focused
                ? require('../../assets/images/home_ch.png')
                : require('../../assets/images/home_un.png');
            } else if (route.name === 'Search') {
              iconName = focused
                ? require('../../assets/images/search_ch.png')
                : require('../../assets/images/search_un.png');
            } else if (route.name === 'Recent') {
              iconName = focused
                ? require('../../assets/images/recent_ch.png')
                : require('../../assets/images/recent_un.png');
            } else if (route.name === 'MyPage') {
              iconName = focused
                ? require('../../assets/images/mypage_ch.png')
                : require('../../assets/images/mypage_un.png');
            }

            return (
              <Image source={iconName} style={{ width: 35, height: 35 }} />
            );
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Screen}
          options={{ headerShown: false, tabBarShowLabel: false }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,
            title: '척척약사',
            headerTitleStyle: { fontWeight: 'bold', color: Colors.BLACK },
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Detail"
          component={DetailScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{ headerShown: false, tabBarShowLabel: false }}
        />
      </Tab.Navigator>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* 안내문 추가 */}
      <SafeAreaView style={styles.infoContainer}>
        <Text style={styles.infoText}>
          이 앱에서는 약품 검색과 약품 기록을 할 수 있습니다.
        </Text>
      </SafeAreaView>
      <HomeTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.BLACK,
  },
  userSectionContent: {
    backgroundColor: Colors.BLACK,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  myProfile: {
    flex: 1,
  },
  myNameText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  myEmailText: {
    marginTop: 4,
    color: Colors.WHITE,
    fontSize: 14,
  },
  logoutText: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  // 안내문 스타일 추가
  infoContainer: {
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
});

export default HomeScreen;
