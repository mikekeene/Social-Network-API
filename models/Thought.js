const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema (
    {
        // reactionId
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()         
        },
        // reactionBody 
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        // username 
        username: {
            type: String,
            required: true
        },
        // createdAt 
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdDateTime) => moment(createdDateTime).format('MM DD YY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

