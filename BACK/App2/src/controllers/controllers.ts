import { Request,Response } from "express"
import { notesService } from "../services/notes.service.js"
 

// POST
export const createNotes = async(req:Request,res:Response)=>{
        try{
            const noteService = new notesService()
            const inService = await noteService.createNotes(req.body)
            res.status(201).json({success:inService,message:"Note successfully created!"})
        }catch(err:any){
            res.status(400).json({error:err.message})
        }        
}

// GET
export const readNotes =async(req:Request,res:Response)=>{
    const noteService = new notesService()
    const data_db= await noteService.readNotes()
    res.status(200).json(data_db)
}

// PUT
export const updateNotes = async(req:Request,res:Response)=>{
            try{
                const noteService =new notesService()
                const service_success = await noteService.updateNotes(req.body,req.params.id)
                res.status(200).json({success:service_success,msg:"Task  successfully updated!"})
            }catch(err:any){
             res.status(400).json({success:false,msg:err.message})
        }
}

// DELETE
export const deleteNotes = async(req:Request,res:Response)=>{
     try{
        const inService = new notesService()
        const deletedNote = await inService.deleteNote(Number(req.params.id))
        res.status(200).json({success:deletedNote,message:"Note successfully deleted!"})
     }catch(err:any){
        res.status(400).json({success:false,message:err.message})
     }
}
