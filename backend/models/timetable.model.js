import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	monday: {
		type: [String],
	},
	tuesday: {
		type: [String],
	},
	wednesday: {
		type: [String],
	},
	thursday: {
		type: [String],
	},
	friday: {
		type: [String],
	},
	saturday: {
		type: [String],
	},
});

const Timetable = mongoose.model("Timetable", timetableSchema);

export { Timetable };
