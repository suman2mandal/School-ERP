import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import School from "../models/schoolModel.js"
import Token from "../models/tokenModel.js"

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.jwtSecrets, {
        expiresIn: "1d"
    })
}

const addSchool = asyncHandler(async (req, res) => {

    const { schoolName, schoolPassword } = await req.body

    const school = await School.create({
        schoolName,
        schoolPassword
    })

    const schoolAddToken = generateToken(school._id)

    res.cookie("Token", schoolAddToken, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // Expires in one day
        sameSite: 'none',
        secure: true
    })

    if (school) {
        const { schoolName, schoolPassword } = school

        res.status(201).json({
            schoolName,
            schoolPassword
        })
    }
    else {
        res.status(400).json({ error: "School not added" })
    }



})

export { addSchool }