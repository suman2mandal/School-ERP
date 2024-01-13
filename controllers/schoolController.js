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

    const { schoolId, schoolPassword } = await req.body

    const school = await School.create({
        schoolId,
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
            schoolId,
            schoolPassword
        })
    }
    else {
        res.status(400).json({ error: "School not added" })
    }



})

const loginSchool = asyncHandler(async (req, res) => {
    const { schoolId, schoolPassword } = req.body

    // Check if school exists
    const school = await School.findOne({ schoolId })

    if (!school) {
        res.status(201).json({ error: "No school found" })
    }

    const passwordIsCorrect = await bcrypt.compare(schoolPassword, school.schoolPassword)

    const schoolLoginToken = generateToken(school._id)

    //Send http only cookie
    res.cookie("Token", schoolLoginToken, {
        path: '/',
        httpOnly: 'true',
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: 'none',
        secure: true
    })

    if (passwordIsCorrect) {
        res.status(200).json({
            schoolId,
            schoolPassword
        })
    }
    else {
        res.status(400).json({ error: "Wrong password" })
    }
})



export { addSchool, loginSchool }