import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
	try {
		const bearerToken = req.headers.authorization;
		const token = bearerToken.split(" ")[1];
		if (!token) return res.status(401).json("no token, access denied.");
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = decoded;
		next();
	} catch (e) {
		res.status(500).json(e);
	}
};

export { protect };
