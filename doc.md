# Inicializa o package.json
npm init -y

# Instala o Typescript, ts-node-dev para fazer reload, tipagem, e os paths
npm i -D typescript ts-node-dev @types/node tsconfig-paths

# Cria o tsconfig.json (Com algumas config setadas)
npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

# Script no package.json para rodar automaticamente os reloads dos arquivos.
"dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts"

# ESLint
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Prettier
npm i -D prettier
npm i -D eslint-config-prettier@6.15.0 eslint-plugin-prettier@3.2.0

# Modules
npm i express cors express-async-errors
npm i -D @types/express @types/cors
npm i typeorm reflect-metadata pg
npm i celebrate
npm i -D @types/joi
yarn add bcryptjs
yarn add -D @types/bcryptjs
npm i jsonwebtoken
npm i -D @types/jsonwebtoken
yarn add multer | Biblioteca para uploads
yarn add -D @types/multer 
yarn add date-fns
yarn add nodemailer
yarn add -D @types/nodemailer
yarn add handlebars

# Pra criar o Docker
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

## Migrations
# Criar uma migração
yarn typeorm migration:create -n CreateProducts
yarn typeorm migration:create -n CreateUsers
yarn typeorm migration:create -n CreateUserTokens

# Rodar as migrações
yarn typeorm migration:run


# Tipo do token decodificado
{
  iat: 1672172462,
  exp: 1672258862,
  sub: '98859e19-4133-4e98-a327-99293868f051'
}

# Para incluir definições de tipos (no tsconfig.json)
"typeRoots": [
    "@types",
    "./node_modules/@types"
],
