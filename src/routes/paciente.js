const express = require('express');
const db = require('../db');

const router = express.Router();

// Consulta de todos os pacientes de um usuário específico
router.get('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;

    try {
        const result = await db.query('SELECT * FROM paciente WHERE idUsuario = $1', [idUsuario]);
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao obter pacientes do banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Adição de um novo paciente para um usuário específico
router.post('/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;
    const { emoji, sexo, dataNascimento, nomeCompleto, anotacoesMedicas } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO paciente (idUsuario, emoji, sexo, dataNascimento, nomeCompleto, anotacoesMedicas) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [idUsuario, emoji, sexo, dataNascimento, nomeCompleto, anotacoesMedicas]
        );

        res.json({ mensagem: 'Paciente adicionado com sucesso', paciente: result.rows[0] });
    } catch (error) {
        console.error('Erro ao adicionar paciente no banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Atualização de informações de um paciente específico
router.put('/:idPaciente', async (req, res) => {
    const { idPaciente } = req.params;
    const { emoji, sexo, dataNascimento, nomeCompleto, anotacoesMedicas } = req.body;

    try {
        const result = await db.query(
            'UPDATE paciente SET emoji = $1, sexo = $2, dataNascimento = $3, nomeCompleto = $4, anotacoesMedicas = $5 WHERE idPaciente = $6 RETURNING *',
            [emoji, sexo, dataNascimento, nomeCompleto, anotacoesMedicas, idPaciente]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Paciente não encontrado para atualização' });
        }

        res.json({ mensagem: 'Paciente atualizado com sucesso', paciente: result.rows[0] });
    } catch (error) {
        console.error('Erro ao atualizar paciente no banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Exclusão de um paciente específico
router.delete('/:idPaciente', async (req, res) => {
    const { idPaciente } = req.params;

    try {
        const result = await db.query('DELETE FROM paciente WHERE idPaciente = $1 RETURNING *', [idPaciente]);

        if (result.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Paciente não encontrado para exclusão' });
        }

        res.json({ mensagem: 'Paciente excluído com sucesso', paciente: result.rows[0] });
    } catch (error) {
        console.error('Erro ao excluir paciente do banco de dados:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

module.exports = router;