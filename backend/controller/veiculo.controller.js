const Veiculo = require('../models/Veiculo')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body
    console.log(valores)

    if (!valores.idCliente || !valores.modelo || !valores.marca || !valores.placa,
        !valores.códigoRastreador) {
        return res.status(400).json({ message: 'Todos os campos são obrigatorios!' })
    }

    try {
        await Veiculo.create()
        req.status(201).json({ message: 'Veiculo Cadastrado com sucesso!' })
    }
    catch (err) {
        console.error('Erro ao cadastar o Veiculo!')
        res.status(500).json({ message: 'Erro ao cadastar o Veiculo!' })
    }
}
const listar = async (req, res) => {
    try {
        const veiculos = await Veiculo.findAll()
        return res.status(200).json(veiculos)
    } catch (err) {
        console.error('Não foi possível listar os Veiculo', err)
        res.status(500).json({ message: 'Não foi possível listar os Veiculo' })
    }
}

const consultarPorId = async (req, res) => {
    const id = req.params.id
    try {
        const veiculo = await Veiculo.findByPk(id)
        if (!veiculo) {
            return res.status(404).json({ message: 'Veiculo não encontrado!' })
        }
        return res.status(200).json(veiculo)
    } catch (err) {
        console.error('Erro ao consultar Veiculo:', err)
        return res.status(500).json({ message: 'Erro ao consultar Veiculo!' })
    }
}

const consultarPorNome = async (req, res) => {
    const id = req.params.nome
    try {
        const veiculo = await Veiculo.findOne({where: {nome: nome}})
        if (!veiculo) {
            return res.status(404).json({ message: 'Veiculo não encontrado!' })
        }
        return res.status(200).json(veiculo)
    } catch (err) {
        console.error('Erro ao consultar o Veiculo:', err)
        return res.status(500).json({ message: 'Erro ao consultar o Veiculo!' })
    }
}

const excluir = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Veiculo.findByPk(id)

        if (!dados) {
            res.status(400).json({ message: 'Veiculo não localizado no banco de dados!' })
        }
        else {
            await Veiculo.destroy({ where: { codVeiculo: id } })
            res.status(200).json({ message: 'Veiculo excluído com sucesso!' })
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao excluir os dados!' })
        console.error('Erro ao excluir os dados!')
    }
}
const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const veiculos = await Veiculo.findByPk(id)
        if (!veiculos) {
            return res.status(404).json({ message: 'Veiculo não encontrado!' })
        }

        const dadosAtualizados = {
            idCliente: veiculo.idCliente,
            modelo: veiculo.modelo,
            marca: veiculo.marca,
            placa: veiculo.placa,
            códigoRastreador: veiculo.códigoRastreador,
        }

        await Veiculo.update(dadosAtualizados, { where: { codVeiculo: id } })
        return res.status(200).json({ message: 'Veiculo atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar Veiculo:', err)
        return res.status(500).json({ message: 'Erro ao atualizar Veiculo!' })
    }
}
module.exports = { cadastrar, listar, consultarPorId, atualizar, excluir, consultarPorNome }