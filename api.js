const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

var groups = [] //simulando o banco de dados
var vusers = []

/** VAI IR PARA O CONTROLADOR */

function create_grup(name, key, order, group_parent){
    const group = {
        "name": name,
        "key":key,
        "order":order,
        "group_parent":group_parent
    }
    groups.push(group)
    return group
}

function create_user(name, pass){
    let id = 0
    if(vusers.length > 0) {
        id = vusers[vusers.length-1].id + 1
    }

    const user = {
        "id": id,
        "name": name,
        "pass": pass
    }
    vusers.push(user)
    return user
}

function update_user(id, name, pass){
    let idx = vusers.findIndex(user => user.id === id)

    if(idx == -1){
        return {status: 404, msg: "Não encontrado"}
    }

    if(name) vusers[idx].name = name
    if(pass) vusers[idx].pass = pass

    return {status: 200, msg: vusers[idx]}
}

function delete_user(id){
    let idx = vusers.findIndex(user => user.id === id)
    if(idx == -1){
        return false
    }

    vusers.splice(idx, 1)
    return true
}

/** VAI IR PARA O ROUTES */

app.post("/group", (req, res) => {
    const {name, key, order, group_parent} = req.body

    if(!name || !key){
        return res.status(400).json({ 
            message: 'Os campos name e key são obrigatórios, os campos order e group_parent são opcionais'
        })
    }

    const group = create_grup(name, key, order, group_parent)

    return res.status(200).json({ 
        message: 'Sucesso', group_created: group
    })
})


app.post("/user", (req, res) => {
    const {name, pass} = req.body

    if(!name || !pass){
        return res.status(400).json({ 
            message: 'Os campos name e pass são obrigatórios'
        })
    }

    const ouser = create_user(name, pass)

    return res.status(200).json({ 
        message: 'Sucesso', user_created: ouser
    })
})


app.get("/user",(req, res) =>{
    return res.status(200).json({
        message: 'Sucesso', list_users: vusers
    })
})

app.put("/user/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const {name, pass} = req.body

    let retorno = update_user(id, name, pass)
    return res.status(retorno.status).json(retorno.msg)
})

app.delete("/user/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    if(delete_user(id)){
        return res.status(201).json("Foi de base")
    }else{
        return res.status(404).json("Não encontrado")
    }
})

/** NÃO COLOCAR NADA DAQUI PRA BAIXO */

app.listen(port, () => {
    console.log(`Run: http://localhost:${port}`);
})

















