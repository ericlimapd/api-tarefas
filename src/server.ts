import { app } from './config/expressConfig';

const PORTA = 3333;

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});
