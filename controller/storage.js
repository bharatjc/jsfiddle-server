const Data = require("../model/Data");
const Joi = require("joi");
const mongoose = require("mongoose");

async function savedata(req, res) {
  try {
    const DataSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      html: Joi.string().required(),
      css: Joi.string().allow(""),
      js: Joi.string().allow(""),
    });
    let status = DataSchema.validate(req.body, {
      allowUnknown: true,
      abortEarly: false,
    });
    if (status.error) {
      let errors = status.error.details.map((detail) => {
        return {
          message: detail.message,
          field: detail.context.key,
        };
      });
      return res.status(400).send({
        msg: "Bad request",
        errors,
      });
    }

    const existingData = await Data.findOne({ title: req.body.title });
    if (existingData) {
      return res.status(400).send({
        msg: "A file with this title already exists.",
      });
    }
    let product = await Data.create({
      ...req.body,
      user: req.user._id,
    });
    return res.send(product.title);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
}

async function getdata(req, res) {
  try {
    const title = req.params.title;
    const result = await Data.find({ title: title });
    res.send(result);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("An error occurred while retrieving data.");
  }
}

async function gettitles(req, res) {
  try {
    const user = req.params.userId;
    const objectId = new mongoose.Types.ObjectId(user);
    const storedFiles = await Data.find({ user: objectId });
    const titles = storedFiles.map((doc) => doc.title);
    return res.send(titles);
  } catch (err) {
    console.error("Error retrieving titles:", err);
    return res.status(500).send(`Error: ${err.message}`);
  }
}

async function deletefile(req, res) {
  try {
    const title = req.params.title;
    await Data.deleteOne({ title });
    return res.send("File removed successfully");
  } catch (err) {
    return res.send(`Error: ${err.message}`);
  }
}

module.exports = { savedata, getdata, gettitles, deletefile };
