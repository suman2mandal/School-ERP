import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import studentRoute from "./routes/studentRoutes.js";
import feesRoute from "./routes/feesRoutes.js";
import schoolRoute from "./routes/schoolRoutes.js"
import empRoute from "./routes/empRoutes.js"
import attendanceRoute from "./routes/attendanceRoutes.js"
import studentFeesRoute from "./routes/studentFeesRoutes.js"
import jwt from "jsonwebtoken";

const serverPort = process.env.PORT || 5000;
const apiServer = express();
apiServer.use(express.json());
apiServer.use(express.urlencoded({ extended: false }));
apiServer.use(bodyParser.json());
apiServer.use(cookieParser());

apiServer.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

const post =[
    {
        username:'admin',
        tilte:'post 1'
    },
    {
        username:'admin2',
        tilte:'post 2'
    }
]

function generateAccessToken(user){
    return jwt.sign(user,process.env.jwtSecrets,{expiresIn:'15s'})
}

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)

    jwt.verify(token,process.env.jwtSecrets,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
let storerefreshToken = [];
mongoose
    .connect(process.env.mongodbUri)
    .then(() => {
        apiServer.get('/', (req, res) => {
            res.send("Welcome 👋 to School ERP 👩‍🏫");
        });

        apiServer.use("/api/students", studentRoute);
        apiServer.use("/api/fees", feesRoute);
        apiServer.use("/api/school", schoolRoute)
        apiServer.use("/api/emp", empRoute)
        apiServer.use("/api/attendance", attendanceRoute)
        apiServer.use("/api/studentfees", studentFeesRoute)
        apiServer.get('/posts',authenticateToken,(req,res)=>{
            console.log(req.user.name);
            res.json(post.filter(post => post.username === req.user.name));
        })

        apiServer.post('/login',(req,res)=>{
            const username = req.body.username;
            console.log(username);
            const user = {name:username}

            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user,process.env.refreshTokenSecrets);
            storerefreshToken.push(refreshToken);
            res.json({accessToken:accessToken,refreshToken:refreshToken});
        })

        apiServer.post('/token',(req,res)=>{
            const refreshToken = req.body.token;
            if(refreshToken == null) return res.sendStatus(401)

            if(!storerefreshToken.includes(refreshToken)) return res.sendStatus(403)
            jwt.verify(refreshToken,process.env.refreshTokenSecrets,(err,user)=>{
                if(err) return res.sendStatus(403)
                const accessToken = generateAccessToken({name:user.name})
                res.json({accessToken:accessToken})
            })
        });

        apiServer.delete('/logout',(req,res)=>{
            storerefreshToken = storerefreshToken.filter(token => token !== req.body.token)
            res.sendStatus(204)
        })

        apiServer.listen(serverPort, () => {
            console.log(`Server running on port: ${serverPort}`);
        });
    })
    .catch((err) => console.log(err));
