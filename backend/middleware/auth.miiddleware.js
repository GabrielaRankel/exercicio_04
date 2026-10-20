const cryptoJs = require('crypto-js')
const { JSON } = require('sequelize')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req,res,next){
    const token = req.headers['autorization']

    if(!token){
        return res.status(401).json({message: 'Acesso negado! Faça o login!'})
    }

    try{
        const bytes = cryptoJs.AES.decrypt(token, CHAVE_SECRETA)
        const dadosdescriptografados = bytes.toString(cryptoJs.enc.Utf8)
       
        if(!dadosdescriptografados){
            return res.status(403).json({message: 'Acesso proibido'})
        }
      
        const payload = JSON.parse(dadosdescriptografados)

        if(Date.now() > payload.expiraEm){
            res.status(401).json({message: 'Sessão Expirada! Faça login novamente!'})
        }

    }catch(err){
        console.error('Falha na manutenção',err)
        return res.status(401).json({message: 'Falha na autentificação'})
    }
}

module.exports = authMiddleware