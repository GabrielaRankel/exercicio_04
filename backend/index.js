const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const authMiddleware = require('./middleware/auth.miiddleware.js')
const clienteController = require('./controller/cliente.controller.js')
const veiculoController = require('./controller/veiculo.controller.js')
const agendamentoController = require('./controller/agendamento.controller.js')
const authController = require('./controller/auth.controller.js')

const hostname = 'localhost'
const PORT = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/cliente', clienteController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req,res)=>{
    res.status(200).json({message: 'Aplicação rodando!!'})
})

// Middleware de Autenticação para proteger as rotas abaixo
app.use(authMiddleware)

// Rotas privadas do Cliente (CRUD Completo)
app.get('/clientes', clienteController.listar)
app.get('/cliente/buscarNome/:nome', clienteController.consultarPorNome)
app.get('/cliente/:id', clienteController.consultarPorId)
app.put('/cliente/:id', clienteController.atualizar)
app.delete('/cliente/:id', clienteController.excluir)

// Rotas privadas do Cliente (CRUD Completo)
app.post('/veiculo', veiculoController.cadastrar)
app.get('/veiculos', veiculoController.listar)
app.get('/veiculo/buscarNome/:nome', veiculoController.consultarPorNome)
app.get('/veiculo/:id', veiculoController.consultarPorId)
app.put('/veiculo/:id', veiculoController.atualizar)
app.delete('/veiculo/:id', veiculoController.excluir)


// Rotas privadas de Agendamento
app.post('/agendamento', agendamentoController.cadastrar)
app.put('/agendamento/:id', agendamentoController.atualizar)
app.get('/agendamentos', agendamentoController.listarAgenda)




conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Erro de conexão no bamco de dados!', err)
})