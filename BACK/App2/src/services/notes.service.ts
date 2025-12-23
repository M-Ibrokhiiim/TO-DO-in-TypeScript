import url from "url"
import path from "path"
import fs from "fs/promises"


// Type annotations
export interface NotesDTO{
  id?:number,
  content:string,
  updatedDate?:string,
  createdDate?:string,
  isDone:boolean
}
 

// Access to dirname and filename
const _fileName = url.fileURLToPath(import.meta.url)
const _dirName =path.dirname(_fileName)


export class notesService{
    // CREATE
    async createNotes(data:NotesDTO){
         const { content } = data
         let isExist:(boolean);
         let success:(boolean);
        
           if(content.trim().length === 0 ){
                throw new Error("Sorry, content must be longer that 1 letter")
            }
             
            const read_db = await fs.readFile(path.join(_dirName,'..','DATA','TASKS.json'),'utf8')
            const isJSON_db = JSON.parse(read_db) 
                 
            
             
            const isExistTask = isJSON_db.filter((task:NotesDTO)=>{
                     return task.content === content
            });
            
            if(isExistTask.length !== 0){
                    isExist = true
                    throw new Error("Sorry, task already exist in your notes")
            }else{
                    const newTask = {id:isJSON_db.length+1,content:content,createdDate:String(new Date()),isDone:false}
                    isJSON_db.push(newTask)
                    await fs.writeFile(path.join(_dirName,'..',"DATA","TASKS.json"),JSON.stringify(isJSON_db, null, 2))
                    isExist=false

                    return success=true
            };
             
    }

    // READ
    async readNotes(){
        const tasks = await fs.readFile(path.join(_dirName,'..','DATA','TASKS.json'),'utf8')
        return JSON.parse(tasks)
    }

    // PUT
    async updateNotes (data:NotesDTO,id:string){
             let isSuccess:(boolean);
             const content=data.content
             const came_id:number = Number(id)
                
                // Validation
                if(!came_id || content.trim()==="" ){
                   throw new Error("Sorry, you missed reqired field...")
                }
            
                // Bussiness logic
                    const read_db = await fs.readFile(path.join(_dirName,'..','DATA',"TASKS.json"),"utf8")
                    const isJSON_db = JSON.parse(read_db)
                    
                    const findExistNote = isJSON_db.filter((note:NotesDTO)=>{
                        return note.id === came_id
                    }) 
                    
                    
                    
                    const updatedTasks = isJSON_db.filter((task:NotesDTO)=>{
                        return task.id !== came_id
                    })  
                  
                    const updatedNote:NotesDTO = {id:came_id,content:content,updatedDate:String(new Date()),createdDate:findExistNote[0].createdDate,isDone:data.isDone }
                        
                    updatedTasks.push(updatedNote)
                    await fs.writeFile(path.join(_dirName,'..','DATA','TASKS.json'),JSON.stringify(updatedTasks, null, 2))
        
                    return isSuccess =true        
                }

    // DELETE
    async deleteNote (id:(number |string)){
           let isSuccess:(boolean);
           if(!id){
             throw new Error("Sorry, ID is required...")
            }

        //Business logic
           const read_db = await fs.readFile(path.join(_dirName,'..','DATA','TASKS.json'),'utf8')
           const isJSON_db = JSON.parse(read_db)
    
           const filtered_db:NotesDTO[] = isJSON_db.filter((task:NotesDTO)=>{
            return task.id !== Number(id)
           })
           
           await fs.writeFile(path.join(_dirName,'..','DATA','TASKS.json'),JSON.stringify(filtered_db,null,2))
          
           return isSuccess =true
    }   
    
    // BONUS(Searching)
    async searchByKeyboards(query: string) {
            if (!query || query.trim().length === 0) {
                throw new Error("Sorry, query length must be longer than 1 letter");
           }

            const read_db = await fs.readFile(path.join(_dirName, "..", "DATA", "TASKS.json"), "utf8");
            const isJSON_db:  NotesDTO[] = JSON.parse(read_db);

            const foundNotes = isJSON_db.filter((note) => {
            const word = Array.from(note.content).filter((letter) => letter !== " ").join("");
            const key: string = Array.from(query).filter((l) => l !== " ").join("");
            return (word.toLocaleLowerCase().startsWith(key.toLocaleLowerCase()) || word.toLocaleLowerCase() === key.toLocaleLowerCase());
            });

    return foundNotes;
  }
}