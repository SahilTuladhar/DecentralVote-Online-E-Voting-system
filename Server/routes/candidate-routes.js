const express = require('express')
const app = express()
const auth = require('../controllers/auth-controller')
const controls = require( '../controllers/candidate-controller')
const Candidaterouter = express.Router()

Candidaterouter.post('/addcandidate/:electionId',controls.addCandidate)
Candidaterouter.get('/getcandidate/:electionId',controls.getcandidateInfo)
Candidaterouter.patch('/deletecandidate/:electionId',controls.deletecandidate)

module.exports = Candidaterouter; 