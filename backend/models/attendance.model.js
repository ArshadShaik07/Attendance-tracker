import mongoose from "mongoose";

const attendaceSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	subjectName: {
		type: String,
	},
	date: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
		enum: ["present", "absent"],
	},
});

export const Attendance = mongoose.model("Attendance", attendaceSchema);
