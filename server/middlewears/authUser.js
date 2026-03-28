import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = req.cookies;
    
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const tokenDecoded = jwt.verify(token, process.env.Jwt_Secret);
        if (tokenDecoded.id) {
            req.userId = tokenDecoded.id;
        } else{
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message || "Unauthorized" });
    }
}