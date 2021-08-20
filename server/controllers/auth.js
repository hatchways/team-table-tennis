const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const Board = require("../models/Board");
const mongoose = require("mongoose");


// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, isDemo } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }


  const inProgress = new Column({ title: 'In Progress' });
  const completed = new Column({ title : 'Completed' }); 
  
  await inProgress.save();
  await completed.save();
  const defaultBoard = new Board({ title: 'My Board', columns: [inProgress._id, completed._id]});
  await defaultBoard.save();
  
  const user = new User({
    email,
    password,
    boards: [defaultBoard._id],
    isDemo
  });
  await user.save();
  console.log(user);

  if (user) {

    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000
    });
    const boardTitles = await getBoardTitlesFromUser(user);

    res.status(201).json({
      success: {
        user: {
          _id: user._id,
          email: user.email,
          boards: user.boards,
          isDemo
        },
        boardTitles: boardTitles
      }
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000
    });
    const boardTitles = await getBoardTitlesFromUser(user);

    res.status(200).json({
      success: {
        user: {
          _id: user._id,
          email: user.email,
          boards: user.boards,
        isDemo: user.isDemo

        },
        boardTitles: boardTitles
      }
    });

  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const boardTitles = await getBoardTitlesFromUser(user);

  res.status(200).json({
    success: {
      user: {
        _id: user._id,
        email: user.email,
        boards: user.boards,
        isDemo: user.isDemo
      },
      boardTitles: boardTitles
    }
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.send("You have successfully logged out");
});

exports.getDemoName = asyncHandler(async (req, res) =>{
  const email = "demo-" + mongoose.Types.ObjectId();
  res.status(200).json({
    email
  });
})

exports.logoutDemoUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log("begin: " + userId)

  const user = await User.findById(userId);
  await deleteAllBoardsInsideUser(user);
  await User.findByIdAndDelete(userId);
   this.logoutUser();
});

deleteAllColumnsAndCardsInsideBoard = asyncHandler(async (board) => {
  for(const columnId of board.columns){
   await deleteAllCardsInsideColumn(columnId);
 }  
})
deleteAllBoardsInsideUser = asyncHandler(async (user) => {
  for(const boardId of user.boards){
   await deleteAllColumnsAndCardsInsideBoard(boardId);
 }  
})

exports.getDemoName = asyncHandler(async (req, res) =>{
  const email = "demo-" + mongoose.Types.ObjectId();
  res.status(200).json({
    email
  });
})