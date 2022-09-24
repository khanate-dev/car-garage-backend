# Car Garage Rest API

Testing out patterns and experimenting with ideas

## Stack

- Typescript
- Express
- Mongo with Mongoose
- Zod
- Pino
- pnpm for package management

---

## Scripts

Start in Development mode: `pnpm dev`

Build: `pnpm build`

Start in Production mode : `pnpm start`

Lint the code: `pnpm lint`

Run tests: `pnpm test`

---

## Environment Variables

Environment variables are securely stored with dotenv-vault.

Environment example format: [![fork with dotenv-vault](https://badge.dotenv.org/fork.svg?r=1)](https://vault.dotenv.org/project/vlt_ae7d21e19c70297a28e4913d26f52df678ca5917141844f8e861571ef8998303/example)

Login to dotenv-vault: `pnpm env:login`

Open dotenv-vault: `pnpm env:open`

Pull environment from dotenv-vault: `pnpm env:pull`

Push environment to dotenv-vault: `pnpm env:push`
