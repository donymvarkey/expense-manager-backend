const jwt = require("jsonwebtoken");
const _ = require("lodash");
const UserModel = require("../models/User");
const utils = require("../helpers/utils")

const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password, phone } = req.body;
  if (!firstName || !lastName || !email || !password || !phone) {
    return res.status(400).json({
      status: false,
      message: "Please enter all fields"
    })
  }
  try {
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        status: false,
        message: "User already exists"
      })
    }
    const hashedPassword = utils.hashPassword(password);
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    if (savedUser) {
      return res.status(201).json({
        status: true,
        message: "User account created successfully"
      })
    }
    next();
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "Please enter all fields"
    });
  }

  try {
    const isUserExists = await UserModel.findOne({ email });
    if (!isUserExists) {
      return res.status(400).json({
        status: false,
        message: "User not found. Please create a new account."
      })
    }
    if (utils.comparePassword(password, isUserExists.password)) {
      signiningData = {
        email: isUserExists.email,
        firstName: isUserExists.firstName,
        lastName: isUserExists.lastName,
        id: isUserExists._id,
        isAdmin: isUserExists.isAdmin,
      };

      token = jwt.sign(signiningData, process.env.SIGNATURE);

      return res.status(200).json({
        status: true,
        message: "Login successful",
        data: {
          userID: isUserExists._id,
          token: token
        }
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Invalid Credentials"
      })
    }
  } catch (error) {
    next(error);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userInfo = await UserModel.findById(userId);
    if (!userInfo) {
      return res.status(400).json({
        status: false,
        message: "User not found. Please create a new account."
      })
    }
    return res.status(200).json({
      status: true,
      message: "User details fetched successfully",
      data: userInfo
    });
  } catch (error) {
    next(error)
  }
}

const updateUserProfile = async (req, res, next) => {
  const reqBody = req.body;
  try {
    const userId = req.user.id;
    const userDetails = await UserModel.findById(userId);
    console.log(userDetails)
    const updateObj = {}
    if (!_.isEmpty(reqBody)) {
      _.hasIn('reqBody', 'firstName') ? updateObj['firstName'] = userDetails.firstName : updateObj['firstName'] = reqBody.firstName
      _.hasIn('reqBody', 'lastName') ? updateObj['lastName'] = userDetails.lastName : updateObj['lastName'] = reqBody.lastName
      _.hasIn('reqBody', 'phone') ? updateObj['phone'] = userDetails.phone : updateObj['phone'] = reqBody.phone
    } else {
      updateObj['firstName'] = userDetails.firstName
      updateObj['lastName'] = userDetails.lastName
      updateObj['phone'] = userDetails.phone
    }
    const updateStatus = await UserModel.findByIdAndUpdate(userId, updateObj);
    if (updateStatus) {
      return res.status(200).json({
        status: true,
        message: "User details updated successfully",
        data: null
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Failed to update user details"
      })
    }
  } catch (error) {
    next(error)
  }
}

const deleteUserAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await UserModel.findByIdAndDelete(userId)
    if (data) {
      return res.status(200).json({
        status: true,
        message: "User account deleted successfully",
        data: null
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signUp,
  login,
  getUserInfo,
  updateUserProfile,
  deleteUserAccount
};