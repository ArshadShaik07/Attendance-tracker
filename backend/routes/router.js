import { Router } from "express";
import {
	getAttendance,
	postTimetable,
	getTimetable,
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
//dont need it coz we use jwt !!
// router.post("/logout", logoutUser);

//post timetable
router.post("/timetable", protect, postTimetable);

//get timetable
router.get("/timetable", protect, getTimetable);

//post attendance
router.post("/attendance", protect, postAttendance);

//get attendance
router.get("/attendance", protect, getAttendance);

export { router };
