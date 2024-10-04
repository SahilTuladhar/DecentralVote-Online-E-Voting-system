const express = require("express");
const User = require("../models/User");
const Cookies = require('js-cookie')
const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt')


//register seller
const register = async (req, res) => {
    // Helper function to generate a random 7-letter alphanumeric word
  const generateRandomAlphanumericWord = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomWord = '';
  
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomWord += characters.charAt(randomIndex);
    }
  
    return randomWord;
  };
  
    try {
      // Generate a random 7-letter alphanumeric word
      const generatedVoterId = generateRandomAlphanumericWord();
  
      // Check if the generated voterId already exists in the database
      const existingUserWithVoterId = await User.findOne({ voterID: generatedVoterId });
      if (existingUserWithVoterId) {
        // If the generated voterId exists, generate a new one
        return register(req, res);
      }
  
      // Create a new user with the generated voterId
      const user = new User({
        ...req.body,
        voterID: generatedVoterId,
      });
  
      // Save the user to the database
      const token = await user.generateAuthToken();
      console.log('token generated')
      await res.cookie('user_token', token , {
        httpOnly: true,
        secure:false,
        maxAge:60000000
     })
      await user.save();
  
      console.log('User registered');
     console.log('user',user)

   
      res.status(201).send({ user, token });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };





// Login a User

const login = async(req,res)=>{
  
    try{

        const user = await User.findByCredentials(req.body.name,req.body.voterID, req.body.password);
       
        const token = await user.generateAuthToken()
    
     //  res.set('Set-Cookie',`buyer_token=${token}`)
     res.cookie('user_token', token , {
        httpOnly: true,
        secure:false,
        maxAge:60000000
     })
        res.send({ userId: user.id });
        
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}


const profile = async (req,res)=>{
  try {
    const User = req.user
    console.log('user',User)
    res.send(User)
  } catch (error) {
    
  }
}

const logout = async(req,res)=>{
    try {
        res.clearCookie('user_token' ,  { path: '/' })
       res.end()
        console.log('Logged Out')
    } catch (error) {
        console.log(error)
    }

}





module.exports = {register, login ,profile, logout}