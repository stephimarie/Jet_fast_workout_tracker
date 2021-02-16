const db = require("../models/workout.js");
const mongoose = require ("mongoose");

module.exports = (app) => {
    
    app.post("/api/workouts",(req, res) => {
        db.create({
            day: new Date(),
        })
        .then((data) => res.json(data))
        .catch((err) => {
            console.log("api/workouts error: ", err);
        });
    }); 