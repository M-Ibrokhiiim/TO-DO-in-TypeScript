import { Request,Response, NextFunction} from "express"
import { notesService } from "../services/notes.service.js"
 

// POST
export const createNotes = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const noteService = new notesService()
            const inService = await noteService.createNotes(req.body)
            res.status(201).json({success:inService,message:"Note successfully created!"})
        }catch(err:any){
            const error:any = new Error(err)
            error.statusCode = 400
            console.log(error)
            next(error)
        }        
}

// GET
export const readNotes =async(req:Request,res:Response,next:NextFunction)=>{
    const noteService = new notesService()
    const data_db= await noteService.readNotes()
    res.status(200).json(data_db)
}

// PUT
export const updateNotes = async(req:Request,res:Response,next:NextFunction)=>{
            try{
                const noteService =new notesService()
                const service_success = await noteService.updateNotes(req.body,req.params.id)
                res.status(200).json({success:service_success,msg:"Task successfully updated!"})
            }catch(err:any){
                const error:any = new Error(err)
                error.statusCode = 400
                next(error)  
        }
}

// DELETE
export const deleteNotes = async(req:Request,res:Response,next:NextFunction)=>{
     try{
        const inService = new notesService()
        const deletedNote = await inService.deleteNote(Number(req.params.id))
        res.status(200).json({success:deletedNote,message:"Note successfully deleted!"})
     }catch(err:any){
        const error:any = new Error(err)
        error.statusCode = 400
        next(error) 
     }
}
