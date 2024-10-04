import SignCover from "./components/Sign/SignCover/SignCover";
import LandingPage from "./components/LandingPage/LandingPage";
import ElectionForm from "./components/ElectionForm/ElectionForm";
import ElectionList from "./components/ElectionList/ElectionList";
import ElectionPage from "./components/ElectionPage/ElectionPage";
import AddCandidate from "./components/AddCandidate/AddCandidate";
import AddVoter from "./components/AddVoter/AddVoter";
import VotersList from "./components/VotersList/VotersList";
import Results from "./components/Results/Results";
import VotingPage from "./components/VotingPage/VotingPage";
import CandidateList from "./components/CandidateList/CandidateList";
import Profile from "./components/Profile/Profile";
import { Route, Routes } from "react-router-dom";
import VotersResult from "./components/VotersResult/VotersResult";
import VoterElectionPage from "./components/VoterElectionPage/VoterElectionPage";
import ParticipatedElections from "./components/ParticipatedElections/ParticipatedElections";

import VotersCandidateList from "./components/VotersCandidateList/VotersCandidateList";
import { useState } from "react";

function App() {
  // const onFetchElectionList = (electionData) => {
  //   console.log(electionData);
  // };

  return (
    <Routes>
      <Route path="/" element={<SignCover />} />;
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/election-form" element={<ElectionForm />} />
      <Route path="/election-list" element={<ElectionList />} />
      <Route path="/election-page" element={<ElectionPage />} />
      <Route path="/add-voter/:id" element={<AddVoter />} />
      <Route path="/add-candidate/:id" element={<AddCandidate />} />
      <Route path="/voters-list/:id" element={<VotersList />} />
      <Route path="/candidate-list/:id" element={<CandidateList />} />
      <Route path="/my-dashboard" element={<Profile />} />
      <Route path="/voter-election-page" element={<VoterElectionPage />} />
      <Route path="/voting-page/:id" element={<VotingPage />} />
      <Route path="/results-page" element={<Results />} />
      <Route path="/voters-results-page" element={<VotersResult />} />
      <Route
        path="/participated-elections-list"
        element={<ParticipatedElections />}
      />
      <Route
        path="/voters-candidate-list/:id"
        element={<VotersCandidateList />}
      />
    </Routes>
  );
}

export default App;
