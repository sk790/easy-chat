import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuthenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({ success: false, error: "Please validate valid token" });
  }
  const user = await User.findById(decoded.userId).select("-password");
  if (!user) {
    return res.status(401).json({ success: false, error: "User not found" });
  }
  req.user = user;
  next();
};

export default isAuthenticate;
