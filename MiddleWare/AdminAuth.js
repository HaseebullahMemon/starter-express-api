import jwt from "jsonwebtoken";
import Admin from '../Modal/AdminModal.js'
const isAuthAdmin = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send({succes:false,message: "Access Denied",data:[]});
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // const decode = await jwt.verify(token,process.env.JWT_SK);
  // const admin= await Admin.findById(decode._id);
  //   if(!admin){
  //     return res.status(403).send({succes:false,message: "Access Denied",data:[]});
  //   }
    next();
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
      data: [],
    });
  }
};
export default isAuthAdmin