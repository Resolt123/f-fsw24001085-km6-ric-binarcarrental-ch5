const optionRepo = require("../../repository/option/index");

exports.getOptions = async () => {
  const data = await optionRepo.getOptions();
  return data;
};

exports.getOption = async (id) => {
  const data = await optionRepo.getOption(id);
  return data;
};

exports.createOption = async (payload) => {
  const data = await optionRepo.createOption(payload);
  return data;
};

exports.updateOption = async (id, payload) => {
  // update old data
  await optionRepo.updateOption(id, payload);

  // find the new data
  const data = await optionRepo.getOption(id);

  return data;
};

exports.deleteOption = async (id) => {
  const data = await optionRepo.deleteOption(id);
  return data;
};
