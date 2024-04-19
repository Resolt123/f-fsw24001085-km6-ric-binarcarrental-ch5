const { car, car_options, car_specs, option, spec } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");

exports.getSpecs = async () => {
  const data = await spec.findAll({});
  return data;
};

exports.getSpec = async (id) => {
  const key = `spec:${id}`;

  // check redis and if there are any data return data from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // if in the redis not found, we will get from database (postgres) and then save it to redis
  data = await spec.findAll({
    where: {
      id,
    },
  });
  if (data.length > 0) {
    // save in the redis if in the postgres is found
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`spec is not found!`);
};

exports.createSpec = async (payload) => {
  // Create data to postgres
  const data = await spec.create(payload);

  // Save to redis (cache)
  const key = `spec:${data.id}`;
  await setData(key, data, 300);

  return data;
};

exports.updateSpec = async (id, payload) => {
  const key = `spec:${id}`;

  // update data to postgres
  await spec.update(payload, {
    where: {
      id,
    },
  });

  // get data from postgres
  const data = await spec.findAll({
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

exports.deleteSpec = async (id) => {
  const key = `spec:${id}`;

  // delete from postgres
  await spec.destroy({ where: { id } });

  // delete from redis
  await deleteData(key);

  return null;
};
