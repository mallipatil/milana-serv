const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const ProfileSchema = new Schema({
    name: { type: String},
    gender: { type: String},
    dateOfBirth: { type: String},
    maritalStatus: { type: String},
    countryLivingIn: { type: String},
    cityLivingIn: { type: String},
    education: { type: String},
    occupation: { type: String},
    height: { type: String},
    motherTongue: { type: String},
    nationality: { type: String},
    photo: { type: String }, // Add the 'photo' field as a Buffer type
  });


const ProfileModel = model('profile', ProfileSchema,'profile');

export default ProfileModel;