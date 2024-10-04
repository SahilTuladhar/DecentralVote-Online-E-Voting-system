const express = require('express')
const app = express()
const auth = require('../controllers/auth-controller')
const controls = require( '../controllers/election-controller')
const Electionrouter = express.Router()

Electionrouter.post('/createelection',auth, controls.electioncreation)
Electionrouter.get('/electionlist',auth,controls.electionlist)
Electionrouter.get('/getvoterselection',auth,controls.voterelectionlist)
Electionrouter.get('/electiondata/:electionId',auth,controls.electiondata)
Electionrouter.get('/getagestat/:electionId',auth ,controls.getAgestats)
module.exports = Electionrouter; 