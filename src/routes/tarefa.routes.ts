import { Router } from 'express';
import { TarefaController } from '../controllers/TarefaController';

const tarefaRoutes = Router();
const controller = new TarefaController();

tarefaRoutes.post('/', controller.create);
tarefaRoutes.get('/', controller.list);
tarefaRoutes.get('/:id', controller.findById);
tarefaRoutes.put('/:id', controller.update);
tarefaRoutes.delete('/:id', controller.delete);

export { tarefaRoutes };
