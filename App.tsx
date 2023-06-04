import React, { useCallback, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import SignupScreen from './src/screens/SignupScreen/SignupScreen';
import SigninScreen from './src/screens/SigninScreen/SigninScreen';
import AuthProvider from './src/screens/components/AuthProvider';
import AuthContext from './src/screens/components/AuthContext';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import LoadingScreen from './src/screens/LoadingScreen/LoadingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

//headerShown = 상단 헤더 여부
const Screens = () => {
  const { user, processingSignin, processingSignup, initialized } =
    useContext(AuthContext);
  const renderRootStack = useCallback(() => {
    if (!initialized) {
      return <Stack.Screen name="Loading" component={LoadingScreen} />;
    }
    if (user != null && !processingSignin && !processingSignup) {
      // login
      return <Stack.Screen name="HomePage" component={HomeScreen} />;
    }
    // logout
    return (
      <>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
      </>
    ); //SigninScreen.tsx 에 122줄 코드 버그와 동일 159줄에 주석에 자세히 설명.
  }, [user, processingSignin, processingSignup, initialized]); //renderTootStack을 통해 현재 로그인이 되어있는 상태인지 확인
  //17줄 코드: 현재 processingSignup(회원가입 상태)도 아니고 processingSignin(로그인 중인 상태)도 아니여야 완전한 로그인
  //상태라고 확인이 가능하다. 그래서 앞에 !를 붙여준다.

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {renderRootStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App() {
  return (
    <AuthProvider>
      <Screens />
    </AuthProvider>
  );
}

export default App;
