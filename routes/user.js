const express = require("express");

const router = express.Router();
const { auth, isStudent, isAdmin } = require("../middlewares/auth");
const { login, signup } = require("../controllers/Auth");

router.post("/login", login);
router.post("/signup", signup);

router.get("/test", auth, (req, res) => {
  res.json({
    sucess: true,
    message: "Welcome to protected routes ",
  });
});

// protected routes
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    sucess: true,
    message: "Welcome to protected routes students",
  });
});
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    sucess: true,
    message: "Welcome to protected routes admin routes",
  });
});

module.exports = router;
