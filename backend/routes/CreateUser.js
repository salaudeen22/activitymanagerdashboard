const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "salaudeennextceoofgoogle";


// http://localhost:4000/api/createuser
router.post(
  "/createuser",
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
      // Check if the email is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Email address is already in use" });
      }

      // Hash the password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

     
     

      await User.create({
        name,
        email,
        password: hashedPassword,
      });
      console.log("created succeffuly");
      res.json({ success: true });
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
module.exports = router;
