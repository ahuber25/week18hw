const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')
const dateFormat = require('../utils/dateFormat');

const thoughtScheme = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          getters: true
        }
    }
)

thoughtScheme.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('Thought', thoughtScheme);

module.exports = Thought;