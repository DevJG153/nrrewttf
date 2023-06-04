import React, { useCallback, useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import Screen from '../components/Screen';
import AuthContext from '../components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../../modules/Colors';

const MyPageScreen = () => {
  const { user: me } = useContext(AuthContext);
  const [medication, setMedication] = useState('');
  const [storedMedications, setStoredMedications] = useState<string[]>([]);

  const onPressLogout = useCallback(() => {
    auth().signOut();
  }, []);

  const handleMedicationChange = (text: React.SetStateAction<string>) => {
    setMedication(text);
  };

  const getStoredMedications = async () => {
    try {
      const savedMedications = await AsyncStorage.getItem('@medications');
      if (savedMedications !== null) {
        setStoredMedications(JSON.parse(savedMedications));
      }
    } catch (error) {
      console.error('Error fetching stored medications:', error);
    }
  };

  useEffect(() => {
    getStoredMedications();
  }, []); //약품 저장

  const saveMedication = async () => {
    try {
      const newStoredMedications = [...storedMedications, medication];
      await AsyncStorage.setItem(
        '@medications',
        JSON.stringify(newStoredMedications),
      );
      setStoredMedications(newStoredMedications);
      setMedication('');
    } catch (error) {
      console.error('Error saving medication:', error);
    }
  };
  if (me == null) {
    return null;
  }

  return (
    <Screen title="척척약사">
      <View style={styles.container}>
        <View>
          <Text style={styles.sectionTitleText}>나의 정보</Text>
          <View style={styles.userSectionContent}>
            <View style={styles.myProfile}>
              <Text style={styles.myNameText}>{me.name}</Text>
              <Text style={styles.myEmailText}>{me.email}</Text>
            </View>
            <TouchableOpacity onPress={onPressLogout}>
              <Text style={styles.logoutText}>로그아웃</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.medicationSection}>
          <Text style={styles.medicationTitle}>나의 약품 기록</Text>
          <TextInput
            style={styles.medicationInput}
            value={medication}
            onChangeText={handleMedicationChange}
            placeholder="약품 이름을 입력해주세요"
          />
          <TouchableOpacity onPress={saveMedication} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
          <FlatList
            data={storedMedications}
            keyExtractor={(item, index) => `medication_${index}`}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  medicationSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  medicationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.BLACK,
  },
  medicationInput: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 60,
  },
  saveButton: {
    backgroundColor: Colors.BLACK,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  listItem: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'flex-start',
  },
  itemText: {
    color: Colors.BLACK,
    fontSize: 16,
  },
});

export default MyPageScreen;
