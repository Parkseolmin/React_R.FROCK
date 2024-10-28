# F.ROCK 쇼핑몰

<p align="center"><img src="https://github.com/user-attachments/assets/a59ff537-8702-46aa-bc6f-cfca9a9bcd09" alt="F.ROCK로고" width="300"/></p>
<p align="center">배포 URL : <a href="https://react-r-frock.vercel.app/" target="_blank">https://react-r-frock.vercel.app/</a></p>
<br>

## 목차
1. [소개](#소개)
2. [주요 기능](#주요-기능)
4. [설치 방법](#설치-방법)
5. [버전 정보](#버전-정보)
6. [알려진 이슈](#알려진-이슈)
7. [프로젝트를 진행하며 느낀점](#프로젝트를-진행하며-느낀점)
8. [프로젝트 회고 및 진행 기록 보러가기](#프로젝트-회고-및-진행-기록-보러가기)
<br>
<br>

## 소개
<div align="center">
<img width="80%" alt="frock1" src="https://github.com/user-attachments/assets/de3abccd-aad5-4f25-b4fc-70ab2fef3a52">
<img width="80%" alt="frock2" src="https://github.com/user-attachments/assets/e5fb0b94-fec2-4edf-8956-4c16661a9faf">
</div>
<br>

파지직TV는 현대 웹 개발의 핵심 기술들을 실제 프로젝트에 적용하며 깊이 있게 이해하고자 만들어진 Youtube 영상 사이트입니다. 이 프로젝트의 주요 목적은 다음과 같습니다:

Youtube Open API를 활용한 실제 데이터 기반의 애플리케이션 구축 경험 획득
비동기 통신 로직에 대한 심도 있는 이해와 실전 적용 능력 향상
최신 상태 관리 라이브러리인 Tanstack/React Query와 Zustand의 효과적인 사용법 숙달
Firebase를 통한 서버리스 아키텍처 및 실시간 데이터베이스 운용 능력 개발
Tailwind CSS를 이용한 현대적이고 반응형 UI 설계 및 구현 능력 강화
React 기반의 대규모 애플리케이션 설계 및 개발 경험 축적

이 프로젝트를 통해, 단순한 기술 학습을 넘어 실제 서비스와 유사한 환경에서의 개발 경험을 쌓고, 각 기술의 장단점을 직접 체험하며 최적의 사용 방법을 모색하고자 했습니다. 또한, 사용자 경험(UX)을 고려한 인터페이스 설계와 성능 최적화 등 실제 서비스 개발에서 중요한 요소들을 고려하며 개발 역량을 전반적으로 향상시키는 것을 목표로 하였습니다.
<br>
<br>

## 주요 기능
- YouTube Open API를 이용한 다양한 카테고리별 영상 제공
- Firebase를 통한 Google 로그인 지원
- 로그인 사용자를 위한 실제 YouTube 구독 채널 표시
- 영상별 '좋아요' 기능과 좋아요 표시한 영상 모아보기

이 프로젝트는 React를 기반으로 구축되었으며, 상태 관리를 위해 Tanstack Query와 Zustand를 사용하였습니다. UI 구성에는 SASS와 React Icons를 활용하였고, 시간 표시를 위해 timeago.js를 사용하였습니다.
<br>
<br>

## 설치 방법
1. GitHub 저장소를 클론합니다.
```bash
git clone https://github.com/Parkseolmin/React_Youtube.git
cd React_Youtube
```

2. `npm install` 명령어를 사용하여 의존성을 설치합니다.
```bash
npm install
```
3. 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고, API 키를 설정합니다.
```
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_authdomain_api_key
REACT_APP_FIREBASE_PROJECTID=your_firebase_project_id_api_key
REACT_APP_CLIENTID=your_googlecloudid_key
```

## 버전 정보

현재 버전: v1.0.0 (베타)

향후 업데이트 계획:
- v1.0.1: 성능 최적화
  - Google Chrome의 Lighthouse를 통해 최적화 진행
  - 반응성, 접근성, SEO 최적화
  - 코드 품질 향상
  - 사용자 경험 개선
    
- v1.1.0: TypeScript로의 전환
  - 정적 타입 검사를 통한 코드 안정성 향상
  - 개발자 경험 개선 및 버그 감소
  - 더 나은 유지보수성과 확장성 확보
<br>
<br>

## 알려진 이슈

- 모바일 환경에서 카카오톡으로 링크를 전달하여 사이트 열람할 경우
  - Google은 보안을 이유로 웹뷰에서 OAuth 인증을 허용하지 않아 로그인이 안됨

<br>
<br>

## 프로젝트를 진행하며 느낀점
이 프로젝트를 통해 단순한 기술적 도전을 넘어서, 개발자로서의 성장 과정을 생생히 경험할 수 있었습니다. 코드 한 줄 한 줄을 작성하면서, 각 요소의 선택과 구현 방식에 대해 깊이 고민하고 이해하는 과정은 매우 값진 경험이었습니다.

특히 이번 프로젝트에서 얻은 주요 배움들을 꼽자면, 먼저 불균일한 JSON 데이터 처리를 위한 창의적 해결책을 고안하면서 데이터 핸들링의 중요성을 체감했습니다. 또한, 실제 통신 로직과 mock 데이터 사용을 효과적으로 분리함으로써 코드의 유지보수성을 크게 향상시킬 수 있었습니다.

React Query의 다양한 기능을 활용하여 정교한 데이터 캐싱 전략을 수립하고, 복잡한 중첩 데이터 구조를 효율적으로 다루는 방법을 익혔습니다.
 
상태 관리 측면에서는 Zustand 라이브러리를 사용해 보며 기존의 Context API와 Reducer 조합과 비교 분석할 수 있었고, 이를 통해 상태 관리에 대한 폭넓은 이해를 갖게 되었습니다.
 
Firebase를 활용한 로그인 및 데이터베이스 구현 경험은 백엔드 지식이 부족했던 나에게 특히 소중한 기회였습니다. 액세스 토큰 갱신 과정에서 겪은 어려움과 그를 극복하는 과정은 비록 시간이 많이 소요되었지만, 문제 해결 능력을 한층 높이는 계기가 되었습니다.
<br>
<br>

## 프로젝트 회고 및 진행 기록 보러가기
- [ver1.0.0 Blog 글 보러가기](https://snowman-seolmini.tistory.com/85)
