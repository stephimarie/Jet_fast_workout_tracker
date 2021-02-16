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

        app.get("/api/workouts", (req, res) => {
        db.find({}, (error, data) => {
            if (error) {
                res.send(error);
            } else {
                console.log("find= ", data);
                res.json(data);
            }
        });
    })