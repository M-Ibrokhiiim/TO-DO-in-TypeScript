import { Request,Response } from "express"
import url from "url"
import path from "path"
import fs from "fs/promises"


// Type checking
interface taskTypes{
    id?:number,
    content:string,
    isDone?:boolean,
    createrDate?:string,
    updatedDate?:string
}

// Access to dirname and filename
const _fileName = url.fileURLToPath(import.meta.url)
const _dirName =path.dirname(_fileName)



// POST
export const createNotes = async(req:Request,res:Response)=>{
         const { content }:taskTypes= req.body
         // Validation
        if(content.length === 0 ){
            res.status(400).send("Required field missed --> CHECK name or isDone)")
        }
     
         // Bussiness logic
         const read_db = await fs.readFile(path.join(_dirName,'..','DATA','TASKS.json'),'utf8')
         const isJSON_db = JSON.parse(read_db) 
         
         let isExist:boolean;
     
         const isExistTask = isJSON_db.filter((task:taskTypes)=>{
             return task.content === content
         });
         
         if(isExistTask.length !== 0){
             isExist = true
         }else{
             const newTask = {id:isJSON_db.length+1,content:content,createdDate:String(new Date()),isDone:false}
             isJSON_db.push(newTask)
             await fs.writeFile(path.join(_dirName,'..',"DATA","TASKS.json"),JSON.stringify(isJSON_db, null, 2))
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
        const content= req.body.content
        const id:number = Number(req.params.id)
        
        // Validation
        if(!id || content.trim()==="" ){
          res.status(400).json({success:false,msg:"Sorry, you missed reuqired field..."})
        }
    
        // Business logic
        try{
            let isExist:(boolean  | undefined);

            const read_db = await fs.readFile(path.join(_dirName,'..','DATA',"TASKS.json"),"utf8")
            const isJSON_db = JSON.parse(read_db)
            
            const findExistNote = isJSON_db.filter((note:taskTypes)=>{
                return note.id ===id
            }) 
            

            isJSON_db.forEach((task:taskTypes)=>{
                if(task.content.trim()=== req.body.content){
                    return isExist =true
                }else{
                    return isExist = false
                }
            })
            

            if(isExist){
                throw new Error('Sorry, you have same note that you wanted edit!')
            }
            
            const updatedTasks = isJSON_db.filter((task:taskTypes)=>{
                return task.id !== id
            })  
          
            const updatedNote = {id:id,content:req.body.content,updatedDate:String(new Date()),createdDate:findExistNote[0].createdDate,isDone:req.body.isDone }
                
            updatedTasks.push(updatedNote)
            await fs.writeFile(path.join(_dirName,'..','DATA','TASKS.json'),JSON.stringify(updatedTasks, null, 2))

            res.status(200).json({success:true,msg:"Task  successfully updated!"})

        }catch(err:any){
             res.status(400).json({success:false,msg:err.message})
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
           
           await fs.writeFile(path.join(_dirName,'..','DATA','TASKS.json'),JSON.stringify(filtered_db,null,2))
    
           res.status(200).json({success:true,msg:"Task successfully deleted!"})

        }catch(err){
            console.log(err)
        }


}
