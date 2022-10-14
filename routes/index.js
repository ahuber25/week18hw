const router = require('express').Router();
const APIRoutes = require('./api')

router.use('/api', APIRoutes);

router.use((req, res) => {
    return res.send("Think again!")
})

module.exports = router;