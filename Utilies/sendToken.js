export const sendToken = (res, user, statusCode, message) => {
  const token = user.GetToken();
  const userData = {
    _id: user._id,
    email: user.email,
    token,
  };

  res.status(statusCode).json({ success: true, message, data: userData });
};