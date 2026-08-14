import express from 'express';
import { tarefaRoutes } from '../routes/tarefa.routes';

const app = express();
app.use(express.json());
app.use('/tasks', tarefaRoutes);

export { app };
