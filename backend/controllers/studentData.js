import { Timetable } from "../models/timetable.model.js";

let postAttendance = async (req, res) => {
	try {
		let { timetable } = req.body;
		const { id } = req.user;
		timetable = JSON.parse(timetable);
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

async function getAttendance(req, res) {
	res.send("attendace is 75% .");
}

export { getAttendance, postAttendance };
