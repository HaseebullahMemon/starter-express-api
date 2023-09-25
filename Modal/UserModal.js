import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      min: 2,
      max: 100,
    },
    picture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    email: {
      type: String,
      max: 50,
    },
    role: {
      type: [String],
      enum: ["customer", "service"],
      default: "customer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    password:{
      type:String,
      required:true
    },
    otp_number: Number,
    otp_expire: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});
UserSchema.methods.GetToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SK, {
    expiresIn: 3000,
  });
};
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export default mongoose.model("User", UserSchema);
