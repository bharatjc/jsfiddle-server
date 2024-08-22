const Data = require("../model/Data");
const Joi = require("joi");
const sanitizeHtml = require("sanitize-html");

async function savedata(req, res) {
  try {
    const DataSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      htmlcode: Joi.string().required(),
      csscode: Joi.string(),
      jscode: Joi.string(),
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

    req.body.htmlcode = sanitizeHtml(req.body.htmlcode, {
      allowedTags: [],
      allowedAttributes: {},
    });
    req.body.csscode = sanitizeHtml(req.body.csscode, {
      allowedTags: [],
      allowedAttributes: {},
    });
    req.body.jscode = sanitizeHtml(req.body.jscode, {
      allowedTags: [],
      allowedAttributes: {},
    });

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
    const title = req.body;
    const result = await Data.find(title);
    res.send(result);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("An error occurred while retrieving data.");
  }
}

module.exports = { savedata, getdata };
