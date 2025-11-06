import jwt from "jsonwebtoken";
import userModel from "../models/users.js";

export const authentication = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập" });
  }

  const token = bearerToken.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Tài khoản không tồn tại" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token không hợp lệ hoặc hết hạn" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin mới được phép" });
  }
  next();
};
