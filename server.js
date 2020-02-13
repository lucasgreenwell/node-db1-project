const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db.select('*').from('accounts')
        .then(accounts => {
            console.log(accounts)
            res.status(200).json(accounts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'there was an error'})
        })
})

server.post('/api/accounts', (req, res) => {
   db('accounts').insert(req.body)
    .then(id => {
        console.log('we did it i think, try getting again')
        res.status(201).json({message: 'account created successfully'})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'there was an error'})
    })
})

server.put('/api/accounts/:id', (req, res) => {
    if(!req.body.name || !req.body.budget){
        res.status(400).json({err: 'please include all necessary fields for your request'})
    }else {
        db('accounts').where({ id: req.params.id })
        .update({name: req.body.name, budget: req.body.budget})
         .then(num => {
             if (num > 0){
                 res.status(200).json({message:'good job'})
             }
         })
         .catch(err => {
             console.log(err)
             res.status(500).json({message: 'there was an error'})
         })
    }
 })

 server.delete('/api/accounts/:id', (req, res) => {
     db('accounts').where({id: req.params.id}).del()
        .then(num => {
            res.status(200).json({message: 'good job'})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'there was an error'})
        })
 })

module.exports = server;