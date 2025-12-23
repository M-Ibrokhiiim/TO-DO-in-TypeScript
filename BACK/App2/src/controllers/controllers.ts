import { Request,Response, NextFunction} from "express"
import { notesService } from "../services/notes.service.js"

const noteService = new notesService()

// POST
export const createNotes = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const inService = await noteService.createNotes(req.body)
            res.status(201).json({success:inService,message:"Note successfully created!",statusCode:201})
        }catch(err:any){
            const error:any = new Error(err)
            error.statusCode = 400
            console.log(error)
            next(error)
        }        
}

// GET
export const readNotes =async(req:Request,res:Response,next:NextFunction)=>{
    const data_db= await noteService.readNotes()
    res.status(200).json(data_db)
}

// PUT
export const updateNotes = async(req:Request,res:Response,next:NextFunction)=>{
            try{
                const service_success = await noteService.updateNotes(req.body,req.params.id)
                res.status(200).json({success:service_success,msg:"Task successfully updated!",statusCode:200})
            }catch(err:any){
                const error:any = new Error(err)
                error.statusCode = 400
                next(error)  
        }
}

// DELETE
export const deleteNotes = async(req:Request,res:Response,next:NextFunction)=>{
     try{
        const deletedNote = await noteService.deleteNote(Number(req.params.id))
        res.status(200).json({success:deletedNote,message:"Note successfully deleted!",statusCode:200})
     }catch(err:any){
        const error:any = new Error(err)
        error.statusCode = 400
        next(error) 
     }
}


// BONUS(Searching notes by keyword)
 export const searchingByKeyword = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const foundNotes=await noteService.searchByKeyboards(req.query.note as string)
        res.status(200).json(foundNotes)
    }catch(err:any){
       const error:any = new Error(err)
       error.statusCode = 400
       next(error)
    }
 }