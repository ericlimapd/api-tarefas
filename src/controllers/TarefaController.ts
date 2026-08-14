import { Request, Response } from 'express';
import { TarefaService } from '../services/TarefaService';

const service = new TarefaService();

class TarefaController {
  // Endpoint 1: criar nova tarefa
  async create(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const tarefa = await service.create(title);
      return res.status(201).json(tarefa);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao criar tarefa';
      return res.status(400).json({ erro: mensagem });
    }
  }

  // Endpoint 2: listar todas as tarefas salvas (aceita ?completed=true/false)
  async list(req: Request, res: Response) {
    try {
      const { completed } = req.query;
      const filtro = completed === undefined ? undefined : completed === 'true';
      const tarefas = await service.getAll(filtro);
      return res.status(200).json(tarefas);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao listar tarefas';
      return res.status(500).json({ erro: mensagem });
    }
  }

  // Endpoint 3: buscar tarefa específica por ID
  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const tarefa = await service.getById(id);

      if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
      }

      return res.status(200).json(tarefa);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao buscar tarefa';
      return res.status(500).json({ erro: mensagem });
    }
  }

  // Endpoint 4: atualizar uma tarefa existente
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { title, completed } = req.body;
      const tarefa = await service.update(id, { title, completed });
      return res.status(200).json(tarefa);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao atualizar tarefa';
      const status = mensagem === 'Tarefa não encontrada.' ? 404 : 400;
      return res.status(status).json({ erro: mensagem });
    }
  }

  // Endpoint 5: apagar uma tarefa
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await service.delete(id);
      return res.status(204).send();
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : 'Erro ao deletar tarefa';
      const status = mensagem === 'Tarefa não encontrada.' ? 404 : 400;
      return res.status(status).json({ erro: mensagem });
    }
  }
}

export { TarefaController };
