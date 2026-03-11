import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
	try {
		if (!req.body) return res.status(400).json("All fields are necessary.");
		const { name, email, password } = req.body;
		if (!(name && email && password)) {
			return res.status(400).json("All fields are necessary.");
		}
		const userExists = await User.findOne({ email });
		if (userExists) return res.status(400).json("User already exists.");

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});
		res.status(201).json("User registered succesfully!");
	} catch (e) {
		console.log(e.message);
		res.status(500).json(e);
	}
};

const loginUser = async (req, res) => {
	try {
		if (!req.body) return res.status(400).json("All fields are necessary.");
		const { email, password } = req.body;
		if (!(email && password)) {
			return res.status(400).json("All fields are necessary");
		}
		const user = await User.findOne({ email });
		if (!user) return res.status(404).json("User not found!");
		const validUser = await bcrypt.compare(password, user.password);
		if (!validUser) return res.status(400).json("Invalid credentials.");

		const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
			expiresIn: "7d",
		});
		res.status(200).json({ token, name: user.name, email });
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
};

export { registerUser, loginUser };
