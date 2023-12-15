const User = require("../model/User.js");
const bcrypt = require("bcryptjs");
const logger = require("../logger/logging.js");

exports.getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return logger.info(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No User Found" });
  }
  return res.status(200).json({ users });
};

exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return logger.info(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already exists! Login Instead" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (error) {
    return logger.info(error);
  }

  return res.status(201).json({ user });
};

// exports.signIn = async (req, res, next) => {
//   const { email, password } = req.body;

//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email });
//   } catch (error) {
//     return logger.info(error);
//   }
//   if (!existingUser) {
//     return res.status(404).json({ message: "User Not Found! Register First" });
//   }

//   const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
//   if (!isPasswordCorrect) {
//     return res.status(400).json({ message: "Incorrect Password!" });
//   }
//   return res
//     .status(200)
//     .json({ message: "Login Successful!!!", user: existingUser });
// };
exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      logger.info("User not found. Login aborted.");
      return res.status(404).json({ message: "User Not Found! Register First" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
      logger.info("Incorrect password. Login aborted.");
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    logger.info("Login successful");
    return res.status(200).json({ message: "Login Successful!!!", user: existingUser });
  } catch (error) {
    logger.error(`Error signing in: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};