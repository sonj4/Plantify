const verifyAdmin = (req, res, next) => {
    // If the user is not an admin, return an error
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admin privileges are required." });
    }

    // If the user is an admin, proceed with the request
    next();
};

export default verifyAdmin;
