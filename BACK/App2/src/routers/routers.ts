import { Router } from "express";
import { createNotes,readNotes,updateNotes,deleteNotes } from "../controllers/controllers.js";

const router = Router()

//POST
router.post('/tasks/newTask',createNotes);

// GET
router.get('/tasks',readNotes);

// PUT
router.put('/tasks/update/:id',updateNotes)

// DELETE
router.delete('/tasks/delete/:id',deleteNotes)



export default router;