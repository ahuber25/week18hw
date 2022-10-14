const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')
const dateFormat = require('../utils/dateFormat');

const thoughtScheme = new Schema(
    {
        thoughts: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        created: {
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

thoughtScheme.virtual('reactions').get(function () {
    return this.reactions.length
});

const Thought = model('Thought', thoughtScheme);

module.exports = Thought;