# 기술 스택

| 분류         | 기술                 |
| ------------ | -------------------- |
| Language     | TypeScript           |
| Framework    | Next.js (App Router) |
| Rendering    | 하이브리드 SSR       |
| Remote State | TanStack Query       |
| HTTP         | axios                |
| Local State  | Zustand              |
| Styling      | Tailwind CSS         |
| i18n         | next-intl            |
| Test         | Jest                 |

## 렌더링

서버 컴포넌트에서 `prefetchQuery` 후 `dehydrate`한 상태를 `HydrationBoundary`로 내려보내고, 클라이언트 컴포넌트가 `useQuery`로 hydrate한다. 클라이언트는 `api`(axios, `withCredentials`)로 서버를 직접 호출하고, 인증이 필요한 서버 측 prefetch는 `next/headers`의 쿠키를 포워딩한다.

## 상태 관리

> 구현 패턴·쿼리 키 팩토리·커스텀 훅 작성법·무한 스크롤 등 상세는 **`state-management` 스킬**을 로드해 참고한다.
