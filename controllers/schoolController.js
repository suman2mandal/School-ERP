import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import School from "../models/schoolModel.js";
import Token from "../models/tokenModel.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.jwtSecrets, {
        expiresIn: "1d",
    });
};

const addSchool = asyncHandler(async (req, res) => {
    const { schoolName, schoolLocation, schoolEstablished, schoolPassword } =
        req.body;
    const school = await School.create({
        schoolName,
        schoolLocation,
        schoolEstablished,
        schoolPassword,
    });

    const schoolAddToken = generateToken(school._id);

    res.cookie("Token", schoolAddToken, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // Expires in one day
        sameSite: "none",
        secure: true,
    });

    if (school) {
        res.status(201).json({
            schoolName,
            schoolLocation,
            schoolEstablished,
        });
    } else {
        res.status(400).json({ error: "School not added" });
    }
});

const loginSchool = asyncHandler(async (req, res) => {
    const { schoolName, schoolPassword } = req.body;
    const school = await School.findOne({ schoolName });

    if (!school) {
        res.status(201).json({ error: "No school found" });
    }
    const passwordIsCorrect = await bcrypt.compare(
        schoolPassword,
        school.schoolPassword
    );
    const schoolLoginToken = generateToken(school._id);

    res.cookie("Token", schoolLoginToken, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
    });

    if (passwordIsCorrect) {
        res.status(200).json({
            schoolName,
            schoolLocation: school.schoolLocation,
            schoolEstablished: school.schoolEstablished,
        });
    } else {
        res.status(400).json({ error: "Wrong password" });
    }
});

const updateSchool = asyncHandler(async (req, res) => {
    const { schoolName, updatedFields } = req.body;
    const school = await School.findOne({ schoolName });

    if (!school) {
        return res.status(404).json({ error: "School not found" });
    }
    Object.assign(school, updatedFields);
    await school.save();

    res.status(200).json({
        schoolName,
        updatedFields,
    });
});

const deleteSchool = asyncHandler(async (req, res) => {
    const { schoolName } = req.params;
    const result = await School.deleteOne({ schoolName });

    if (result.deletedCount === 0) {
        return res.status(404).json({ error: "School not found" });
    }

    res.status(200).json({ message: "School deleted successfully" });
});

export { addSchool, loginSchool, updateSchool, deleteSchool };
