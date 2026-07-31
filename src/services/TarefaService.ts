import { Tarefa } from '../models/Tarefa';

// Na S7, guardamos em memória. Na S8, trocamos isso pelo Prisma.
const tarefas: Tarefa[] = [];

interface ICriarTarefa {
  title: string;
}

class TarefaService {

  // Endpoint 1: criar nova tarefa
  create({ title }: ICriarTarefa): Tarefa {
    // --- AQUI MORA A LÓGICA DE NEGÓCIO ---
    if (!title) {
      throw new Error('O título da tarefa é obrigatório');
    }

    const novaTarefa: Tarefa = {
      id: Math.random().toString(),
      title,
      completed: false,
    };

    tarefas.push(novaTarefa);
    return novaTarefa;
  }

  // Endpoint 2: listar todas as tarefas salvas (com filtro por completed)
  list(completed?: boolean): Tarefa[] {
    if (completed === undefined) {
      return tarefas;
    }

    return tarefas.filter((tarefa) => tarefa.completed === completed);
  }

  // Endpoint 3: buscar tarefa específica por ID
  findById(id: string): Tarefa | undefined {
    return tarefas.find((tarefa) => tarefa.id === id);
  }

  // Endpoint 4: atualizar uma tarefa existente
  update(id: string, dados: { title?: string; completed?: boolean }): Tarefa | undefined {
    const tarefa = this.findById(id);

    if (!tarefa) {
      return undefined;
    }

    if (dados.title !== undefined) {
      tarefa.title = dados.title;
    }

    if (dados.completed !== undefined) {
      tarefa.completed = dados.completed;
    }

    return tarefa;
  }

  // Endpoint 5 apagar uma tarefa
  delete(id: string): boolean {
    const index = tarefas.findIndex((tarefa) => tarefa.id === id);

    if (index === -1) {
      return false;
    }

    tarefas.splice(index, 1);
    return true;
  }
}

export { TarefaService };
