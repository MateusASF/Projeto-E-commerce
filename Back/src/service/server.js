const express = require('express');
const cors = require('cors');
const router = require('../service/routes').router;

const app = express();

app.use(cors()); // Adicione esta linha para habilitar o CORS
app.use(express.json());
app.use(router);

app.listen(3009, () => console.log('servidor do Rodriguino porta 3009'));