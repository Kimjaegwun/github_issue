npm install > cd ios > pod install > xcode 실행

### `typescript`

type 작성을 통해 코드에 목적을 명시하고 타입의 변수나 함수들에서 타입 추론을 통해 에러를 최소화하였습니다.
컴파일 단계에서 버그를 예방할 수 있어 생산성을 향상하였습니다.

### `react-hooks`

useState를 사용하여 component 상태관리 / useEffect를 활용하여 life cycle에 맞춰 렌더링 될 때마다 특정 작업을 수행할 수 있도록하였습니다. 그리고 useCallback, memo를 활용하여 함수형 컴포넌트 내부에서 발생하는 연산을 최적화하기 위해 노력하였습니다.

### `react-native-navigation`

react-native 에서는 react와는 다르게 navigation을 이용하여 stack 구조로 screen이 쌓여집니다.
그리고 하단도 마찬가지로 bottom-navigator를 활용하여 구현하였습니다. 하지만 하단은 stack 구조가 아닌 tab으로 구성되어 있습니다.

### `react-query`

data fetching 라이브러리인 react-query를 사용하여 비동기 통신 데이터를 가져와 활용하였습니다.

### `asyncstorage`

app 저장소인 asyncstorage를 사용하여 검색어 및 clip 데이터를 저장하였습니다.

### `screen design`

scrollview와 flatlist를 활용하여 화면의 스크로를 구현하였습니다. 기본적으로 동일한 컴포넌트들이 반복되거나
데이터 크기가 가변적인 곳에서는 flatlist를 활용하여 화면에 보여지는 부분만을 렌더링 함으로써 퍼포먼스 향상시키고자 하였습니다.
