const User = require("../models/User");
const JWT = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_Secret;
const bcrypt = require("bcryptjs");
const { createCustomError } = require("../errors/customError");
//_____________CONTROLLERS______________

//----------------------------------------
//CONTROLLER 1 : To  login   using POST '/api/auth/login'
const login = async (req, res) => {
  //Getting the required parameters from request body
  let type = "user";
  const { email, password } = req.body;
  let searchParam = {
    email: email,
  };
  const user = await User.findOne(searchParam);
  //checking whether the user with the given email exists or not
  if (!user) {
    createCustomError(404, "Please Enter Correct Credentials");
  }
  type = user.type;
  //comparing the password of the user and the given password by the request
  let passwordCompare = await bcrypt.compare(password, user.password);
  //checking whether the password matches or not
  if (!passwordCompare) {
    createCustomError(404, "Please Enter Correct Credentials");
  }
  //initializing data for jwt
  const data = {
    user: {
      id: user._id,
    },
  };
  //signing data with JWT_Secret to generate authToken
  let authToken = JWT.sign(data, JWT_Secret);
  console.log(authToken);
  //sending authToken
  res.json({ type: type, success: true, authToken });
};

//----------------------------------------
//CONTROLLER 2 : TO  CREATE A  user   USING POST '/api/auth/register'
const register = async (req, res) => {
  //Getting the required parameters from request body
  const { name, email, password } = req.body;
  //checking whether the user already exists or not
  let user = await User.findOne({
    email: email,
  });
  //sending response if user already exists
  if (user) {
    createCustomError(
      404,
      "Sorry the user with the provided email already exists!"
    );
  }
  //generating salt for hashing
  let salt = await bcrypt.genSalt(10);
  let securePassword = await bcrypt.hash(password, salt); //generating a securePassword using bcrypt
  //creating a new user
  user = await User.create({
    name,
    email,
    password: securePassword,
    type: "user",
  });
  //initializing data for authToken
  const data = {
    user: {
      id: user._id,
    },
  };
  //signing the data with JWT_Secret to generate authToken
  let authToken = JWT.sign(securePassword, JWT_Secret);
  //sending the authToken as response
  res.json({
    type: "user",
    success: "true",
    msg: "New user created successfully",
    authToken,
  });
};
//----------------------------------------
//CONTROLLER 3 : TO  CREATE A  ANYKIND OF USER BY ADMIN THROUGH  POST '/api/auth/create'
const create = async (req, res) => {
  //Getting the required parameters from request body
  const { name, email, password, type } = req.body;
  //checking whether the user already exists or not
  let user = await User.findOne({
    email: email,
  });
  //sending response if user already exists
  if (user) {
    createCustomError(
      404,
      "Sorry the user with the provided email already exists!"
    );
  }
  //generating salt for hashing
  let salt = await bcrypt.genSalt(10);
  let securePassword = await bcrypt.hash(password, salt); //generating a securePassword using bcrypt
  //creating a new user
  user = await User.create({
    name,
    email,
    password: securePassword,
    type: type,
  });

  res.json({
    success: "true",
    msg: "New user created successfully",
  });
};
//----------------------------------------
//CONTROLLER 4 : TO  REMOVE A  USER BY ADMIN THROUGH  DELETE '/api/auth/remove/:id'
const removeUser = async (req, res) => {
  //Getting the required parameters from re
  const { id: deleteUserId } = req.params;

  //finding the user corresponding to the id and deleting it
  const deletedUser = await User.findOneAndDelete({
    _id: deleteUserId,
  });
  //sending response msg
  res.json({
    success: "true",
    msg: "User Deleted Successfully",
  });
};
//----------------------------------------
//CONTROLLER 5: TO  DELETE A  USER BY USER THROUGH  DELETE '/api/auth/delete/:id
const deleteUser = async (req, res) => {
  //Getting the required parameters from req
  const { id: userId } = req.user;

  //finding the user corresponding to the id and deleting it
  const deletedUser = await User.findOneAndDelete({
    _id: userId,
  });
  if (!deletedUser) {
    createCustomError(404, "User doesn't exist");
  }
  //sending response msg
  res.json({
    success: "true",
    msg: "User Deleted Successfully",
  });
};

//----------------------------------------
//CONTROLLER 6: TO  FETCH ALL  USERS BY ADMIN THROUGH  GET '/api/auth/getusers'
const fetchUser = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};
//----------------------------------------
//CONTROLLER 7: TO  FETCH PROFILE OF  USER THROUGH  GET '/api/auth/profile'
const profile = async (req, res) => {
  const { id: userId } = req.user;
  const foundUser = await User.find({ _id: userId });
  res.status(200).json(foundUser);
};
//----------------------------------------
//CONTROLLER 8: TO  UPDATE PROFILE OF  USER THROUGH  PUT '/api/auth/updateprofile'
const updateprofile = async (req, res) => {
  //getting required parameters
  const { id: userId } = req.user;
  const { name, password, email } = req.body;
  //creating a empty object for update
  const toupdateuser = {};
  //checking whether the email exists and the user with the given email exists or not and adding it in the toupdateuser
  if (email) {
    let user = await User.findOne({
      email: email,
    });
    //sending response if user already exists
    if (user) {
      createCustomError(
        404,
        "Sorry the user with the provided email already exists!"
      );
    }
    toupdateuser.email = email;
  }
  //checking whether the password exists and if it exists,generating hashed form and adding it in toupdateuser object
  if (password) {
    //generating salt for hashing
    let salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(password, salt); //generating a securePassword using bcryptjs
    toupdateuser.password = securePassword;
  }
  //adding name to toupdateuser object if it exists
  if (name) {
    toupdateuser.name = name;
  }
  const updateduser = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    toupdateuser,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updateduser) {
    createCustomError(404, "User you are trying to update doesn't exists");
  }
  res.json({ success: "true", msg: "Updated profile successfully" });
};

//----------------------------------------
//CONTROLLER 9: TO  CHANGE PROFILE OF  USER BY ADMIN THROUGH  PUT '/api/auth/changeprofile/:id'
const changeprofile = async (req, res) => {
  //getting required parameters
  const { id: userId } = req.params;
  const { name, password, email, type } = req.body;
  //creating a empty object for update
  const toupdateuser = {};
  //checking whether the email exists and the user with the given email exists or not and adding it in the toupdateuser
  if (email) {
    let user = await User.findOne({
      email: email,
    });
    //sending response if user already exists
    if (user) {
      createCustomError(
        404,
        "Sorry the user with the provided email already exists!"
      );
    }
    toupdateuser.email = email;
  }
  //checking whether the password exists and if it exists,generating hashed form and adding it in toupdateuser object
  if (password) {
    //generating salt for hashing
    let salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(password, salt); //generating a securePassword using bcryptjs
    toupdateuser.password = securePassword;
  }
  //adding name to toupdateuser object if it exists
  if (name) {
    toupdateuser.name = name;
  }
    //adding type to toupdateuser object if it exists
    if(type){
      toupdateuser.type=type
    }
  const updateduser = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    toupdateuser,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updateduser) {
    createCustomError(404, "User you are trying to update doesn't exists");
  }
  res.json({ success: "true", msg: "Updated profile successfully" });
};
//exports of controller
module.exports = {
  login,
  register,
  create,
  removeUser,
  deleteUser,
  fetchUser,
  profile,
  updateprofile,
  changeprofile,
};
