const express = require("express");

const User = require("../models/User");
const Election = require("../models/Election");

const addVoter = async (req, res, next) => {
    try {
        const { electionId } = req.params;
        const { name, voterID } = req.body;

        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ message: 'Election not found' });
        }

        const user = await User.findOne({ voterID });

        if (!user || (user.name !== name || user.voterID !== voterID)) {
            return res.status(400).json({ message: 'Invalid name or voterID for the user' });
        }

        // Check if the voterId is already present in the voters array
        if (election.voters.includes(voterID)) {
            return res.status(400).json({ message: 'Voter already exists for this election' });
        }

        // Add the voterId to the voters array
        election.voters.push(voterID);

        // Save the updated election with the new voterId in the voters array
        await election.save();

   

        res.status(201);
    } catch (error) {
        next(error);
    }
};


const getVoterInfo = async (req,res,next) => {
    try {
      // Find the election by ID
      const {electionId} = req.params
      
      const election = await Election.findById(electionId);

      if (!election) {
        return res.status(404).send('Election not found'); // Election not found
      }
  
      // Step 2: Extract Voter IDs
      const voterIds = election.voters;
  
      // Step 3: Retrieve User Details for Each Voter
      const votersDetails = await Promise.all(
        voterIds.map(async (voterId) => {
          const user = await User.findOne({ voterID: voterId });
  
          if (!user) {
            return null; // User not found
          }
  
          // Extract the details of the voter excluding sensitive information
          const voterDetails = {
            name: user.name,
            voterID: user.voterID,
            // Add other user details you want to include
          };
  
          return voterDetails;
        })
      );
  
      const filteredVotersDetails = votersDetails.filter(Boolean); // Remove null values (users not found)
  
      if (filteredVotersDetails.length > 0) {
        console.log('ff',filteredVotersDetails)
        res.status(200).send(filteredVotersDetails);
      } else {
        res.status(404).send('No voters found for the specified election.');
      }
    } catch (error) {
      console.error('Error retrieving voter details for the election:', error);
      throw error;
    }
  };


  const deletevoter = async (req,res,next) =>{
    try {
        const {electionId} = req.params
        const {voterId} = req.body
      // Update the election by pulling the candidateId from the candidates array
      const result = await Election.updateOne(
      
        { _id: electionId },
        { $pull: { voters: voterId } }
      );
  
      if (result.nModified === 0) {
        throw new Error('Voter not found or election not updated');
      }
      
      console.log('Voter deleted successfully');
      
    } catch (error) {
      console.error('Error deleting candidate:', error.message);
      throw error;
    }
  }
  
  

module.exports = { addVoter , getVoterInfo , deletevoter};
