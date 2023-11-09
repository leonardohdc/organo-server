const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');

const uri = "mongodb+srv://leonardohcamargo10:V5GnG29t8bILFRPd@cluster0.rdmel4h.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const express = require('express');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.get('/colaboradores', async (req, res) => {
    try {
        // Conectar ao MongoDB
        await client.connect();
        // Send a ping to confirm a successful connection

        const db = client.db();
        const collection = db.collection('colaboradores');

        // Realizar uma consulta no MongoDB (exemplo: encontrar todos os documentos)
        const colaboradores = await collection.find({}).toArray();

        // Fechar a conexão com o MongoDB
        await client.close();

        // Enviar a resposta com os dados da consulta
        res.json(colaboradores);
    } catch (error) {
        console.error('Erro ao consultar o MongoDB:', error);
        res.status(500).json({ error: 'Erro ao consultar o MongoDB' });
    }
});

app.post('/adicionar', async (req, res) => {
    try {
        // Conectar ao MongoDB
        await client.connect();
        // Send a ping to confirm a successful connection

        const db = client.db();
        const collection = db.collection('colaboradores');

        const novoColaborador = req.body;

        // Documento que você deseja inserir
        const novoUsuario = {
            nome: novoColaborador.nome,
            cargo: novoColaborador.cargo,
            imagem: novoColaborador.imagem,
            time: novoColaborador.time
        };

        console.log(novoUsuario)

        // Insere o novo usuário na coleção
        const resultado = await collection.insertOne(novoUsuario);

        // Envie uma resposta de volta
        res.json({ mensagem: 'Objeto recebido com sucesso!' });
    } catch (error) {
        console.error('Erro ao consultar o MongoDB:', error);
        res.status(500).json({ error: 'Erro ao consultar o MongoDB' });
    }
});

const porta = 3001;

app.listen(porta, () => {
    console.log(`O servidor está ouvindo na porta ${porta}`);
});