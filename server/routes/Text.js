const TextQuery = require('../schemas/TextQuery');

const router = require('express').Router();
router.post("/add-text", async (req, res) => {
    try {
        const doc = new TextQuery({
            userId: req.body.userId,
            text: req.body.text
        })
        await doc.save()
        res.json({
            message: "Saved to database"
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports  = router