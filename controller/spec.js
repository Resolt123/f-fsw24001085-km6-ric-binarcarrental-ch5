const specUsecase = require("../usecase/spec");

exports.getSpecs = async (req, res, next) => {
  try {
    const data = await specUsecase.getSpecs();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSpec = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await specUsecase.getSpec(id);
    if (!data) {
      return next({
        message: `specific with id ${id} is not found!`,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.createSpec = async (req, res, next) => {
  try {
    const { type_spec } = req.body;
    if (!type_spec || type_spec == "") {
      return next({
        statusCode: 404,
        message: `type_spec must be filled!`,
      });
    }

    const data = await specUsecase.createSpec({ type_spec });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSpec = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type_spec } = req.body;
    if (!type_spec || type_spec == "") {
      return next({
        statusCode: 404,
        message: `type_spec must be filled!`,
      });
    }

    const data = await specUsecase.updateSpec(id, { type_spec });

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSpec = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await specUsecase.deleteSpec(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
