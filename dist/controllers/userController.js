"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRecord = exports.changePassword = exports.forgotPassword = exports.verifyUser = exports.loginUser = exports.createUser = void 0;
const uuid_1 = require("uuid");
const cloudinary_1 = __importDefault(require("cloudinary"));
const users_1 = require("../models/users");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const emailVerification_1 = require("../email/emailVerification");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendMail_1 = __importDefault(require("../email/sendMail"));
const passPhrase = 'process.env.JWT_SECRETE as string';
const fromUser = 'test@test.test';
const subject = 'SUBJECT as string';
async function createUser(req, res) {
    try {
        let newId = (0, uuid_1.v4)();
        const validationResult = utils_1.createUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                error: validationResult.error.details[0].message,
            });
        }
        const duplicateEmail = await users_1.UserInstance.findOne({
            where: { email: req.body.email },
        });
        if (duplicateEmail) {
            return res.status(409).json({
                error: 'email is already taken',
            });
        }
        const duplicatePhoneNumber = await users_1.UserInstance.findOne({
            where: {
                phoneNumber: req.body.phoneNumber,
            },
        });
        if (duplicatePhoneNumber) {
            return res.status(409).json({
                error: 'phone number already exists',
            });
        }
        const duplicateUsername = await users_1.UserInstance.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (duplicateUsername) {
            return res.status(409).json({
                error: 'Username already taken',
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await users_1.UserInstance.create({
            id: newId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            avatar: '',
            email: req.body.email,
            password: passwordHash,
            phoneNumber: req.body.phoneNumber,
            isVerified: false,
        });
        const emailUser = (await users_1.UserInstance.findOne({
            where: { email: req.body.email },
        }));
        const id = emailUser.id;
        const token = jsonwebtoken_1.default.sign({ id }, passPhrase, { expiresIn: '30mins' });
        const html = (0, emailVerification_1.emailVerificationView)(token);
        // await Mailer.sendEmail(fromUser, req.body.email, subject, html)
        return res.status(201).json({
            message: 'user created successfully',
            record,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'error',
        });
        throw new Error(`${error}`);
    }
}
exports.createUser = createUser;
async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const validationResult = utils_1.loginUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ Error: validationResult.error.details[0].message });
        }
        let User;
        if (username) {
            User = (await users_1.UserInstance.findOne({
                where: { username: username },
            }));
        }
        else if (email) {
            User = (await users_1.UserInstance.findOne({
                where: { email: email },
            }));
        }
        else {
            return res.json({ message: 'Username or email is required' });
        }
        if (!User) {
            return res.status(404).json({ Error: 'User not found' });
        }
        const { id } = User;
        const token = (0, utils_1.generateToken)({ id });
        const validUser = await bcryptjs_1.default.compare(password, User.password);
        if (!validUser) {
            return res.status(401).json({ message: 'Password do not match' });
        }
        if (validUser) {
            return res.status(200).json({ message: 'Login successful', token, User });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'failed to login user',
        });
        throw new Error(`${error}`);
    }
}
exports.loginUser = loginUser;
async function verifyUser(req, res) {
    try {
        const { token } = req.params;
        const verified = jsonwebtoken_1.default.verify(token, passPhrase);
        const { id } = verified;
        const record = await users_1.UserInstance.findOne({
            where: {
                id: id,
            },
        });
        await record?.update({
            isVerified: true,
        });
        // return res.json({ updatedRecord });
        return res.status(302).redirect(`${process.env.FRONTEND_URL}/login`);
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
        });
        throw new Error(`${error}`);
    }
}
exports.verifyUser = verifyUser;
async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        const user = (await users_1.UserInstance.findOne({
            where: {
                email: email,
            },
        }));
        if (!user) {
            return res.status(404).json({
                message: 'email not found',
            });
        }
        const { id } = user;
        const html = (0, emailVerification_1.forgotPasswordVerification)(id);
        await sendMail_1.default.sendEmail(fromUser, req.body.email, subject, html);
        res.status(200).json({
            message: 'Check email for the verification link',
        });
    }
    catch (error) {
        res.status(500);
        throw new Error(`${error}`);
    }
}
exports.forgotPassword = forgotPassword;
async function changePassword(req, res) {
    try {
        const { id } = req.params;
        const validationResult = utils_1.changePasswordSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                error: validationResult.error.details[0].message,
            });
        }
        const user = await users_1.UserInstance.findOne({
            where: {
                id: id,
            },
        });
        if (!user) {
            return res.status(403).json({
                message: 'user does not exist',
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        await user?.update({
            password: passwordHash,
        });
        return res.status(200).json({
            message: 'Password Successfully Changed',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
        throw new Error(`${error}`);
    }
}
exports.changePassword = changePassword;
async function updateUserRecord(req, res) {
    try {
        const { id } = req.params;
        const record = await users_1.UserInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(500).json({ message: 'Invalid ID, User not found' });
        }
        cloudinary_1.default.v2.config({
            cloud_name: process.env.ClOUDINARY_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
        });
        const result = await cloudinary_1.default.v2.uploader.upload(req.body.avatar, {
            // only jpg, png, svg, and jpeg formats
            allowed_formats: ['jpg', 'png', 'svg', 'jpeg'],
            // generates a new id for each uploaded image
            public_id: '',
            // folder where the images are stored in the Cloud
            folder: 'Airtime_to_Cash_Pod_G',
        });
        if (!result) {
            throw new Error('Image is not a valid format. Put in either an svg, png, jpg or jpeg');
        }
        const updateRecord = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            avatar: result.url,
        };
        console.log('line 300');
        const validateUpdate = utils_1.userUpdateSchema.validate(updateRecord, utils_1.options);
        if (validateUpdate.error) {
            return res
                .status(400)
                .json({ Error: validateUpdate.error.details[0].message });
        }
        const updateUserRecord = await record?.update(updateRecord);
        return res.status(200).json({
            message: 'Update Successful',
            record: updateUserRecord,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Failed to update record',
            route: '/patch/:id',
        });
    }
}
exports.updateUserRecord = updateUserRecord;
//# sourceMappingURL=userController.js.map