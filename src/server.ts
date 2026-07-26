import express from 'express';
import { tarefaRoutes } from './routes/tarefa.routes';

const app = express();
const PORTA = 3333;

// Middleware "tradutor" de JSON (CRUCIAL)
app.use(express.json());

// --- ROTAS ---
app.use('/tasks', tarefaRoutes);
// --- FIM DAS ROTAS ---

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});
