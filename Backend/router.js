const express = require('express');
const router = express.Router();

router.get("/home", async (req, res) => {
    await res.send("Wiki home page");
});

module.exports = router;
