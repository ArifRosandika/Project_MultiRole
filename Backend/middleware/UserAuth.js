import Users from "../models/UserMod.js";

export const userVerify = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await Users.findOne({ where: { uuid: req.session.userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.userId = user.uuid;  
    req.role = user.role;   

    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const onlyAdmin = async (req, res, next) => {
    const user = await Users.findOne({ where: { uuid: req.session.userId } });

    if(!user) return res.status(404).json({ error: "User not found" });
    if(user.role !== "admin") return res.status(403).json({ error: "Admin only" });
    next();
}