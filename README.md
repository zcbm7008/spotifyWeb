# Spotify Project 
Spotify Api를 사용하여 Spotify 서버측에 Auth code를 요청하여 Auth code를 받고, '좋아요 표시한 곡'페이지에 있는 곡들의 정보들을 받아 카드 리스트로 변환한 후에, Intersection Observer Api를 사용하여 무한 스크롤을 구현하였습니다. 

카드를 클릭 시, 곡들의 상세정보와 미리보기가 재생됩니다. 

또한 '좋아요 표시한 곡'의 카드들을 Drag And Drop을 통해 커스텀 플레이리스트를 만들 수 있습니다. 
## 상세 정보

따로 서버를 만들어서 Spotify서버와 통신하는 이유는 보안 결함 때문에 유저의 Auth token의 기한이 끝나면 refersh할 때 사용 하는 refresh token을 받지 못하고, 보안에 결함이 있습니다.
(자세한 내용은 https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow) 

개발언어 : React(프론트), Nodejs(백엔드) \
사용 API : https://developer.spotify.com/documentation/web-api

사용 라이브러리 : \
React-router \
zustand \
react-beautiful-dnd \
axios 

주요 기능 : \
Spotify의 '좋아요 표시한 곡'를 카드로 보여줌. \
Intersection Observer Api를 사용하여 무한스크롤 구현. \
'좋아요 표시한 곡' 카드들을 Drag and Drop으로 다른 객체와 상호작용 가능. \
Custom PlayList 제작.

만들 기능 : \
Spotify 추천곡 불러오기 \
노래 재생(premium필요함) \



4/26
## Finished
react-router routing \
state management using zustand \
dnd interaction \
style layout using flex \
loading custom list, likelist logic \
separate fetching logic \
server for auth \
## TODO
separate detailpage logic \
design and css \
make test case \
