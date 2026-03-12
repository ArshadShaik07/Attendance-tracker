import { Router } from "express";
import {
	getAttendance,
	getAttendanceByDate,
	postTimetable,
	postAttendance,
} from "../controllers/studentData.js";
import { registerUser, loginUser } from "../controllers/authUser.js";
import { protect } from "../middleware/protect.js";

const router = Router();

//register
router.post("/register", registerUser);

//login
router.post("/login", loginUser);

//logout
// router.post("/logout", logoutUser);

//post timetable
router.post("/timetable", protect, postTimetable);

//post attendance
router.post("/attendance", protect, postAttendance);

//get attendance
router.get("/attendance", protect, getAttendance);

//get attendance by date
router.get("/attendance/:date", protect, getAttendanceByDate);

export { router };
