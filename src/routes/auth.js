const express = require('express');
const db = require('../db'); // Importe o módulo db
const bcrypt = require('bcrypt');

const router = express.Router();

const verifyUser = async (email, senha) => {
    const result = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);

    if (result.rows.length === 0) {
        return null;
    }

    const usuario = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    return senhaCorreta ? usuario : null;
};

const userExists = async (email) => {
    const result = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);
    return result.rows.length > 0;
};

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await verifyUser(email, senha);

    if (usuario) {
        res.json({ mensagem: 'Login bem-sucedido', usuario });
    } else {
        res.status(404).json({ mensagem: 'Email ou senha incorretos' });
    }
});


router.post('/signin', async (req, res) => {
    const { email, senha } = req.body;

    if (await userExists(email)) {
        return res.status(400).json({ mensagem: 'Usuário já registrado com esse email' });
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    try {
        const result = await db.query('INSERT INTO usuario (email, senha) VALUES ($1, $2) RETURNING *', [email, hashedSenha]);

        res.json({ mensagem: 'Usuário registrado com sucesso', usuario: result.rows[0] });
    } catch (error) {
        console.error('Erro ao registrar usuário no banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
});


module.exports = router;