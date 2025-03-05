export interface LocationData {
  title: string;
  lat: number;
  lng: number;
  checked?: boolean;
  id?: string;
  hash?: string;
  description?: string;
}

export const QRLocations: LocationData[] = [
  { title: '전체 보기', lat: 37.56357067982097, lng: 126.93782429801615, checked: false },
  {
    title: '정문',
    lat: 37.56068477165337,
    lng: 126.93694388240334,
    checked: false,
    id: '1',
    hash: '0018f5c3',
    description: '연세대학교 정문 우측의 안내판 뒤를 확인해봐. 거기에 보물이 있어!',
  },
  {
    title: '공학관 앞',
    lat: 37.561772807596576,
    lng: 126.93709859192883,
    checked: false,
    id: '2',
    hash: '17331f46',
    description: '공학관 정문에서 백양로로 가는 길, 가로등 밑에서 보물을 찾아봐!',
  },
  {
    title: '백양누리',
    lat: 37.563393,
    lng: 126.937192,
    checked: false,
    id: '3',
    hash: '5887f7a8',
    description: '백양누리로 내려가는 엘리베이터 옆 벽면에 무엇인가 숨겨져 있어. 찾아보자!',
  },
  {
    title: '독수리상',
    lat: 37.56263781955377,
    lng: 126.93720256007985,
    checked: false,
    id: '4',
    hash: '54a7d2c8',
    description: '독수리상 앞 벤치를 살펴봐. 바로 우측면에 뭔가가 있을 거야.',
  },
  {
    title: '중도 앞',
    lat: 37.56362665806807,
    lng: 126.93719324114102,
    checked: false,
    id: '5',
    hash: '5e09ed51',
    description: '도서관 정문을 찾아와! 게시판 좌측에 보물이 숨어있어.',
  },
  {
    title: '도서관 앞 용재상',
    lat: 37.563819,
    lng: 126.937605,
    checked: false,
    id: '6',
    hash: '2a71d944',
    description: '용재 백낙준 박사상 우측의 벤치 측면에서 보물을 찾을 수 있을 거야.',
  },
];
