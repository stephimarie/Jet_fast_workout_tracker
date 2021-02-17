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

htmlRoutes(app);
apiRoutes(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

app.listen(PORT, function() {
    console.log(`The application is running on localhost:${PORT}`);
})