const express = require("express");
const router = express.Router();
const fetch = require('../Middleware/fetchDetails');


router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password") 
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

module.exports = router;