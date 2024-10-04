const express = require('express')
const app = express()
const auth = require('../controllers/auth-controller')
const controls = require( '../controllers/voter-controller')
const Voterrouter = express.Router()

Voterrouter.post('/addvoter/:electionId',controls.addVoter)
Voterrouter.get('/getvoter/:electionId',controls.getVoterInfo)
Voterrouter.patch('/deletevoter/:electionId',controls.deletevoter)
module.exports = Voterrouter; 