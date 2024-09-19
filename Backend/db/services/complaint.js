import model from "../models/index.js";
const create = async (data, next) => {
  try {
    return await model.complaint.create(data);
  } catch (error) {
    console.log("error.........    ", error);
  }
};

const get = async (filter, next) => {
  try {
    return await model.complaint.findOne(filter);
  } catch (error) {
    console.log("error.........    ", error);
  }
};
const update = async (data, filter, next) => {
  try {
    return await model.complaint.update(data, filter);
  } catch (error) {
    console.log("error.........    ", error);
  }
};
const getAll = async (filter, next) => {
  try {
    return await model.complaint.findAll(filter);
  } catch (error) {
    console.log("error.........    ", error);
  }
};

export default {
  get,
  create,
  update,
  getAll,
};
