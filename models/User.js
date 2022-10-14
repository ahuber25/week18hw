const { Schema, model } = require('mongoose');

const userScheme = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+\@.+\..+/]
        },
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        }
    }
)

userScheme.virtual('friendcount').get(function () {
    return this.friends.length;
})

const User = model('User', userScheme)

module.exports = User;