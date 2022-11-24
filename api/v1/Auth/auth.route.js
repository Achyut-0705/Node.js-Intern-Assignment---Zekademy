const express = require("express");

const authControllers = require("../../../controllers/auth.controller.js");
const logger = require("../../../utils/logger.js");

const router = express.Router();

router.get("/", (req, res) => {
  logger.info("Inside the GET /api/v1/ route");
  res.send({ status: true, message: "Hello World!" });
});

/**
 * Payload
{
email: <email: string>,
first_name: <first_name: string>,
last_name: <last_name: string>,
password: <password: string>,
age: <age: number>,
city: <city: string>
}

Response
{
status: 200,
message: “Success”,
jwt_token: <token>
}

Email User
Send a confirmation email to the user email ID using Nodemailer for successful registration.

 */
router.post("/register", authControllers.register);

/**
 * Payload
{
email: <email: string>,
password: <password: string>
}

Response
{
status: 200,
message: “Success”,
jwt_token: <token>
}

 */

router.post("/login", authControllers.login);

/**
 * Payload - Image Binary File

Response
{
status: 200,
message: “Success”,
img_id: <image_id: string>
}
 */

module.exports = router;
