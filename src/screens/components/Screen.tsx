import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../modules/Colors';
import { useNavigation } from '@react-navigation/native';

interface ScreenProps {
  title?: string; //header를 위한 타이틀 문자열 설정
  children?: React.ReactNode; //Screen안에 있는 자식 컴포넌트를 사용하기 위함
}

const Screen = ({ children, title }: ScreenProps) => {
  const { goBack, canGoBack } = useNavigation();
  const onPressBackButton = useCallback(() => {
    goBack();
  }, [goBack]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          {canGoBack() && (
            <TouchableOpacity onPress={onPressBackButton}>
              <Text style={styles.backButtonText}>{'Back'}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.center}>
          <Text style={styles.headerTitle}>{title} </Text>
        </View>
        <View style={styles.right} />
      </View>
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 48,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  body: {
    flex: 1,
  },
  backButtonText: {
    fontSize: 12,
    color: Colors.BLACK,
  },
});

export default Screen;
