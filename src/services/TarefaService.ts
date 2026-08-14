import { prisma } from '../config/prismaClient';
import { Prisma } from '../../generated/prisma/client';

interface IAtualizarTarefa {
  title?: string;
  completed?: boolean;
}

class TarefaService {
  // Cria uma nova tarefa
  async create(title: string) {
    // --- AQUI MORA A LÓGICA DE NEGÓCIO ---
    if (!title) {
      throw new Error('O título da tarefa é obrigatório');
    }

    return prisma.task.create({
      data: { title },
    });
  }

  // Lista todas as tarefas (com filtro opcional por completed)
  async getAll(completed?: boolean) {
    if (completed === undefined) {
      return prisma.task.findMany();
    }

    return prisma.task.findMany({ where: { completed } });
  }

  // Busca uma tarefa específica pelo id
  async getById(id: number) {
    return prisma.task.findUnique({ where: { id } });
  }

  // Atualiza uma tarefa existente
  async update(id: number, dados: IAtualizarTarefa) {
    try {
      return await prisma.task.update({
        where: { id },
        data: dados,
      });
    } catch (error) {
      // Código P2025 = "Registro não encontrado para a operação"
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new Error('Tarefa não encontrada.');
      }
      throw error; // re-lança outros erros desconhecidos
    }
  }

  // Remove uma tarefa
  async delete(id: number): Promise<void> {
    try {
      await prisma.task.delete({ where: { id } });
    } catch (error) {
      // Código P2025 = "Registro não encontrado para a operação"
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new Error('Tarefa não encontrada.');
      }
      throw error; // re-lança outros erros desconhecidos
    }
  }
}

export { TarefaService };
