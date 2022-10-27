import Joi from "joi";
import jwt from "jsonwebtoken";

export const createUserSchema = Joi.object()
  .keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    avatar: Joi.string(),
    isVerified: Joi.boolean(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    phoneNumber: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))

      .required()

      .label("Confirm password")

      .messages({ "any.only": "{{#label}} does not match" }),
  })
  .with("password", "confirmPassword");

export const loginUserSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase(),
  username: Joi.string().trim().lowercase(),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object()
  .keys({
    password: Joi.string().required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))

      .required()

      .label("Confirm password")

      .messages({ "any.only": "{{#label}} does not match" }),
  })
  .with("password", "confirmPassword");

export const generateToken = (user: Record<string, unknown>): unknown => {
  const passPhrase = process.env.JWT_SECRETE as string;
  return jwt.sign(user, passPhrase, { expiresIn: "7d" });
};

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const userUpdateSchema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().trim().lowercase(),
  phoneNumber: Joi.string(),
  avatar: Joi.string(),
});

export const sendEmail = Joi.object().keys({
  from: Joi.string(),
  to: Joi.string().required(),
  subject: Joi.string().required(),
  text: Joi.string(),
  html: Joi.string().required(),
});
