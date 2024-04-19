const optionUsecase = require("../usecase/option");


exports.getOptions = async (req, res, next) => {
  try {
    const data = await optionUsecase.getOptions();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOption = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await optionUsecase.getOption(id);
    if (!data) {
      return next({
        message: `option with id ${id} is not found!`,
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

exports.createOption = async (req, res, next) => {
  try {
    const { type_option } = req.body;
    if (!type_option || type_option == "") {
      return next({
        statusCode: 404,
        message: `type_option must be filled!`,
      });
    }

    const data = await optionUsecase.createOption({ type_option });

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOption = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type_option } = req.body;
    if (!type_option || type_option == "") {
      return next({
        statusCode: 404,
        message: `type_option must be filled!`,
      });
    }

    const data = await optionUsecase.updateOption(id, {type_option});

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOption = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await optionUsecase.deleteOption(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
