const express = require("express");
//const User = require("../models/User");
const Election = require ("../models/Election")
const Cookies = require('js-cookie')
const jwt = require("jsonwebtoken");
const User = require('../models/User')

const bcrypt = require('bcrypt')


//register seller
const electioncreation= async (req, res) => {
    // Helper function to generate a random 7-letter alphanumeric word
   const  User = req.user
    console.log('user',User)
    try {
     
    
     
  
      const election = new Election({
        ...req.body,
        createdby: User.id,
      });

      // Save the user to the database
      await election.save();
  
      console.log('Election created');
     
      res.status(201).send({ election});
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };



const electionlist = async(req,res)=>{
    const User = req.user
    const Userid = User.id
    try {
        const elections= await Election.find({ createdby: Userid})
       // console.log('elections',elections)
        res.send({elections});
    } catch (error) {
        
    }
}

const voterelectionlist =  async(req,res)=>{
  const User = req.user
 // console.log('user',User)
  const voterId = User.voterID
 // console.log(voterId)
  try {
    const elections = await Election.find({
      voters: {
        $elemMatch: {
          $eq: voterId,
        },
      },
    });
      console.log('elections',elections)
      res.send({elections});
  } catch (error) {
      
  }
}

const electiondata = async(req,res)=>{
  try {
    // Find the election by ID
    const { electionId } = req.params;
   
    const election = await Election.findById(electionId);


    if (!election) {
      throw new Error('Election not found');
    }

    // Get the number of voters and candidates
    const numVoters = election.voters.length;
    const numCandidates = election.candidates.length;
    let  Numbers = [numVoters,numCandidates]
   
    // Return the results
    res.send(Numbers);
  } catch (error) {
    console.error('Error getting election stats:', error.message);
    throw error;
  }
}

const getAgestats = async (req, res) => {
  const { electionId } = req.params;

  try {
    // Find the election by ID
    const election = await Election.findById(electionId);

    if (!election) {
      return res.status(404).send({ error: 'Election not found' });
    }

    // Get the array of voter IDs from the election
    const voterIds = election.voters;

    // Find users with matching voter IDs and project the 'age' field
    const users = await User.find({ voterID: { $in: voterIds } }, { _id: 0, voterID: 1, age: 1 });

    // Print debug information
  

    // Generate an object containing the ages and their frequency
    const ageStats = users.reduce((acc, user) => {
    
      const age = user && user.age !== undefined ? user.age.toString() : 'Unknown';
      acc[age] = (acc[age] || 0) + 1;
      return acc;
    }, {});

    // Convert the object to an array of objects
    const result = Object.entries(ageStats).map(([age, count]) => ({
      age: age === 'Unknown' ? undefined : parseInt(age),
      count,
    }));

    console.log('Age Stats:', result);

    res.send(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

    











module.exports = {electioncreation,electionlist , voterelectionlist, electiondata , getAgestats}