import { Request,Response } from "express"
import url from "url"
import path from "path"
import fs from "fs/promises"


// Type checking
interface taskTypes{
    id?:number,
    name:string,
    isDone?:boolean
}

// Access to dirname and filename
const _fileName = url.fileURLToPath(import.meta.url)
const _dirName =path.dirname(_fileName)



// POST
export const createNotes = async(req:Request,res:Response)=>{
         const { name }:taskTypes= req.body
         // Validation
        if(!req.body || name.length === 0 ){
            res.status(400).send("Required field missed --> CHECK name or isDone)")
        }
     
         // Bussiness logic
         const read_db = await fs.readFile(path.join(_dirName,'..','DATA','TASKS.json'),'utf8')
         const isJSON_db = JSON.parse(read_db) 
         
         let isExist:boolean;
     
         const isExistTask = isJSON_db.filter((task:taskTypes)=>{
             return task.name === name
         });
         
         if(isExistTask.length !== 0){
             isExist = true
         }else{
             const newTask = {id:isJSON_db.length+1,name:name,isDone:false}
             isJSON_db.push(newTask)
             await fs.writeFile(path.join(_dirName,'..',"DATA","TASKS.json"),JSON.stringify(isJSON_db))
             isExist=false
         };
     
         // Response
         if(isExist){
           res.status(400).json({success:false, msg:"Sorry, task exist!"})
         }else{
           res.status(201).json({success:true,msg:"Task created successfully!"})
         }
}

// GET
export const readNotes = async(req:Request,res:Response)=>{
    const tasks = await fs.readFile(path.join(_dirName,'..','DATA','TASKS.json'),'utf8')
    res.status(200).send(tasks)
}

// PUT
export const updateNotes = async(req:Request,res:Response)=>{
        const name= req.body.name
        const id:number = Number(req.params.id)
        
        // Validation
        if(!id || name.trim()==="" ){
          res.status(400).json({success:false,msg:"Sorry, you missed reuqired field..."})
        }
    
        // Business logic
        try{
            const came_task = req.body
    
            const read_db = await fs.readFile(path.join(_dirName,'..','DATA',"TASKS.json"),"utf8")
            const isJSON_db = JSON.parse(read_db)
    
            const updatedTasks = isJSON_db.filter((task:taskTypes)=>{
                return task.id !== id
            })
            
            updatedTasks.push(came_task)
            await fs.writeFile(path.join(_dirName,'..','DATA','TASKS.json'),JSON.stringify(updatedTasks))
    
            res.status(200).json({success:true,msg:"Task  successfully updated!"})
        }catch(err){
            console.log(err)
        }

}

// DELETE
export const deleteNotes = async(req:Request,res:Response)=>{
    const id:number  = Number(req.params.id)

        // Validation part
        if(!id){
            res.status(400).json({success:false,msg:"Sorry, ID is required..."})
        }

        //Business logic
        try{
           const read_db = await fs.readFile(path.join(_dirName,'..','DATA','TASKS.json'),'utf8')
           const isJSON_db = JSON.parse(read_db)
    
           const filtered_db:taskTypes[] = isJSON_db.filter((task:taskTypes)=>{
            return task.id !== id
           })
           
           await fs.writeFile(path.join(_dirName,'..','DATA','TASKS.json'),JSON.stringify(filtered_db))
    
           res.status(200).json({success:true,msg:"Task successfully deleted!"})

        }catch(err){
            console.log(err)
        }


}