const { register, login, profile, updateRole } = require("../usecase/auth");

exports.register = async (req, res, next) => {
  try {
    // get the body
    const { email, password, name } = req?.body;
    const { image } = req?.files?.photo;

    if (email == "" || !email) {
      return next({
        message: "Email must be filled!",
        statusCode: 400,
      });
    }
    if (password == "" || !password) {
      return next({
        message: "Password must be filled!",
        statusCode: 400,
      });
    }
    if (name == "" || !name) {
      return next({
        message: "Name must be filled!",
        statusCode: 400,
      });
    }

    const data = await register({
      email,
      password,
      name,
      image
    });

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // get the body
    const { email, password } = req.body;

    if (email == "" || !email) {
      return next({
        message: "Email must be filled!",
        statusCode: 400,
      });
    }
    if (password == "" || !password) {
      return next({
        message: "Password must be filled!",
        statusCode: 400,
      });
    }

    // login logic
    const data = await login(email, password);

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try {
    // get user by id
    const data = req.user;

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      role
    } = req.body;
    if (!role || role == "") {
      return next({
        statusCode: 404,
        message: `role must be filled!`,
      });
    }
    
    const payload = {
    role
    };

    const data = await updateRole(
      id,
      payload,
    );

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
