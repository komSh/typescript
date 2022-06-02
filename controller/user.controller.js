const bcrypt = require('bcryptjs');
const jwtGenerator = require('../utils/jwtGenerator');
const models = require('../models');

const { User } = models;



// USER REGISTRATION CONTROLLER
module.exports.user_register = async (req, res) => {
  try {
   
    // 1. destructure the values from req.body
    let {
      firstName, lastName, email, phone, type, password,
    } = req.body;
    console.log(req.body);
    // encrypt the password before writing/saving it in the database
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      console.log(err);
      // check if an error occurs while encrypting and return an error else  return the hashedPassword and write/save it in the database
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
       
       
        try {
          const newUser = await User.create({
            lastName,
            firstName,
            email,
            phone,
            type,
            password: hashedPassword,
          });
          // generate a token
          const token = jwtGenerator(newUser.id);

          res.status(200).json({
            message: 'Account created successfully!',
            token,
          });
        } catch (err) {
          if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
              error: err.errors.map((e) => e.message),
            });
          }else {
            res.status(400).json({
              message: err.message,
            });
          }
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// USER LOGIN CONTROLLER
module.exports.user_login = async (req, res) => {
  res.send(req.body);
  return ;
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    // check if the password entered matches the one in the database
    bcrypt.compare(password, user.password, (err, validPassword) => {
      if (err) {
        res.status(401).json({
          error: 'Sorry! Email or password is incorrect',
        });
      } else if (validPassword) {
        // generate a token
        const token = jwtGenerator(user.id);

        res.json({
          message: 'Login successfully!',
          token,
        });
      } else {
        res.status(401).json({
          error: 'Sorry! Email or password is incorrect',
        });
      }
    });
  } else {
    res.status(404).json({
      error: "Sorry! An account with that email doesn't exist!",
    });
  }
};

// USER TOKEN VERIFY
module.exports.user_token_verify = async (req, res) => {
  try {
    // return response if authorization is met else return an error
    res.status(200).json({ authorized: true });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
