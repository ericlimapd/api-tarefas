import { Request, Response } from 'express';
import { TarefaService } from '../services/TarefaService';

const service = new TarefaService();

class TarefaController {
  // Endpoint 1: criar nova tarefa
  create(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const tarefa = service.create({ title });
      return res.status(201).json(tarefa);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao criar tarefa';
      return res.status(400).json({ erro: mensagem });
    }
  }

  // Endpoint 2: listar todas as tarefas salvas
  list(req: Request, res: Response) {
    const tarefas = service.list();
    return res.status(200).json(tarefas);
  }

  // Endpoint 3: buscar tarefa específica por ID
  findById(req: Request, res: Response) {
    const id = req.params.id as string;
    const tarefa = service.findById(id);

    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    return res.status(200).json(tarefa);
  }

  // Endpoint 4: atualizar uma tarefa existente
  update(req: Request, res: Response) {
    const id = req.params.id as string;
    const { title, completed } = req.body;
    const tarefa = service.update(id, { title, completed });

    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    return res.status(200).json(tarefa);
  }

  // Endpoint 5 apagar uma tarefa
  delete(req: Request, res: Response) {
    const id = req.params.id as string;
    const removida = service.delete(id);

    if (!removida) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    return res.status(204).send();
  }
}

export { TarefaController };
