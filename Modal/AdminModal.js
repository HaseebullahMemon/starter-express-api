import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const AdminSchema= mongoose.Schema({
    email:{
        type:String,
        max: 50,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true,
        min: 5,
        select: false,
    },
})

AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  });
  AdminSchema.methods.GetToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SK, {
      expiresIn: 30000,
    });
  };
  AdminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };





export default mongoose.model("Admin",AdminSchema)