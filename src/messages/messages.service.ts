import { Request, Response } from 'express';
const mongoose = require('mongoose');
import { Message } from "./message.model";
import { InputData } from "./inputDataTypes"
import UserModel from "./user"; // Import UserModel from user.js
import ProfileModel from "./profile"; // Import UserModel from user.js


export const getPublicMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch data from the database
    const searchResult = await ProfileModel.find()
    .populate('name', 'name')
    .populate('gender', 'gender')
    .populate('dateOfBirth', 'dateOfBirth')
    .populate('maritalStatus', 'maritalStatus')
    .populate('countryLivingIn', 'countryLivingIn')
//    .populate('cityLivingIn:', 'cityLivingIn')
    .populate('education', 'education')
    .populate('occupation', 'occupation')
    .populate('height', 'height')
    .populate('motherTongue','motherTongue')
    .populate('nationality', 'nationality')
    .populate('photo', 'photo')
  
  res.json(searchResult);
} catch (err) {
  console.log(err);
  res.status(500).send("An error occurred while getting profile data.");
}
};

export const getProtectedMessage = async (): Promise<Message> => {
  try {
    const newUser = new UserModel({
      username: 'testuser',
      password: 'testpassword',
    });

    const savedUser = await newUser.save();
    console.log('User inserted:', savedUser);

    return {
      text: "success new user inserted.",
    };
  } catch (error) {
    console.error('Error inserting user:', error);

    return {
      text: "Failed to insert user for protected message.",
    };
  }
};


export const PostProtectedMessage = async (req: Request, res: Response): Promise<Message> => {
  try {
    console.log('Message received in Router:', req.body);
    const inputData: InputData = req.body;

    // Manually create a new ProfileModel instance
    const newProfile = new ProfileModel({
      name: inputData.name,
      gender: inputData.gender,
      dateOfBirth: inputData.dateOfBirth,
      maritalStatus: inputData.maritalStatus,
      countryLivingIn: inputData.countryLivingIn,
      cityLivingIn: inputData.cityLivingIn,
      education: inputData.education,
      occupation: inputData.occupation,
      height: inputData.height,
      motherTongue: inputData.motherTongue,
      nationality: inputData.nationality,
      photo: inputData.photo 
    });

    const savedMessage = await newProfile.save();
    console.log('Message inserted:', savedMessage);

    return {
      text: "Success: New message inserted.",
    };
  } catch (error) {
    console.error('Error inserting message:', error);

    return {
      text: "Failed to insert message.",
    };
  }
};

export const getAdminMessage = (): Message => {
  return {
    text: "This is an admin message.",
  };
};
