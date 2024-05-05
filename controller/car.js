const carUsecase = require("../usecase/car");
const { v4: uuidv4 } = require("uuid");

exports.getCars = async (req, res, next) => {
  try {
    const data = await carUsecase.getCars();

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carUsecase.getCar(id);
    if (!data) {
      return next({
        message: `Car with id ${id} is not found!`,
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

exports.createCar = async (req, res, next) => {
  try {
    const id = uuidv4();
    const {name} = req.user;
    const image = req?.files?.photo;
    const {
      plate,
      manufacture,
      model,
      rentPerDay,
      capacity,
      description,
      alevailabAt,
      transmission,
      available,
      type,
      year,
      option, // menerima dalam bentuk int atau array yang berisikan int
      spec, // menerima dalam bentuk int atau array yang berisikan int
    } = req.body;
    if (!plate || plate == "") {
      return next({
        statusCode: 404,
        message: `Plate must be filled!`,
      });
    }
    if (!manufacture || manufacture == "") {
      return next({
        statusCode: 404,
        message: `manufacture must be filled!`,
      });
    }
    if (!model || model == "") {
      return next({
        statusCode: 404,
        message: `model must be filled!`,
      });
    }
    if (!image || image == "") {
      return next({
        statusCode: 404,
        message: "image must be filled!",
      });
    }
    if (!rentPerDay || rentPerDay == "") {
      return next({
        statusCode: 404,
        message: "rentPerDay must be filled!",
      });
    }
    if (!capacity || capacity == "") {
      return next({
        statusCode: 404,
        message: "capacity must be filled!",
      });
    }
    if (!description || description == "") {
      return next({
        statusCode: 404,
        message: "description must be filled!",
      });
    }
    if (!alevailabAt || alevailabAt == "") {
      return next({
        statusCode: 404,
        message: "availableAt must be filled!",
      });
    }
    if (!transmission || transmission == "") {
      return next({
        statusCode: 404,
        message: "transmission must be filled!",
      });
    }
    if (!available || available == "") {
      return next({
        statusCode: 404,
        message: "available must be filled!",
      });
    }
    if (!type || type == "") {
      return next({
        statusCode: 404,
        message: "type must be filled!",
      });
    }
    if (!year || year == "") {
      return next({
        statusCode: 404,
        message: "year must be filled!",
      });
    }
    const payload = {
      id,
      plate,
      manufacture,
      model,
      image,
      rentPerDay,
      capacity,
      description,
      alevailabAt,
      transmission,
      available,
      type,
      year,
      createdby:name,
      updatedby:name
    };

    const data = await carUsecase.createCar(payload, id, option, spec);

    res.status(201).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.user;
    const image = req?.files?.photo;
    const {
      plate,
      manufacture,
      model,
      rentPerDay,
      capacity,
      description,
      alevailabAt,
      transmission,
      available,
      type,
      year,
      option, // menerima dalam bentuk int atau array yang berisikan int
      spec, // menerima dalam bentuk int atau array yang berisikan int
      id_option,//untuk id option yang akan diganti (menggunakan id_option bukan id)
      id_spec//untuk id spec yang akan diganti (menggunakan id_spec bukan id)
    } = req.body;
    if (!plate || plate == "") {
      return next({
        statusCode: 404,
        message: `Plate must be filled!`,
      });
    }
    if (!manufacture || manufacture == "") {
      return next({
        statusCode: 404,
        message: `manufacture must be filled!`,
      });
    }
    if (!model || model == "") {
      return next({
        statusCode: 404,
        message: `model must be filled!`,
      });
    }
    if (!image || image == "") {
      return next({
        statusCode: 404,
        message: "image must be filled!",
      });
    }
    if (!rentPerDay || rentPerDay == "") {
      return next({
        statusCode: 404,
        message: "rentPerDay must be filled!",
      });
    }
    if (!capacity || capacity == "") {
      return next({
        statusCode: 404,
        message: "capacity must be filled!",
      });
    }
    if (!description || description == "") {
      return next({
        statusCode: 404,
        message: "description must be filled!",
      });
    }
    if (!alevailabAt || alevailabAt == "") {
      return next({
        statusCode: 404,
        message: "availableAt must be filled!",
      });
    }
    if (!transmission || transmission == "") {
      return next({
        statusCode: 404,
        message: "transmission must be filled!",
      });
    }
    if (!available || available == "") {
      return next({
        statusCode: 404,
        message: "available must be filled!",
      });
    }
    if (!type || type == "") {
      return next({
        statusCode: 404,
        message: "type must be filled!",
      });
    }
    if (!year || year == "") {
      return next({
        statusCode: 404,
        message: "year must be filled!",
      });
    }
    const payload = {
      id,
      plate,
      manufacture,
      model,
      image,
      rentPerDay,
      capacity,
      description,
      alevailabAt,
      transmission,
      available,
      type,
      year,
      updatedby:name
    };

    const data = await carUsecase.updateCar(id,payload, option, spec,id_option,id_spec);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await carUsecase.deleteCar(id);

    res.status(200).json({
      message: "Successs",
      data,
    });
  } catch (error) {
    next(error);
  }
};
