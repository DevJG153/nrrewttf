import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import {
  RootStackParamList,
  DetailedData,
  SearchResultItem,
} from '../../types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;

interface DetailScreenProps {
  route: DetailRouteProp;
  navigation: DetailScreenNavigationProp;
  item: SearchResultItem;
}

const DetailScreen = ({ route }: DetailScreenProps) => {
  const [detailedInfo, setDetailedInfo] = useState<DetailedData | null>(null);
  const { item } = route.params;

  const fetchDetailedInfo = async () => {
    try {
      const response = await axios.get(
        'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?ServiceKey=gu%2FVZjWSoyEyWOKNhSAmlnGFGqVNOMBuuQUAM0S%2FWuhn0j9EDkE1likD6CjkJscCebczJjy%2F5%2B%2BqplbzYoRRcQ%3D%3D',
        {
          params: {
            pageNo: 1,
            numOfRows: 1,
            itemName: item.itemName,
            entpName: '', //제조사 정보
            itemSeq: '', //품목 기준 코드
            efcyQesitm: '', //이 약의 효능은 무엇입니까?
            useMethodQesitm: '', // 이 약은 어떻게 사용합니까?
            atpnWarnQesitm: '', // 이 약을 사용하기 전에 반드시 알아야 하는 내용은 무엇입니까?
            atpnQesitm: '', // 이 약의 주의사항은 무엇입니까?
            intrcQesitm: '', // 이 약을 사용하는 동안 주의해야 할 약 또는 음식은 무엇입니까?
            seQesitm: '', // 이 약은 어떤 이상반응이 나타날 수 있습니까?
            depositMethodQesitm: '', // 이 약을 사용하는 동안 주의해야 할 약 또는 음식은 무엇입니까?
            openDe: '', // 공개 일자
            updateDe: '', // 수정 일자
            itemImage: '',
            type: 'json',
          },
        },
      );

      // You may have to update this line based on the actual API response structure
      setDetailedInfo(response.data.body.items[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetailedInfo();
  }, []);

  const removePT = (text: string) => {
    if (text === null) {
      return '';
    } else {
      return text.replace(/<\/?p[^>]*>/gi, '');
    }
  };

  return (
    <ScrollView>
      {detailedInfo && (
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: detailedInfo.itemImage }}
            resizeMode="cover"
          />
          <Text style={styles.title}>{removePT(detailedInfo.itemName)}</Text>
          <Text style={styles.dictext}>
            {removePT(detailedInfo.efcyQesitm)}
          </Text>
          <Text style={styles.dictext}>
            {removePT(detailedInfo.useMethodQesitm)}
          </Text>
          <Text style={styles.dictext}>
            {removePT(detailedInfo.atpnWarnQesitm)}
          </Text>
          <Text style={styles.dictext}>
            {removePT(detailedInfo.atpnQesitm)}
          </Text>
          <Text style={styles.dictext}>
            {removePT(detailedInfo.intrcQesitm)}
          </Text>
          <Text style={styles.dictext}>{removePT(detailedInfo.seQesitm)}</Text>
          <Text style={styles.dictext}>
            {removePT(detailedInfo.depositMethodQesitm)}
          </Text>
        </SafeAreaView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  dictext: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetailScreen;
