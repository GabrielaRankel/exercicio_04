const conn = require('./db/conn')
const { Cliente, Veiculo, Agendamento } = require('./models/rel')

async function syncDataBase() {
    try {
        await conn.sync({ force: true })
        console.log('Sincronizando')
    } catch (err) {
        console.error('Erro ao sincronizar a tabela')
    } finally {
        await conn.close()
        console.log('Fechando a conexão')
    }
}
syncDataBase()
