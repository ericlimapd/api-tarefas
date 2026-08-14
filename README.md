# api-tarefas

API de Gerenciamento de Tarefas (To-Do List), construída com **Node.js**, **Express**, **TypeScript** e **Prisma** (MySQL), seguindo o padrão **MVC** (Routes → Controllers → Services).

Projeto das Semanas 7 e 8 da trilha de back-end da iJunior. Na Semana 7 os dados ficavam em memória; na Semana 8 passaram a ser persistidos num banco MySQL real via Prisma.

## Tecnologias

- Node.js
- Express
- TypeScript
- Prisma (ORM) + MySQL
- tsx (hot reload em desenvolvimento)

## Como rodar

### 1. Banco de dados

1. Tenha o MySQL instalado e rodando localmente.
2. Crie o banco:
   ```sql
   CREATE DATABASE bootcamp_tasks;
   ```

### 2. Variáveis de ambiente

Copie o `.env.example` para `.env` e preencha com as credenciais do seu MySQL:
```bash
cp .env.example .env
```

### 3. Instalar e preparar

```bash
npm install
npx prisma generate
npx prisma migrate dev
```
O `migrate dev` cria a tabela `Task` no banco (as migrations já commitadas em `prisma/migrations/` descrevem essa estrutura).

### 4. Rodar a API

```bash
npm run dev
```
O servidor sobe em `http://localhost:3333`.

### 5. (Opcional) Explorar o banco visualmente

```bash
npx prisma studio
```
Abre em `http://localhost:5555` — mostra a tabela `Task` e permite ver/editar os dados manualmente.

## Estrutura do projeto

```
prisma/
  schema.prisma               # define o model Task e a conexão com o banco
  migrations/                 # histórico versionado das mudanças no banco
src/
  server.ts                   # só sobe o servidor (app.listen)
  config/
    expressConfig.ts          # cria o app Express, aplica middlewares e rotas
    prismaClient.ts           # instância única (singleton) do PrismaClient
  services/
    TarefaService.ts          # lógica de negócio + acesso ao banco via Prisma
  controllers/
    TarefaController.ts       # lida com req/res e chama o Service
  routes/
    tarefa.routes.ts          # mapeia os endpoints para o Controller
```

## Endpoints

Todas as rotas têm o prefixo `/tasks`.

| Método | Rota | Descrição | Body | Sucesso | Erro |
|---|---|---|---|---|---|
| `POST` | `/tasks` | Cria uma nova tarefa | `{ "title": "string" }` | `201` + tarefa criada | `400` se `title` não for enviado |
| `GET` | `/tasks` | Lista todas as tarefas | — | `200` + array de tarefas | — |
| `GET` | `/tasks/:id` | Busca uma tarefa pelo id | — | `200` + tarefa | `404` se não existir |
| `PUT` | `/tasks/:id` | Atualiza uma tarefa | `{ "title"?: "string", "completed"?: boolean }` | `200` + tarefa atualizada | `404` se não existir |
| `DELETE` | `/tasks/:id` | Remove uma tarefa | — | `204` | `404` se não existir |

### Exemplo de tarefa

```json
{
  "id": 1,
  "title": "Estudar Prisma",
  "completed": false,
  "createdAt": "2026-08-03T02:33:41.794Z"
}
```

O `id` é um inteiro autoincrementado pelo próprio banco (`@default(autoincrement())` no `schema.prisma`) — não é mais gerado no código como na Semana 7.

## Filtro por status (`completed`)

O endpoint `GET /tasks` aceita um filtro opcional via **query string**, usando o parâmetro `completed`:

- `GET /tasks` → retorna todas as tarefas, sem filtro.
- `GET /tasks?completed=true` → retorna apenas as tarefas **concluídas**.
- `GET /tasks?completed=false` → retorna apenas as tarefas **não concluídas**.

No Postman, isso é feito adicionando `completed` como parâmetro na aba **Params** da requisição `GET /tasks`.

## Testando a API

Uma Collection do Postman com as 5 requisições (e o filtro por `completed`) foi exportada e enviada junto com a entrega, contendo exemplos prontos de cada endpoint.

## Troubleshooting

**Erro `pool timeout: failed to retrieve a connection from pool`**
Acontece porque o MySQL 8+ usa por padrão o plugin de autenticação `caching_sha2_password`, que o driver do Prisma (`@prisma/adapter-mariadb`) só negocia corretamente com a opção `allowPublicKeyRetrieval: true` — já configurada em `src/config/prismaClient.ts`. Se acontecer de novo em outra máquina, confira se essa opção está presente e se as variáveis `DATABASE_*` do `.env` estão corretas.
