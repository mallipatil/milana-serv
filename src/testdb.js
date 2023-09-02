const mongoose = require('mongoose');

const mconnectionstring = "mongodb://admin:password@localhost:27017";
const databaseName = "CRUD";
const mongoURL = `${mconnectionstring}/${databaseName}`;


// Connect to MongoDB
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.error(mongoURL);
// Define a schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a model
const User = mongoose.model('User', userSchema, 'user');

// Create and insert a new user
async function insertUser() {
  try {
    const newUser = new User({
      username: 'testuser',
      password: 'testpassword',
    });

    const savedUser = await newUser.save();
    console.log('User inserted:', savedUser);
  } catch (error) {
    console.error('Error inserting user:', error);
  } finally {
    // Disconnect from the database after inserting
    mongoose.disconnect();
  }
}

// Call the insertUser function
insertUser();
