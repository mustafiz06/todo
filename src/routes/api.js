const express =require('express');
const ProfileController=require("../controllers/ProfileController")
const ToDoListController=require("../controllers/ToDoListController")
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware");
const router =express.Router();

//login Registration
router.post("/CreateProfile",ProfileController.CreateProfile)
router.post("/UserLogin",ProfileController.UserLogin)

//profile read & Update
router.get("/SelectProfile",AuthVerifyMiddleware,ProfileController.SelectProfile)
router.post("/UpdateProfile",AuthVerifyMiddleware,ProfileController.UpdateProfile)

//ToDo API
router.post("/CreateToDo",AuthVerifyMiddleware,ToDoListController.CreateToDo)
router.get("/ToDoSelect",AuthVerifyMiddleware,ToDoListController.ToDoSelect)
router.post("/UpdateToDo",AuthVerifyMiddleware,ToDoListController.UpdateToDo)
router.post("/RemoveToDo",AuthVerifyMiddleware,ToDoListController.RemoveToDo)
router.post("/SelectToDoByStatus",AuthVerifyMiddleware,ToDoListController.SelectToDoByStatus)
router.post("/SelectToDoByDate",AuthVerifyMiddleware,ToDoListController.SelectToDoByDate)



module.exports=router;