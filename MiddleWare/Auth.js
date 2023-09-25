import jwt from "jsonwebtoken";
import User from '../Modal/UserModal.js'
const isAuth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send({succes:false,message: "Access Denied",data:[]});
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const decode = await jwt.verify(token, process.env.JWT_SK);
    console.log("hello world")
    req.user = await User.findById(decode._id);
    if(!req.user.isVerified){
      return res.status(403).send({succes:false,message: "Access Denied",data:[]});
    }
    next();
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
      data: [],
    });
  }
};
export default isAuth