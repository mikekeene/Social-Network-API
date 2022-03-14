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

const ThoughtSchema = new Schema(
    {
        // thoughtText
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        // createdAt
        createdAt: {
            type: Date,
            default: Date.now,
            get: (displayDateTime) => moment(displayDateTime).format('MM DD YY [at] hh:mm a')
        },
        // username
        username: {
            type: String,
            required: true
        },
        // reactions
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
// creating the thought model
const Thought = model('Thought', ThoughtSchema);

// creating virtual reactionCount
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// exporting the thought model
module.exports = Thought;

