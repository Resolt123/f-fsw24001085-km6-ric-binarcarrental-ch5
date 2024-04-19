const bcrypt = require("bcrypt");
const { user } = require("../../models");
const { getData, setData } = require("../../helper/redis");

exports.createUser = async (payload) => {
  // encrypt the password
  payload.password = bcrypt.hashSync(payload.password, 10);

  // save to db
  const data = await user.create(payload);

  // save to redis (email and id)
  const keyID = `user:${data.id}`;
  await setData(keyID, data, 300);

  const keyEmail = `user:${data.email}`;
  await setData(keyEmail, data, 300);

  return data;
};

exports.getUserByID = async (id) => {
  const key = `user:${id}`;

  // get from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // get from db
  data = await user.findAll({
    where: {
      id,
    },
  });
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`User is not found!`);
};

exports.getUserByEmail = async (email) => {
  const key = `user:${email}`;

  // get from redis
  let data = await getData(key);
  if (data) {
    return data;
  }

  // get from db
  data = await user.findAll({
    where: {
      email,
    },
  });
  if (data.length > 0) {
    // save to redis
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`User is not found!`);
};

exports.updateRole = async (id, payload) => {
 const key = `user:${id}`;
 // update data to postgres
  await user.update(payload, {
    where: {
      id,
    },
  });

  // get data from postgres
  const data = await user.findAll({
    where: {
      id,
    },
  });
  if (data.length > 0) {
    // save to redis (cache)
    await setData(key, data[0], 300);

    return data[0];
  }

  throw new Error(`user is not found!`);
};