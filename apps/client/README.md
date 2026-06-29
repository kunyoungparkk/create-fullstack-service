# Client

Next.js (App Router) 기반 클라이언트다. 상세 기술 스택과 규칙은 `CLAUDE.md`와 루트 `.claude/rules`를 참고한다.

## 개발

```shell
pnpm --filter client dev
```

개발 서버는 기본 포트 `3000`에서 실행된다. API 서버(`apps/server`)는 `4000`을 사용한다.

## 환경 변수

`.env.template`을 참고해 `.env`를 설정한다. `NEXT_PUBLIC_API_BASE_URL`은 서버 API의 베이스 URL이다.

## 명령어

```shell
pnpm --filter client lint
pnpm --filter client type-check
pnpm --filter client build
pnpm --filter client test
```
