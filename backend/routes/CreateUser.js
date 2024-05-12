const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret =  process.env.JWTSECRET;
const fs = require("fs");
const UploadOnCloudinary = require("../utils/cloudinary.js");
const upload = require("../middleware/multer.js");

// https://activitymanagerdashboard-1.onrender.com/

// http://localhost:4000/api/createuser
router.post(
  "/createuser",
  upload.single("image"), 
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
   
    try {
    
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Email address is already in use" });
      }

     
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      
      let userImageURL = null;
      if (req.file) {
       
        const cloudinaryResponse = await UploadOnCloudinary(req.file.path);
        userImageURL = cloudinaryResponse ? cloudinaryResponse.url : null;
        console.log(userImageURL);
     
        // fs.unlinkSync(req.file.path);
      }

 
      await User.create({
        name,
        email,
        password: hashedPassword,
        userImage: userImageURL,
      });
      
      res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;

    try {
      const userdata = await User.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }
      const pwdCompare = bcryptjs.compare(req.body.password, userdata.password);

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct credentials" });
      }
      const data = { user: { id: userdata.id } };

      const authtoken = jwt.sign(data, jwtsecret);

      res.json({ success: true, authtoken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
router.post("/displayuser", async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res
        .status(400)
        .json({ errors: "Can't load the data" });
    }
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/restrictblock",
[body("email").isEmail(), body("restrict").isObject()],
async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, restrict } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.restrict.push(restrict);
    await user.save();

    res.json({
      success: true,
      message: "Added list to user successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding screen data to user" });
  }
});

router.post("/removefromrestrict",
  [body("email").isEmail(), body("itemToRemove").isObject()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, itemToRemove } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Find the index of the item to remove in the restrict array
      const indexToRemove = user.restrict.findIndex((item) => {
        return (
          item.url === itemToRemove.url &&
          item.timeInHours === itemToRemove.timeInHours &&
          item.type === itemToRemove.type
        );
      });

      if (indexToRemove === -1) {
        return res.status(404).json({ error: "Item not found in the restrict list" });
      }

      
      user.restrict.splice(indexToRemove, 1);

      await user.save();

      res.json({
        success: true,
        message: "Removed item from restrict list successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while removing item from restrict list" });
    }
  }
);


module.exports = router;
