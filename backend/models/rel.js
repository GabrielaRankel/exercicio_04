const Cliente = require('./Cliente')
const Veiculo = require('./Veiculo')
const Agendamento = require('./Agendamento')

Cliente.hasMany(Agendamento,{
    foreignKey: 'idCliente',
    as: 'movimentoCliente',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'clienteMovimento',
    allowNull: false
})

Veiculo.hasMany(Agendamento,{
    foreignKey: 'idVeiculo',
    as: 'movimentoVeiculo',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Veiculo,{
    foreignKey: 'idVeiculo',
    as: 'movimentoVeiculo',
    allowNull: false
})

module.exports = {Cliente, Veiculo, Agendamento}