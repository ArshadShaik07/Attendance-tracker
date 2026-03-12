import { Timetable } from "../models/timetable.model.js";
import { Attendance } from "../models/attendance.model.js";
import { User } from "../models/user.model.js";

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
		if (req.body === undefined) {
			return res.status(400).json("attendance is empty.");
		}
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

const getAttendance = async (req, res) => {
	const userId = req.user.id;
	const totalClasses = await Attendance.find({ userId });
	let presentClasses = await Attendance.find({ userId, status: "present" });
	const attendancePercentage = (
		(presentClasses.length / totalClasses.length) *
		100
	).toFixed(3);
	const user = await User.findById(userId);
	res.status(200).json(
		`Attendance of ${user.name} is ${attendancePercentage}%`,
	);
};

const getAttendanceByDate = async (req, res) => {};

export { getAttendance, getAttendanceByDate, postTimetable, postAttendance };
