const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())


/*
        - Query params=> muesite.com/users?name=tiago&age=40 = // FILTROS
        - Route params=> /users/2   //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
        - Request Body=>{"name":"Tiago","age:"40}

        -GET        => Buscar informação com back-end
        -POST       => Criar informação no back-end
        PUT/PATCH   =>Autera/Atualiza
        DELETE
*/


const users = []
const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }
    request.userIndex = index
    request.userId = id
    next()

}

app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body


    const user = { id: uuid.v4(), name, age, }

    users.push(user)

    return response.status(201).json(users)
})

app.put('/users/:id', checkUserId, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = { id, name, age }

    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
   

    users.splice(index, 1)

    return response.status(204).json(users)
})




app.listen(3000, () => {
    console.log(`🚀 Server started on port ${port} 🚀`)
})

