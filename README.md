## 폴더 구조

- pages
Next.js 처럼 page routing이 적용되어 있어서 각 페이지별 {folder_name}/index.tsx가 해당하는 메인 page가 됨
[...all.tsx]는 에러 처리를 위한 tsx
landing page는 index.tsx
ref는 기본 템플릿 제공 파일들로 참고용

- components
components/ui : shadcn UI용 폴더
components/{page_name} : 해당 페이지에서 사용되는 컴포넌트
components/common : 전역 컴포넌트

- lib
아직 추가한 내용 X
utils.ts : shadcn UI사용

- query
아직 추가한 내용 X
api.ts, index.ts : 기본 템플릿 제공 파일들

- store
아직 추가한 내용 X
bear.ts, fish.ts : 기본 템플릿 제공 파일들