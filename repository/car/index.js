const { car, car_options, car_specs, option, spec } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");
const { uploader } = require("../../helper/cloudinary");
const crypto = require("crypto");
const path = require("path");
const { Op } = require("sequelize");

exports.getCars = async () => {
  const data = await car.findAll({
    include: [
      {
        model: car_options,
        attributes: ["id", "id_option", "id_car"],
        include: {
          model: option,
          attributes: ["type_option"],
          where: {
            id: { [Op.ne]: null },
          },
        },
      },
      {
        model: car_specs,
        attributes: ["id", "id_spec", "id_car"],
        include: {
          model: spec,
          attributes: ["type_spec"],
          where: {
            id: { [Op.ne]: null },
          },
        },
      },
    ],
  });
  return data;
};

exports.getCar = async (id) => {
  const key = `cars:${id}`;

  // check redis and if there are any data return data from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // if in the redis not found, we will get from database (postgres) and then save it to redis
  data = await car.findAll({
    where: {
      id,
    },
    include: [
      {
        model: car_options,
        attributes: ["id", "id_option", "id_car"],
        include: {
          model: option,
          attributes: ["type_option"],
          where: {
            id: { [Op.ne]: null },
          },
        },
      },
      {
        model: car_specs,
        attributes: ["id", "id_spec", "id_car"],
        include: {
          model: spec,
          attributes: ["type_spec"],
          where: {
            id: { [Op.ne]: null },
          },
        },
      },
    ],
  });
  if (data.length > 0) {
    // save in the redis if in the postgres is found
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Car is not found!`);
};

exports.createCar = async (payload, id, option, spec) => {
  if (payload.image) {
    // upload image to cloudinary
    const { image } = payload;

    image.publicId = crypto.randomBytes(16).toString("hex");

    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    // Process to upload image
    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }

  // Create data to postgres
  const data = await car.create(payload);
  for (let index = 0; index < option.length; index++) {
    await car_options.create({
      id_car: id,
      id_option: option[index],
    });
  }
  for (let index = 0; index < spec.length; index++) {
    await car_specs.create({
      id_car: id,
      id_spec: spec[index],
    });
  }

  // Save to redis (cache)
  const key = `cars:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.updateCar = async (id, payload, option, spec, id_option, id_spec) => {
  const key = `cars:${id}`;
  if (payload.image) {
    // upload image to cloudinary
    const { image } = payload;

    image.publicId = crypto.randomBytes(16).toString("hex");

    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    // Process to upload image
    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }

  // update data to postgres
  await car.update(payload, {
    where: {
      id,
    },
  });

  for (let index = 0; index < option.length; index++) {
    await car_options.update(
      { id_option: option[index] },
      {
        where: {
          id_car: id,
          id_option: id_option[index],
        },
      }
    );
  }
  for (let index = 0; index < spec.length; index++) {
    await car_specs.update(
      { id_spec: spec[index] },
      {
        where: {
          id_car: id,
          id_spec: id_spec[index],
        },
      }
    );
  }

  // get data from postgres
  const data = await car.findAll({
    where: {
      id,
    },
  });
  if (data.length > 0) {
    // save to redis (cache)
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`Car is not found!`);
};

exports.deleteCar = async (id) => {
  const key = `cars:${id}`;

  // delete from postgres
  await car.destroy({ where: { id } });
  await car_options.destroy({ where: { id_car: id } });
  await car_specs.destroy({ where: { id_car: id } });

  // delete from redis
  await deleteData(key);

  return null;
};
