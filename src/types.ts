export type RootStackParamList = {
  Signup: undefined;
  Signin: undefined;
  Splash: undefined;
  HomePage: undefined;
  Setting: undefined;
  Loading: undefined;
  HeeaderSideMenu: undefined;
  MyPage: undefined;
  Detail: {
    item: SearchResultItem;
  };
  Search: undefined;
  Home: undefined;
};

export interface User {
  userId: string;
  email: string;
  name: string;
}

export enum Collections {
  USERS = 'users',
}

export interface SearchResultItem {
  id: number;
  title: string;
  itemImage: string; // 이미지 URL
  pageNo: number; //페이지 번호
  numOfRows: number; //한 페이지 결과 수
  itemName: string; //상품명 정보
}

export interface DetailedData {
  itemImage: string; // 이미지 URL
  entpName: string; //제조사 정보
  itemName: string; //상품명 정보
  itemSeq: number; //품목 기준 코드
  efcyQesitm: string; //이 약의 효능은 무엇입니까?
  useMethodQesitm: string; // 이 약은 어떻게 사용합니까?
  atpnWarnQesitm: string; // 이 약을 사용하기 전에 반드시 알아야 하는 내용은 무엇입니까?
  atpnQesitm: string; // 이 약의 주의사항은 무엇입니까?
  intrcQesitm: string; // 이 약을 사용하는 동안 주의해야 할 약 또는 음식은 무엇입니까?
  seQesitm: string; // 이 약은 어떤 이상반응이 나타날 수 있습니까?
  depositMethodQesitm: string; // 이 약을 사용하는 동안 주의해야 할 약 또는 음식은 무엇입니까?
  openDe: number; // 공개 일자
  updateDe: number; // 수정 일자
}
