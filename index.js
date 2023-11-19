const authRoutes = require('./src/routes/auth');
const pacienteRoutes = require('./src/routes/paciente');


const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/paciente', pacienteRoutes);

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});