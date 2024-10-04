const express = require("express");

const User = require("../models/User");
const Election = require("../models/Election");

const addCandidate = async (req, res, next) => {
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
        if (election.candidates.includes(voterID)) {
            return res.status(400).json({ message: 'Voter already exists for this election' });
        }

        // Add the voterId to the candidates array
        election.candidates.push(voterID);
        console.log('successfully updated')

        // Save the updated election with the new voterId in the voters array
        await election.save();

   

        res.status(201);
    } catch (error) {
        next(error);
    }
};


const deletecandidate = async (req,res,next) =>{
  try {
      const {electionId} = req.params
      const {candidateId} = req.body
    // Update the election by pulling the candidateId from the candidates array
    const result = await Election.updateOne(
    
      { _id: electionId },
      { $pull: { candidates: candidateId } }
    );

    if (result.nModified === 0) {
      throw new Error('Candidate not found or election not updated');
    }
    
    console.log('Candidate deleted successfully');
    
  } catch (error) {
    console.error('Error deleting candidate:', error.message);
    throw error;
  }
}



const getcandidateInfo = async (req,res,next) => {
    try {
        const {electionId} = req.params
      
        const election = await Election.findById(electionId);
  
      if (!election) {
        return res.status(404).send('Election not found'); // Election not found
      }
  
      // Step 2: Extract Candidate IDs
      const candidateIds = election.candidates;
  
      // Step 3: Retrieve User Details for Each Candidate
      const candidatesDetails = await Promise.all(
        candidateIds.map(async (candidateId) => {
          const user = await User.findOne({ voterID: candidateId });
  
          if (!user) {
            return null; // User not found
          }
  
          // Extract the details of the candidate excluding sensitive information
          const candidateDetails = {
            name: user.name,
            voterID: user.voterID,
            // Add other user details you want to include
          };
  
          return candidateDetails;
        })
      );
  
      const filteredCandidatesDetails = candidatesDetails.filter(Boolean); // Remove null values (users not found)
  
      if (filteredCandidatesDetails.length > 0) {
        console.log('ff',filteredCandidatesDetails)
        res.status(200).send(filteredCandidatesDetails);
      } else {
        res.status(404).send('No candidates found for the specified election.');
      }
    } catch (error) {
      console.error('Error retrieving candidates details for the election:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
module.exports = { addCandidate, getcandidateInfo ,deletecandidate};
