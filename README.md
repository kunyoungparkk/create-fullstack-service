# 🚀 Create Fullstack Service

## 서비스 생성

```shell
pnpx degit github:kunyoungparkk/create-fullstack-service
```

## 🚀 시작하기

원활한 개발을 위해 아래 순서대로 환경을 설정하고 실행해 주세요.

### 1. Node.js 설치

`.nvmrc`에 정의된 버전(24)의 Node.js를 설치합니다. nvm을 사용한다면 아래와 같이 설치합니다.

```shell
nvm install
```

### 2. pnpm 활성화

`package.json`의 `packageManager`에 정의된 버전의 pnpm을 사용합니다.

```shell
corepack enable
```

### 3. 인프라

인프라 실행 및 종료할 때 `--env-file`의 파일 이름으로 환경을 선택할 수 있습니다.

#### 3-1. 인프라 실행

```shell
docker compose --env-file apps/server/.env.development up --detach
```

#### 3-2. 인프라 종료

`--volumes`를 붙이면 DB 데이터까지 삭제됩니다.

```shell
docker compose --env-file apps/server/.env.development down --volumes
```

### 4. 의존성 설치

```shell
pnpm install
```

### 5. 환경 변수 설정

`.env.template`을 참고하여 환경 변수를 설정하세요.

### 6. 테스트 실행

테스트는 `NODE_ENV`가 `test`인 환경에서 실행되어야 합니다.

```shell
pnpm test
```

### 7. 개발 환경 실행

개발은 `NODE_ENV`가 `development`인 환경에서 실행되어야 합니다.

```shell
pnpm dev
```
