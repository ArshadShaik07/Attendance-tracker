import { Timetable } from "../models/timetable.model.js";
import { Attendance } from "../models/attendance.model.js";

let postTimetable = async (req, res) => {
	try {
		let { timetable } = req.body;
		const { id } = req.user;
		const userTimetable = await Timetable.create({
			studentId: id,
			...timetable,
		});
		res.status(201).json("timetable added successfully");
	} catch (e) {
		console.log(e?.message);
		res.status(500).json(e.message);
	}
};

const postAttendance = async (req, res) => {
	try {
		const { id } = req.user;
		const attendance = req.body.map((sub) => ({
			...sub,
			userId: id,
		}));
		const pushedAttendance = await Attendance.insertMany(attendance);
		res.status(200).json("attendance added succesfully.");
	} catch (e) {
		res.status(500).json(e.message);
	}
};

async function getAttendance(req, res) {}

export { getAttendance, postTimetable, postAttendance };
