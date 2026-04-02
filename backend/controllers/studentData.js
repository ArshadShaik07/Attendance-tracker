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

const getTimetable = async (req, res) => {
	try {
		const { id } = req.user.id;
		const timetable = await Timetable.find({ studentId: id });
		if (!timetable.length) res.status(404).json("timetable not found.");
		res.status(200).json(timetable);
	} catch (e) {
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
	try {
		const userId = req.user.id;
		const toDate = req.query.toDate;
		const query = { userId };
		if (toDate) {
			query.date = { $lte: new Date(toDate) };
		}
		console.log(query);
		const totalClasses = await Attendance.find(query);
		const presentClasses = totalClasses.filter(
			(a) => a.status === "present",
		);
		const attendancePercentage =
			totalClasses.length === 0
				? 0
				: ((presentClasses.length / totalClasses.length) * 100).toFixed(
						3,
					);

		const subjectWiseClasses = {};
		for (let singleAttendance of totalClasses) {
			const { status, subjectName } = singleAttendance;
			if (!subjectWiseClasses[subjectName]) {
				subjectWiseClasses[subjectName] = {
					presentClasses: 0,
					totalClasses: 0,
				};
			}
			if (status === "present") {
				subjectWiseClasses[subjectName].presentClasses += 1;
			}
			subjectWiseClasses[subjectName].totalClasses += 1;
		}

		console.log(totalClasses);

		res.status(200).json({
			userId: userId,
			attendancePercentage,
			subjectWiseClasses,
		});
	} catch (e) {
		res.status(500).json(e.message);
	}
};

export { getAttendance, postTimetable, getTimetable, postAttendance };
