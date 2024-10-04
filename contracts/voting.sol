// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    struct CandidateInfo {
        string candidateId;
        uint votes;
    }

    mapping(string => mapping(string => bool)) public hasVoted;  // Mapping from electionID to voterID to voting status
    mapping(string => mapping(string => uint)) public candidateVotes;  // Mapping from electionID to candidateID to votes
    mapping(string => bool) public electionEnded;  // Mapping from electionID to election end status

    event VoteCasted(string indexed electionID, string indexed voterID, string indexed candidateId);
    event ElectionEnded(string indexed electionID);

    modifier hasNotVoted(string memory _electionID, string memory _voterID) {
        require(!hasVoted[_electionID][_voterID], "Voter has already voted in this election");
        require(!electionEnded[_electionID], "Election has already ended");
        _;
    }

    function vote(string memory _electionID, string memory _voterID, string memory _candidateId) external hasNotVoted(_electionID, _voterID) {
        require(!electionEnded[_electionID], "Election has ended. Voting is not allowed.");

        // You can add more validations here, like checking if the candidate exists
        // For simplicity, I'm assuming that any string can be a valid candidate

        hasVoted[_electionID][_voterID] = true;
        candidateVotes[_electionID][_candidateId]++;

        emit VoteCasted(_electionID, _voterID, _candidateId);
    }

    function getVotes(string memory _electionID, string memory _candidateId) external view returns (uint) {
        return candidateVotes[_electionID][_candidateId];
    }

    function hasUserVoted(string memory _electionID, string memory _voterID) external view returns (bool) {
        return hasVoted[_electionID][_voterID];
    }

    function endElection(string memory _electionID) external {
        require(!electionEnded[_electionID], "Election has already ended");
        electionEnded[_electionID] = true;
        emit ElectionEnded(_electionID);
    }

    function hasElectionEnded(string memory _electionID) external view returns (bool) {
        return electionEnded[_electionID];
    }

    function getAllCandidateVotes(string memory _electionID, string[] memory _candidateIds) external view returns (CandidateInfo[] memory candidateVotesInfo) {
        // Create a dynamic array to store candidate information
        CandidateInfo[] memory candidateInfoArray = new CandidateInfo[](_candidateIds.length);

        // Initialize totalVotes
        uint totalVotes = 0;

        // Iterate through all candidates and populate the array
        for (uint i = 0; i < _candidateIds.length; i++) {
            string memory candidateId = _candidateIds[i];
            uint votes = candidateVotes[_electionID][candidateId];
            if (votes > 0) {
                candidateInfoArray[totalVotes] = CandidateInfo(candidateId, votes);
                totalVotes++;
            }
        }

        // Resize the array to remove any unused slots
        candidateVotesInfo = new CandidateInfo[](totalVotes);
        for (uint i = 0; i < totalVotes; i++) {
            candidateVotesInfo[i] = candidateInfoArray[i];
        }

        return candidateVotesInfo;
    }

    // Utility function to convert uint to string
    function uintToString(uint v) internal pure returns (string memory) {
        return string(abi.encodePacked(v));
    }
}
