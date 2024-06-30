import { reject } from "lodash";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
      return res.status(500).json({
        status: 500,
        message: "Missing inputs parameter!",
        data: "",
      });
    }

    let data = await userService.handleUserLogin(email, password);
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token

    return res.json(data);
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: 500,
      message: "Error from server",
      data: "",
    });
  }
};

let handleRegister = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.phoneNumber ||
      !req.body.address ||
      !req.body.fullName
    ) {
      return res.status(400).json({
        status: 400,
        message: "Missing required parameter",
        data: "",
      });
    }

    if (req.body.password && req.body.password.length < 4) {
      return res.status(422).json({
        status: 422,
        message: "Your password must have more than 3 letters",
        data: "",
      });
    }
    let data = await userService.handleUserRegister(req.body);
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token

    return res.status(data.status).json(data);
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: 500,
      message: "Error from server",
      data: "",
    });
  }
};

let handleGetAllUsers = async (req, res) => {
  let data = await userService.getAllUsers();
  return res.status(200).json({
    status: 200,
    message: "OK",
    data,
  });
};

let getAllCodeUser = async (req, res) => {
  try {
    let data = await userService.getAllCodeUserService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Error from server",
    });
  }
};

let handleCreateNewUser = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.phoneNumber ||
      !req.body.address ||
      !req.body.fullName
    ) {
      return res.status(400).json({
        status: 400,
        message: "Missing required parameter",
        data: "",
      });
    }

    if (req.body.password && req.body.password.length < 4) {
      return res.status(422).json({
        status: 422,
        message: "Your password must have more than 3 letters",
        data: "",
      });
    }
    let data = await userService.createNewUser(req.body);
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token

    return res.status(data.status).json(data);
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Error from server",
      data: "",
    });
  }
};

let handleDeleteUser = async (req, res, io) => {
  console.log("🚀 ~ handleDeleteUser ~ req.body:", req.body);
  if (!req.body.id) {
    return res.json({
      status: 400,
      message: "Missing required parameter",
    });
  }
  let data = await userService.deleteUser(req.body.id);
  if (data.status === 200) {
    io.sockets.emit("delete-user", "success");
  }
  return res.status(data.status).json(data);
};

let handleEditUser = async (req, res, io) => {
  let data = await userService.updateUserData(req.body);
  if (data.status === 200) {
    io.sockets.emit("update-user-data", "success");
  }
  return res.json(data);
};

let handleGetDetailUserById = async (req, res) => {
  let data = await userService.getUserInfoById(req.query.id);
  return res.status(data.status).json(data);
};

let handleCreateNewStaff = async (req, res, io) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.phoneNumber ||
      !req.body.address ||
      !req.body.fullName
    ) {
      return res.json({
        status: 400,
        message: "Missing required parameter",
        data: "",
      });
    }

    if (req.body.password && req.body.password.length < 4) {
      return res.json({
        status: 422,
        message: "Your password must have more than 3 letters",
        data: "",
      });
    }
    let data = await userService.createNewStaff(req.body);
    if (data.status === 201) {
      io.sockets.emit("create-staff", "success");
    }
    return res.json(data);
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: 500,
      message: "Error from server",
      data: "",
    });
  }
};

const handleChangePassword = async (req, res) => {
  try {
    let data = await userService.changePassword(req.body);
    return res.json(data);
  }
  catch (e) {
    console.log("error", e);
    return res.status(500).json({
      status: 500,
      message: "Error from server",
      data: "",
    });
  }
}

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  getAllCodeUser: getAllCodeUser,
  handleRegister,
  handleCreateNewUser,
  handleDeleteUser,
  handleEditUser,
  handleGetDetailUserById,
  handleCreateNewStaff,
  handleChangePassword
};
