const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { options } = require("../routes/user");
require("dotenv").config();
// signup handler
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //   check if user is already existing
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: true,
        message: `User already exists`,
      });
    }
    //   secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: `Password cannot be hashed`,
      });
    }
    // create entry user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      success: true,
      message: `User ${user} created successfully`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: `User ${user} failed to create and try again`,
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please enter your email or password",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    // verify that the user password and generate a new JWT token
    if (await bcrypt.compare(password, user.password)) {
      // match hua password
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      //   first convert user into object

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      nuser = user.toObject();
      nuser.token = token;
      nuser.password = undefined;
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        nuser,
        message: "user logged in successfully",
      });
    } else {
      // password  did not match
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};
