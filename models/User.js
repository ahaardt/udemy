const mongoose = require ('mongoose');

const {Schema} = mongoose;
//const Schema = mongoose.Schema; same as above

const userSchema = new Schema ({
    googleId: String
});

// Create collection called users using userSchema
mongoose.model('users',userSchema);