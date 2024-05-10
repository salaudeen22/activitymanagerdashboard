const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

router.post(
  "/sendData",
  [body("email").isEmail(), body("screen_data").isArray()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, screen_data } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.screendata.push(...screen_data);
      await user.save();

      res.json({
        success: true,
        message: "Screen data added to user successfully",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while adding screen data to user" });
    }
  }
);

router.post("/WebData",(req,res)=>
  {
      try
      {
     
          res.send(global.WebCollection);
    
  
      }
      catch(error)
      {
          console.error(error.message);
          res.send("server error")
  
      }
  });
  

module.exports = router;
