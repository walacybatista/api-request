import { Prisma, PrismaClient } from '@prisma/client';
import * as express from 'express';
import { Request, Response } from 'express';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json('Minha primeira rota');
});

// Rota para criar um novo produto
app.post('/products', async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const produtos = await prisma.produtos.create({ data: { nome: name } });
      return res.status(201).json(produtos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar produto.' });
    }
  });

// Rota para deletar um novo produto
app.delete('/products/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
      await prisma.produtos.delete({ where: { id: parseInt(id) } });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir produto.' });
    }
  });

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor está executando na porta ${PORT}`);
});