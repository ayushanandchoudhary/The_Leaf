const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const UserController = require("./controller/UserController"); 
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://admin:ayush@cluster0.5oljvjx.mongodb.net/");

app.get('/', (req, res) => {
    res.send("Express is running");
});

app.post('/SerialKey', UserController.serial_Key);
app.post('/login', UserController.login);
app.post('/register', UserController.register);
app.post('/prevention', UserController.prevention);
app.post('/home', UserController.authMiddleware, UserController.home);
app.post('/admin/register', UserController.admin_reg);
app.post('/admin/login', UserController.admin_login);
app.post('/admin/dashboard',UserController.authMiddleware, UserController.dashboard);
app.post('/admin/create',UserController.authMiddleware,UserController.create_org)
app.get('/admin/orglist',UserController.org_detail)
app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});
