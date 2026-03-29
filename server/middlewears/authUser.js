import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(tokenDecoded);
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

export default authUser;