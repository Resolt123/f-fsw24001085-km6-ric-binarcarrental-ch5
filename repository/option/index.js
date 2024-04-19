const { car, car_options, car_specs, option, spec } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");


exports.getOptions = async () => {
  const data = await option.findAll({});
  return data;
};

exports.getOption = async (id) => {
  const key = `options:${id}`;

  // check redis and if there are any data return data from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // if in the redis not found, we will get from database (postgres) and then save it to redis
  data = await option.findAll({
    where: {
      id,
    },
  });
  if (data.length > 0) {
    // save in the redis if in the postgres is found
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`option is not found!`);
};

exports.createOption = async (payload) => {
  // Create data to postgres
  const data = await option.create(payload);

  // Save to redis (cache)
  const key = `options:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.updateOption = async (id, payload) => {
  const key = `options:${id}`;

  // update data to postgres
  await option.update(payload, {
    where: {
      id,
    },
  });

  // get data from postgres
  const data = await option.findAll({
    where: {
      id,
    },
  });
  if (data.length > 0) {
    // save to redis (cache)
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`option is not found!`);
};

exports.deleteOption = async (id) => {
  const key = `options:${id}`;

  // delete from postgres
  await option.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
};
