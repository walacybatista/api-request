import { Prisma, PrismaClient } from '@prisma/client';
import * as express from 'express';
import { Request, Response } from 'express';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json('Minha primeira rota');
});

app.post('/products', async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const produtos = await prisma.produtos.create({ data: { nome: name } });
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar produto.' });
    }
  });

app.delete('/products/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
      await prisma.produtos.delete({ where: { id: parseInt(id) } });
      return res.status(200).send();
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao excluir produto.' });
    }
  });

app.put('/products/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
      const UpdateProduto = await prisma.produtos.update({
        where: { id: parseInt(id) },
        data: { nome }
      });
      return res.status(200).json(UpdateProduto);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar produto.' });
    }
});

app.get('/products', async (req: Request, res: Response) => {
    try {
      const ReadProduto = await prisma.produtos.findMany();
      return res.status(200).json(ReadProduto);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar produtos.' });
    }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor está executando na porta ${PORT}`);
});