import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { RootStackParamList, SearchResultItem } from '../../types';
import Colors from '../../modules/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type DetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

const SearchScreen = () => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchSearchResults = async (params: any) => {
    try {
      const response = await axios.get(
        'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?ServiceKey=gu%2FVZjWSoyEyWOKNhSAmlnGFGqVNOMBuuQUAM0S%2FWuhn0j9EDkE1likD6CjkJscCebczJjy%2F5%2B%2BqplbzYoRRcQ%3D%3D',
        { params },
      );
      console.log(response.data);
      if (response.data.body.items) {
        setSearchResults([...searchResults, ...response.data.body.items]);
      } else {
        console.error('No items found in response');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    setSearchResults([]);
    const params = {
      pageNo: currentPage,
      numOfRows: 5,
      itemName: query,
      itemImage: '',
      type: 'json',
    };

    fetchSearchResults(params);
  };

  const loadMoreResults = () => {
    setCurrentPage(prevPage => prevPage + 1);
    handleSearch();
  };

  interface RenderItemProps {
    item: SearchResultItem;
  }

  const navigation = useNavigation<DetailScreenNavigationProp>();

  const handleItemPress = (item: SearchResultItem) => {
    navigation.navigate('Detail', { item });
  };

  const renderItem = ({ item }: RenderItemProps): JSX.Element => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.item}>
        <Image
          style={styles.image} // 이미지 스타일을 적용
          source={{ uri: item.itemImage }} // itemImage URL을 사용해 이미지 불러오기
          resizeMode="cover" // 이미지 크기 조절
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.itemName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="  약품 이름을 검색해보세요!"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchText}>검색</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.itemName}-${index}`}
        onEndReached={loadMoreResults}
        onEndReachedThreshold={1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    flex: 1,
    paddingLeft: 15,
    height: 50,
    borderTopLeftRadius: 10,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    marginRight: -1,
    fontSize: 20,
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY,
    padding: 10,
    alignItems: 'center', // 제목과 이미지를 수직으로 가운데 맞춤
  },
  image: {
    width: 100, // 이미지 너비
    height: 100, // 이미지 높이
    marginRight: 10, // 이미지 제목 사이의 간격 조절
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 20,
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: 20,
  },
  searchText: {
    color: Colors.WHITE,
    fontSize: 20,
  },
  searchButton: {
    backgroundColor: Colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
});

export default SearchScreen;
