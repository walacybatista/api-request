import * as express from 'express';
import { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json('Minha primeira rota');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor está executando na porta ${PORT}`);
});