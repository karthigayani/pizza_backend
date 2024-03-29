const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", (req, res) => {
  let newUser = new User(req.body);
  try {
    newUser.save().then(()=>{
      res.status(200).json({
        success: true,
        message: "Registered successfully",
      });
    })
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });
    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0].Id,
      };
      res.status(200).send(currentUser);
    } else {
      res.status(400).json({
        message: "Login Failed",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Something Went wrong",
    });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ message: error.stack });
  }
});

router.post('/deleteuser', async (req, res) => {
  const userid = req.body.userid
  try {
    if (userid === "651519448a689bf39c6b680a" || userid === "6515197a8a689bf39c6b680c") {
      res.status(401).send("Unauthorized")
    } else {
      await User.findOneAndDelete({ _id: userid })
      res.status(200).send("User Deleted")
    }
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
})

router.post("/admin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });
    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0].Id,
      };
      res.status(200).send(currentUser);
    } else {
      res.status(400).json({
        message: "Login Failed",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Something Went wrong",
    });
  }
});


module.exports = router;