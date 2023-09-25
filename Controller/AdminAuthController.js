import Admin from '../Modal/AdminModal.js'
import { sendToken } from '../Utilies/sendToken.js';


export const RegisterAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                succes: false,
                message: "Please Enter All Fields",
                data: [],
              });
        }
        const admin=await Admin.findOne({email:email}).select("+")
        if(admin){
            return res.status(400).json({
                succes: false,
                message: "Admin email is already registered",
                data: [],
              });
        }
        const new_admin=await Admin.create({email,password})
        return res.status(200).json({
            succes: true,
            message: "Admin created successfully",
            data: [],
          });
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: error.message,
            data: [],
          }); 
    }
}



export const LoginAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body
        if (!password||!email) {
            return res.status(400).json({
              succes: false,
              message: "Please Enter All Fields",
              data: [],
            });
          }
          
    const admin = await Admin.findOne({ email:email }).select("+password");
    console.log(admin)

 if (!admin) {
      return res.status(400).json({
        succes: false,
        message: "Invailed creaditional admin",
        data: [],
      });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        succes: false,
        message: "Invalid email or passowd",
        data: [],
      });
    }
    sendToken(res, admin, 200, "Login Successfully");
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: error.message,
            data: [],
          });
    }
}

export const GetAllAdmin=async(req,res)=>{
    try {
        
        const getAllAdmin=await Admin.find()

    return res.status(200).json({
            succes: true,
            message: "",
            data:getAllAdmin,
          });
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: error.message,
            data: [],
          });
    }
    
}





export const DeleteAdmin=async(req,res)=>{
    try {
        const {id}=req.params
    const deleteAdmin=await Admin.findByIdAndDelete(id)
    return res.status(200).json({
        succes: true,
        message: "Admin Delete successfully",
        data:[],
      });
        
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: error.message,
            data: [],
          });
    }


}