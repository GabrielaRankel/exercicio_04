const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Agendamento = db.define('agendamento', {
    codAgendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    },
    idVeiculo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'veiculos',
            key: 'codVeiculo'
        }
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    horario: {
        type: DataTypes.TIME,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    serviço: {
        type: DataTypes.ENUM('revisão', 'manutenção', 'instalação'),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'agendamentos'
})

module.exports = Agendamento