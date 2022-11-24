const createError = require("http-errors");

const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const db = require("../models/index.js");
const sequelize = db.sequelize;
const Image = db.Image;

dotenv.config();

const region = process.env.AWS_REGION;
const bucket_name = process.env.AWS_BUCKET_NAME;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: region,
  ACL: "public-read",
});

const s3 = new AWS.S3();

exports.upload = async (req, res, next) => {
  try {
    if (!req.file) {
      next(createError(400, "No file uploaded"));
      return;
    }

    // get file data from request
    const file = req.file.buffer;
    // extract file extension from file name
    const imageExtension = req.file.originalname.split(".").pop();
    // generate unique file name using current timestamp
    const key = `${Date.now()}.${imageExtension}`;

    const params = {
      Bucket: bucket_name,
      Key: `images/${key}`,
      Body: file,
    };

    // upload file to s3 bucket
    s3.upload(params, async (err, data) => {
      if (err) {
        console.log(err);
        next(createError(400, "Unable to upload image"));
        return;
      }

      //   map key to image id in database
      await Image.create({
        image: key,
        user_id: req.user.id,
      });

      res.send({
        status: 200,
        message: "Success",
        data: data,
      });
    });
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
};

exports.getImage = async (req, res, next) => {
  try {
    // get image id from request params
    const key = req.params.image_id;
    if (!key) {
      next(createError(400, "Image id is required"));
      return;
    }

    await sequelize.transaction(async (transaction) => {
      // check if image exists in database
      const image = await Image.findOne({
        where: {
          image: key,
        },
        transaction,
      });

      //   if image does not exist, return 404
      if (!image) {
        next(createError(404, "Image not found"));
        return;
      }

      const params = {
        Bucket: bucket_name,
        Key: `images/${key}`,
      };

      //   get image from s3 bucket
      s3.getObject(params, (err, data) => {
        if (err) {
          console.log(err);
          next(createError(400, "Unable to get image"));
          return;
        }

        res.send({
          status: 200,
          message: "Success",
          image: `https://zekademyachyut.s3.ap-south-1.amazonaws.com/images/${key}`,
        });
      });
    });
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
};
