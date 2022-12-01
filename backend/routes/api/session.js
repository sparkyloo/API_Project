const express = require("express");

const {
  setTokenCookie,
  deleteTokenCookie,
  restoreUser,
} = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

// Restore session user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    const token = setTokenCookie(res, user);
    return res.json({
      ...user.toSafeObject(),
      token,
    });
  } else {
    return res.json(null);
  }
});

router.delete("/", (req, res) => {
  deleteTokenCookie(res);

  return res.json(null);
});

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    // const err = new Error('Login failed');
    // err.status = 401;
    // err.title = 'Login failed';
    // err.errors = ['The provided credentials were invalid.'];
    // return next(err);
    res.status(401);
    return res.json({
      message: "Invalid credentials",
      statusCode: 401,
    });
  }

  const token = setTokenCookie(res, user);

  return res.json({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token,
  });
});

module.exports = router;
