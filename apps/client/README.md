# Client

Next.js (App Router) 기반 클라이언트다. 상세 기술 스택과 규칙은 `CLAUDE.md`와 루트 `.claude/rules`를 참고한다.

## 개발

```shell
pnpm --filter client dev
```

개발 서버는 `3001` 포트에서 실행된다. 서버(`apps/server`)가 `3000`을 사용하므로 충돌을 피한다.

## 환경 변수

`.env.template`을 참고해 `.env`를 설정한다. `NEXT_PUBLIC_API_BASE_URL`은 서버 API의 베이스 URL이다.

## 명령어

```shell
pnpm --filter client lint
pnpm --filter client type-check
pnpm --filter client build
pnpm --filter client test
```
