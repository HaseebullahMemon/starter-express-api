import UserModal from "../Modal/UserModal.js";

export const getAllUser= async(req,res)=>{
    try {
        const alluser=await UserModal.find()
        return res
        .status(200)
        .json({ success: true, message: "", data:alluser });
        
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: error.message,
            data: [],
          });
    }
}