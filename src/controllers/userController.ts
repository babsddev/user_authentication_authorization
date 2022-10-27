import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import cloudinary from 'cloudinary'
import { UserInstance } from '../models/users'
import {
  createUserSchema,
  options,
  generateToken,
  loginUserSchema,
  changePasswordSchema,
  userUpdateSchema,
} from '../utils/utils'
import bcrypt from 'bcryptjs'
import {
  emailVerificationView,
  forgotPasswordVerification,
} from '../email/emailVerification'
import jwt from 'jsonwebtoken'
import Mailer from '../email/sendMail'

const passPhrase = 'process.env.JWT_SECRETE as string'
const fromUser = 'test@test.test'
const subject = 'SUBJECT as string'

export async function createUser(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    let newId = uuidv4()
    const validationResult = createUserSchema.validate(req.body, options)
    if (validationResult.error) {
      return res.status(400).json({
        error: validationResult.error.details[0].message,
      })
    }

    const duplicateEmail = await UserInstance.findOne({
      where: { email: req.body.email },
    })
    if (duplicateEmail) {
      return res.status(409).json({
        error: 'email is already taken',
      })
    }

    const duplicatePhoneNumber = await UserInstance.findOne({
      where: {
        phoneNumber: req.body.phoneNumber,
      },
    })

    if (duplicatePhoneNumber) {
      return res.status(409).json({
        error: 'phone number already exists',
      })
    }

    const duplicateUsername = await UserInstance.findOne({
      where: {
        username: req.body.username,
      },
    })

    if (duplicateUsername) {
      return res.status(409).json({
        error: 'Username already taken',
      })
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8)

    const record = await UserInstance.create({
      id: newId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      avatar: '',
      email: req.body.email,
      password: passwordHash,
      phoneNumber: req.body.phoneNumber,
      isVerified: false,
    })

    const emailUser = (await UserInstance.findOne({
      where: { email: req.body.email },
    })) as unknown as {
      [key: string]: string
    }

    const id = emailUser.id

    const token = jwt.sign({ id }, passPhrase, { expiresIn: '30mins' })

    const html = emailVerificationView(token)
    // await Mailer.sendEmail(fromUser, req.body.email, subject, html)

    return res.status(201).json({
      message: 'user created successfully',
      record,
      token,
    })
  } catch (error) {
    res.status(500).json({
      message: 'error',
    })
    throw new Error(`${error}`)
  }
}

export async function loginUser(req: Request, res: Response): Promise<unknown> {
  try {
    const { username, email, password } = req.body

    const validationResult = loginUserSchema.validate(req.body, options)

    if (validationResult.error) {
      return res
        .status(400)
        .json({ Error: validationResult.error.details[0].message })
    }

    let User
    if (username) {
      User = (await UserInstance.findOne({
        where: { username: username },
      })) as unknown as { [key: string]: string }
    } else if (email) {
      User = (await UserInstance.findOne({
        where: { email: email },
      })) as unknown as { [key: string]: string }
    } else {
      return res.json({ message: 'Username or email is required' })
    }

    if (!User) {
      return res.status(404).json({ Error: 'User not found' })
    }

    const { id } = User

    const token = generateToken({ id })

    const validUser = await bcrypt.compare(password, User.password)
    if (!validUser) {
      return res.status(401).json({ message: 'Password do not match' })
    }
    if (validUser) {
      return res.status(200).json({ message: 'Login successful', token, User })
    }
  } catch (error) {
    res.status(500).json({
      message: 'failed to login user',
    })
    throw new Error(`${error}`)
  }
}

export async function verifyUser(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const { token } = req.params

    const verified = jwt.verify(token, passPhrase)

    const { id } = verified as { [key: string]: string }

    const record = await UserInstance.findOne({
      where: {
        id: id,
      },
    })

    await record?.update({
      isVerified: true,
    })

    // return res.json({ updatedRecord });
    return res.status(302).redirect(`${process.env.FRONTEND_URL}/login`)
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
    })
    throw new Error(`${error}`)
  }
}

export async function forgotPassword(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const { email } = req.body
    const user = (await UserInstance.findOne({
      where: {
        email: email,
      },
    })) as unknown as { [key: string]: string }

    if (!user) {
      return res.status(404).json({
        message: 'email not found',
      })
    }
    const { id } = user
    const html = forgotPasswordVerification(id)
    await Mailer.sendEmail(fromUser, req.body.email, subject, html)

    res.status(200).json({
      message: 'Check email for the verification link',
    })
  } catch (error) {
    res.status(500)
    throw new Error(`${error}`)
  }
}

export async function changePassword(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const { id } = req.params

    const validationResult = changePasswordSchema.validate(req.body, options)
    if (validationResult.error) {
      return res.status(400).json({
        error: validationResult.error.details[0].message,
      })
    }

    const user = await UserInstance.findOne({
      where: {
        id: id,
      },
    })
    if (!user) {
      return res.status(403).json({
        message: 'user does not exist',
      })
    }
    const passwordHash = await bcrypt.hash(req.body.password, 8)

    await user?.update({
      password: passwordHash,
    })
    return res.status(200).json({
      message: 'Password Successfully Changed',
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    })
    throw new Error(`${error}`)
  }
}

export async function updateUserRecord(
  req: Request,
  res: Response
): Promise<unknown> {
  try {
    const { id } = req.params
    const record = await UserInstance.findOne({ where: { id } })

    if (!record) {
      return res.status(500).json({ message: 'Invalid ID, User not found' })
    }

    cloudinary.v2.config({
      cloud_name: process.env.ClOUDINARY_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    })

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      // only jpg, png, svg, and jpeg formats
      allowed_formats: ['jpg', 'png', 'svg', 'jpeg'],
      // generates a new id for each uploaded image
      public_id: '',
      // folder where the images are stored in the Cloud
      folder: 'Airtime_to_Cash_Pod_G',
    })

    if (!result) {
      throw new Error(
        'Image is not a valid format. Put in either an svg, png, jpg or jpeg'
      )
    }

    const updateRecord = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      avatar: result.url,
    }
    console.log('line 300')

    const validateUpdate = userUpdateSchema.validate(updateRecord, options)

    if (validateUpdate.error) {
      return res
        .status(400)
        .json({ Error: validateUpdate.error.details[0].message })
    }

    const updateUserRecord = await record?.update(updateRecord)

    return res.status(200).json({
      message: 'Update Successful',
      record: updateUserRecord,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to update record',
      route: '/patch/:id',
    })
  }
}
