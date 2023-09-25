import User from '../Modal/UserModal.js'
import {sendMail}from '../Utilies/sendEmail.js'
import {sendToken}from '../Utilies/sendToken.js'

export const Register = async (req,res)=>{
    try {
        const {userName,email,password,role}=req.body
        if (
            !userName ||
            !email ||
            !role ||
            !password
          ) {
            return res.status(410).json({
              success: false,
              message: "Please enter Required Fields",
              data: [],
            });
          }
          let UserData;
          if(email){
            UserData = await User.findOne({ email });
           if (UserData) {
             return res.status(410).json({
               succes: false,
               message: "User is Already availble",
               data: [],
             });
           }
        }
        const otp=Math.floor(Math.random() * 100000);
        UserData = await User.create({
            userName,
            role,
            email,
            password,
            otp_number: otp,
            otp_expire: new Date(Date.now() + 60 * 1000 * 1000),
          });

  sendMail(email, "user Verification", `Verify Your Otp ${otp}`);
  res.status(200).json({ succes: true, message: "Verify Your Email" });
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: error.message,
            data: [],
          });
    }
}


export const Login =async(req,res)=>{
    try {
        const { email, password} = req.body;
        if (!password||!email) {
          return res.status(400).json({
            succes: false,
            message: "Please Enter All Fields",
            data: [],
          });
        }
    const UserData=await User.findOne({email:email});
    if(!UserData){
        return res.status(410).json({
            succes: false,
            message: "User is Not Found",
            data: [],
          });
    }

    if(!UserData.isVerified){
        const otp=Math.floor(Math.random() * 100000);
        UserData.otp_number=otp,
        UserData.otp_expire=new Date(Date.now() + 60 * 1000 * 1000)
        sendMail(UserData.email, "user Verification", `Verify Your Otp ${otp}`);
        await UserData.save()
        return res.status(200).json({
            succes: true,
            isVerified:false,
            message: "Verify Your Email",
            data: [],
          });
    }
    const isMatch = await UserData.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        succes: false,
        message: "Invalid email or passowd",
        data: [],
      });
    }
    sendToken(res, UserData, 200, "Login Successfully");
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: error.message,
            data: [],
          });
    }
}



export const VerifyOTP = async  (req,res)=>{
    try {
        const {email,otp}=req.body
        const UserData=await User.findOne({email:email})
        if(!UserData){
            return res.status(410).json({
                succes: false,
                message: "User is Not Found",
                data: [],
              });
        }
        if(otp==UserData.otp_number){
            UserData.otp_number=null
            UserData.otp_expire=null
            UserData.isVerified=true
    }
    await UserData.save()
    sendToken(res,UserData,200,"User Verify successfully")
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: error.message,
            data: [],
          });
    }
}

export const ResendOTP=async (req,res)=>{
    try {
     if(req.body.email){
       const user= await User.findOne({email:req.body.email})
        const otp=Math.floor(Math.random() * 100000);
       user.otp_number=otp
       user.save()
       sendMail(req.body.email, "user Verification", `Verify Your Otp ${otp}`);
       return res.status(200).json({
        succes: true,
        message: "OTP is Sended Successfully",
        data: [],
      });
     }
    } catch (error) {
     res.status(500).json({
       succes: false,
       message: error.message,
       data: [],
     });
    }
   }




export const ForgetPassword=async (req,res)=>{
    try {
     if(req.body.email){
       const user= await User.findOne({email:req.body.email})
        const otp=Math.floor(Math.random() * 100000);
       user.otp_number=otp
       user.save()
       sendMail(req.body.email, "user Verification", `Verify Your Otp ${otp}`); 
       sendToken(res,user,200,"Verify Your OTP")
     }
    } catch (error) {
     res.status(500).json({
       succes: false,
       message: error.message,
       data: [],
     });
    }
   }



   export const ChangePassword=async (req,res)=>{
    try {
        const {password}=req.body;
     if(req.user.email){
     req.user.password=password
     await  req.user.save()
     return res.status(200).json({
        succes: true,
        message: "User Password Changed Successfully",
        data: [],
      });

     }
    } catch (error) {
     res.status(500).json({
       succes: false,
       message: error.message,
       data: [],
     });
    }
   }


   export const getProfile=async(req,res)=>{
  try {
    return res
    .status(200)
    .json({ success: true, message: "", data:req.user });
}   
  catch (error) {
    return res.status(500).json({
      succes: false,
      message: error.message,
      data: [],
    });
  }
}

