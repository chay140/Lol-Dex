# 리그 오브 레전드 정보 앱
![logo](/public/logo.png)

## 📖 목차

1. [프로젝트 설명](#프로젝트-설명)
2. [주요 기능](#주요-기능)
3. [프로젝트 구성](#프로젝트-구성)
4. [Trouble Shooting](#trouble-shooting)
5. [개발기간](#개발기간)
6. [기술스택](#기술스택)

## 프로젝트 설명
**Riot API**와 **Data Dragon**을 활용하여 만든 리그 오브 레전드 정보 조회 애플리케이션. **챔피언 정보 조회**, **챔피언 로테이션 확인** 등 다양한 데이터를 제공하며, **Next.js**와 **TypeScript**를 활용해 개발되었습니다.
프로젝트를 통해 **동적 라우팅**, **App Router**, **Route Handler**와 같은 Next.js의 핵심 기능과 **타입 선언**, **useState에서 제네릭 사용**, **유틸리티 타입 활용**을 실습합니다.

리그 오브 레전드 팬들이 유용하게 사용할 수 있는 정보를 간편하게 확인할 수 있도록 제작된 웹 애플리케이션입니다.

![Home](https://github.com/user-attachments/assets/8ae33ea2-3951-43da-b0e5-bce0e1b151cf)

## 주요 기능  
### 챔피언 목록 확인 (ISR)  
- **Incremental Static Regeneration** 방식을 사용하여 최신 챔피언 목록을 확인할 수 있습니다.
![Champions](https://github.com/user-attachments/assets/8adc0e1e-a210-41ea-b3d8-dcf3235ff936)


### 챔피언 상세 보기 (SSR)  
- **Server-Side Rendering**으로 선택한 챔피언의 상세 정보를 제공합니다.
![champion-detail-page-gif](https://github.com/user-attachments/assets/23e53561-1e45-4664-9f0a-71de41fa5a61)


### 아이템 목록 보기 (SSG)  
- **Static-Site Generation**으로 아이템 목록을 빠르게 조회할 수 있습니다.  
![Items](https://github.com/user-attachments/assets/b96a4ddd-449d-46d6-8f4d-f5893115a474)

### 로테이션 챔피언 목록 보기 (CSR)  
- **Client-Side Rendering**을 통해 매주 변경되는 무료 챔피언 로테이션 목록을 실시간으로 확인할 수 있습니다.  
![rotation-page gif](https://github.com/user-attachments/assets/ec69d18b-b50d-42ac-8d45-5b0ea1bb9d33)

### 추가 기능
- 로딩과 에러 페이지 구현으로 UX경험을 높였습니다.
- 다크모드가 가능하도록 구현했습니다.

## 프로젝트 구성
```
lol-dex/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── champions/
│   │   |   └── [id]/
│   │   ├── items/
│   │   ├── rotation/
│   │   └── api/rotation/
│   ├── components/
│   ├── types/
│   └── utils/
├── .env.local
├── package.json
└── next.config.js 
```
- `public/`: 정적 파일들을 관리하는 디렉토리 (이미지, 폰트 등)  
- `src/`: 프로젝트의 주요 소스 파일이 위치한 디렉토리  
  - `app/`: Next.js의 App Router 기능을 활용한 라우팅 디렉토리  
    - `layout.tsx`: 모든 페이지에 공통으로 적용되는 레이아웃 파일  
    - `page.tsx`: 홈 페이지 컴포넌트  
    - `champions/`: 챔피언 관련 페이지 디렉토리  
      - `[id]/`: 개별 챔피언 상세 정보를 보여주는 동적 라우팅 페이지  
    - `items/`: 아이템 목록 페이지  
    - `rotation/`: 로테이션 챔피언 목록 페이지  
    - `api/rotation/`: 로테이션 챔피언 데이터를 제공하는 API 라우트  
  - `components/`: 재사용 가능한 UI 컴포넌트를 관리하는 디렉토리  
  - `types/`: TypeScript 타입 정의 파일을 관리하는 디렉토리  
  - `utils/`: 공통으로 사용하는 유틸리티 함수들을 관리하는 디렉토리  
- `.env.local`: 환경 변수 설정 파일  
- `package.json`: 프로젝트의 의존성과 스크립트를 정의한 파일  
- `next.config.js`: Next.js 프로젝트 설정 파일  


## Trouble Shooting
### `<Image>` 사용법 오류
<details>
<summary>원인 분석 및 해결방안</summary>
<div markdown="1">

#### ⚙️ 문제 상황 및 원인 분석
HTML의 `<img>` 태그처럼 사용한 것이 원인으로 path 에러가 떴었다

#### 🚀 remotePatterns 설정해 주기
`next.config.mjs` 파일에서 `remote Pattern`을 지정해줌으로써 ddragon에서 받아오는 이미지 경로를 모두 허용으로 지정해주었다.

<br>
</div>
</details>

**블로그 포스팅** : [[Next.js] Image 태그 오류 TroubleShooting](https://velog.io/@chay140/Next.js-Image-오류)



## 개발 기간
* 2024.12.12 (목) ~ 2024.12.19 (목)

## 기술 스택
### Language
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)


### Framework
![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white)


### Library
![react-query](https://img.shields.io/badge/React_Query-555555?style=for-the-badge&logo=react&logoColor=61DAFB)
![tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

