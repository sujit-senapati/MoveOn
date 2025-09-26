const express = require("express");
const axios = require("axios");


const router = express.Router();


// POST /api/find-route
router.post("/find-route", async (req, res) => {
    const { start, end } = req.body; // start/end = {lat, lng}

    try {
        const response = await axios.post("https://api.openrouteservice.org/v2/directions/driving-car", {
            coordinates: [
                [start.lng, start.lat],
                [end.lng, end.lat],
            ],
        }, {
            headers: {
                Authorization: process.env.ORS_API_KEY,
                "Content-Type": "application/json",
            },
        });

        // send route geometry back to frontend
        res.json(response.data);
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching route" });
    }
})


module.exports = router;