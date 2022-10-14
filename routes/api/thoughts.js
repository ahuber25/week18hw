const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)
router.route('/:thoughtId/reaction').post(addReaction)
router.route('/:thoughtId/reaction/:reationId').delete(deleteReaction)

module.exports = router;