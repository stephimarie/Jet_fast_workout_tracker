const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {useNewUrlParser: true});



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

app.post("/api/workouts", ({
    body
}, res) => {
    Workout.create({day: new Date()}).then((data) => res.json(data)).catch(e => console.error(e))
});

app.get("/api/workouts", (req, res) => {
    Workout.find({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            console.log(data);
            res.json(data);
        }
    });
})

app.get("/api/workouts/range", (req, res) => {
    Workout.find().limit(7)
    .then(workout => res.json(workout))
    .catch(e => console.error(e))

    console.log("req.body= ",req.body);
    console.log("res.json= ",res.json(workout));
})


app.put("/api/workouts/:id", (req, res) => {
    console.log("line56 req.body= ",req.body);
    Workout.findByIdAndUpdate(req.params.id, {
        $push: {
            exercises: req.body
        }
    }, {
        new: true,
        runValidators:true
    })
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e))
    
});

app.listen(PORT, function() {
    console.log(`The application is running on localhost:${PORT}`);
})