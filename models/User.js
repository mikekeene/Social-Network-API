//importing mongoose schema and model fx
const { Schema, model, Types } = require('mongoose')
// creating the user schema
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //email address validication w regex
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        thoughts: [{
            //telling Mongoose to expect thought
            type: Schema.Types.ObjectId, 
            //User model search Thought
            ref: 'Thought' 
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User' 
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
//creating user model
const User = model('User', UserSchema); 
//Creating the virtual friendCount
UserSchema.virtual('friendCount').get( function() {
    return this.friends.length;
});
//exporting user model:
module.exports =  User;