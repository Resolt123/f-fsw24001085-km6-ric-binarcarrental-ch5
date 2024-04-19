const carRepo = require("../../repository/car/index");

exports.getCars = async () => {
  const data = await carRepo.getCars();
  return data;
};

exports.getCar = async (id) => {
  const data = await carRepo.getCar(id);
  return data;
};

exports.createCar = async (payload,id,option,spec) => {
  const data = await carRepo.createCar(payload,id,option,spec);
  return data;
};

exports.updateCar = async (id, payload, option, spec, id_option, id_spec) => {
  // update old data
  await carRepo.updateCar(id, payload, option, spec, id_option, id_spec);

  // find the new data
  const data = await carRepo.getCar(id);

  return data;
};

exports.deleteCar = async (id) => {
  const data = await carRepo.deleteCar(id);
  return data;
};
