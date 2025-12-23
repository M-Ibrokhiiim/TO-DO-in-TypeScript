import { Router } from "express";
import { createNotes,readNotes,updateNotes,deleteNotes,searchingByKeyword } from "../controllers/notes.controller.js";

const router = Router()

//POST
router.post('/notes/newTask',createNotes);

// GET
router.get('/notes',readNotes);

// PUT
router.put('/notes/update/:id',updateNotes)

// DELETE
router.delete('/notes/delete/:id',deleteNotes)


// SEARCHING
router.get('/notes/search',searchingByKeyword)



export default router;