# 🛍️ 타임딜 플랫폼

가상화 경험이 없어 간단히 학습을 위한 프로젝트입니다.

## ⚙️ 환경 설정

프로젝트 실행 전 네이버 쇼핑 API 키 설정이 필요합니다.

1. [네이버 개발자 센터](https://developers.naver.com/docs/serviceapi/search/shopping/shopping.md)에서 API 키 발급
2. 프로젝트 루트에 `.env` 파일 생성
3. 아래 내용을 `.env` 파일에 추가:

```bash
VITE_NAVER_CLIENT_ID=your_client_id_here
VITE_NAVER_CLIENT_SECRET=your_client_secret_here
```

⚠️ **주의사항**

- `.env` 파일은 절대 깃허브에 커밋하지 마세요
- API 키는 외부에 노출되지 않도록 주의하세요
- `.env.example` 파일을 참고하여 설정하세요

## 🚀 프로젝트 실행방법

```bash
# 패키지 설치
yarn install

# 환경변수 설정
cp .env.example .env   # .env.example을 복사하여 .env 생성
# .env 파일에 발급받은 네이버 API 키 입력

# 개발 서버 실행
yarn dev
```

## ✨ 주요 기능

- 🔄 타임딜
- ♾️ 가상화 및 무한 스크롤
- 🎯 가로 및 세로 레이아웃, 프로그레스
- 🎨 모듈화된 컴포넌트 설계

## 🛠️ 기술 스택

- React 18
- TypeScript
- TailwindCSS
- React Query
- React Virtualized

## 🌟 기술적 특징

- 합성 컴포넌트 패턴
- 가상화 기반 리스트
