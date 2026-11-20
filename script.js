// server.js
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

const ADMIN_CNPJ = process.env.ADMIN_CNPJ;

app.get('/api/licitacoes', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    res.json(data.licitacoes);
});

app.post('/api/login', (req, res) => {
    const { cnpj, senha } = req.body;
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    const user = data.usuarios.find(u => u.cnpj === cnpj && u.senha === senha);
    if (user) res.json({ success: true, isAdmin: user.cnpj === ADMIN_CNPJ });
    else res.status(401).json({ success: false });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));