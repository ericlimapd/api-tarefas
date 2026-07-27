# api-tarefas

API de Gerenciamento de Tarefas (To-Do List), construída com **Node.js**, **Express** e **TypeScript**, seguindo o padrão **MVC** (Routes → Controllers → Services).

Projeto da Semana 7 da trilha de back-end da iJunior.

## Tecnologias

- Node.js
- Express
- TypeScript
- ts-node-dev (hot reload em desenvolvimento)

## Como rodar

```bash
npm install
npm run dev
```

O servidor sobe em `http://localhost:3333`.

> **Armazenamento:** as tarefas ficam guardadas em um array em memória (dentro do `TarefaService`). Isso significa que, ao reiniciar o servidor, todos os dados são perdidos — comportamento esperado nesta etapa do projeto (o banco de dados entra na Semana 8).

## Estrutura do projeto

```
src/
  server.ts                    # sobe o Express e conecta as rotas
  models/
    Tarefa.ts                  # entidade Tarefa (id, title, completed)
  services/
    TarefaService.ts           # lógica de negócio + array em memória
  controllers/
    TarefaController.ts        # lida com req/res e chama o Service
  routes/
    tarefa.routes.ts           # mapeia os endpoints para o Controller
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
  "id": "0.31130138821676034",
  "title": "Estudar",
  "completed": false
}
```

## Filtro por status (`completed`)

O endpoint `GET /tasks` aceita um filtro opcional via **query string**, usando o parâmetro `completed`:

- `GET /tasks` → retorna todas as tarefas, sem filtro.
- `GET /tasks?completed=true` → retorna apenas as tarefas **concluídas**.
- `GET /tasks?completed=false` → retorna apenas as tarefas **não concluídas**.

### Como testar

1. Suba o servidor com `npm run dev`.
2. Crie duas tarefas com `POST /tasks`.
3. Marque uma delas como concluída com `PUT /tasks/:id` enviando `{ "completed": true }`.
4. Compare os resultados:
   - `GET http://localhost:3333/tasks` → devolve as duas.
   - `GET http://localhost:3333/tasks?completed=true` → devolve só a que você marcou.
   - `GET http://localhost:3333/tasks?completed=false` → devolve só a outra.

No Postman, isso é feito adicionando `completed` como parâmetro na aba **Params** da requisição `GET /tasks` — o Postman monta a URL com `?completed=...` automaticamente.

## Testando a API

Uma Collection do Postman com as 5 requisições (e o filtro por `completed`) foi exportada e enviada junto com a entrega, contendo exemplos prontos de cada endpoint.
