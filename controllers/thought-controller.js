const { Thought, User } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
        .sort({ createdAt: -1})
        .then((dbThoughtData) => {
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thoughts in head.'})
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id }},
                { new: true }
            )
        })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thoughts in head.'})
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.paras.thoughtId}, { $set: req.body }, { runValidators: true, new: true})
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thoughts in head.'})
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thoughts in head.'})
            }
            return User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId} },
                { new: true }
            )
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'Cannot find User with this ID.'})
            }
            res.json({message: 'Thought deleted.'})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId}, { $addToSet: { reactions: req.body}}, { runValidators: true, new: true})
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thoughts in head.'})
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId}, { $pull: { reactions: req.body}}, { runValidators: true, new: true})
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thoughts in head.'})
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}

module.exports = thoughtController;