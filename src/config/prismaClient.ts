// src/config/prismaClient.ts
import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client'

// allowPublicKeyRetrieval: necessário porque o MySQL 8+ usa o plugin
// caching_sha2_password por padrão, e o driver mariadb precisa dessa
// permissão para negociar a autenticação sem TLS.
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  allowPublicKeyRetrieval: true,
})
export const prisma = new PrismaClient({ adapter })