import express from 'express'
import url from 'url'
import cors from 'cors'
import path from 'path'
import fs from 'fs/promises'


// FS
const _fileName = url.fileURLToPath(import.meta.url);
const _dirName = path.dirname(_fileName);



const server = express()
server.use(cors())


server.use(express.urlencoded({ extended: true }));
server.use(express.json())

// GET
server.get('/tasks',async(req,res)=>{
    const tasks = await fs.readFile(path.join(_dirName,'DATA','TASKS.json'),'utf8')
    res.status(200).send(tasks)
})
// POST
server.post('/newTask',async(req,res)=>{
    const DB =  await fs.readFile(path.join(_dirName,'DATA','TASKS.json'),'utf8');
    const arrivalTask = req.body;
    const tasks = JSON.parse(DB);

    try{
       const newTask = {id:tasks.length+1,name:arrivalTask.name,isDone:false};

       tasks.forEach((task)=>{
        if(task.name === arrivalTask.name){
            res.status(409).json({success:false,msg:'Task already exist!'})
            throw new Error('Task already exist!')
        }
      })
        tasks.push(newTask);
        await fs.writeFile(path.join(_dirName,'DATA','TASKS.json'),JSON.stringify(tasks.reverse()));
        res.status(201).json({success:true,msg:'Task successfully added!'});
    }catch(err){
       console.log(err);
    } 
})

// DELETE
server.delete('/removalTask/:id',async(req,res)=>{
   const DB = await fs.readFile(path.join(_dirName,'DATA','TASKS.json'),'utf8');
   const tasks = JSON.parse(DB)
   
   const filteredTasks = tasks.filter((task)=>{
     return task.id !== Number(req.params.id)
   })
   await fs.writeFile(path.join(_dirName,'DATA','TASKS.json'),JSON.stringify(filteredTasks))
   res.json({success:true,msg:'Task removed!'})
})


// PUT for TASKDONE
server.put('/task/:id/done',async(req,res)=>{
     
       const DB = await fs.readFile(path.join(_dirName,'DATA','TASKS.json'),'utf8');

       const filteredData = JSON.parse(DB).filter((task)=>{
        return task.id !==Number(req.params.id)
       })
    
       const updatedTask = JSON.parse(DB).find((task)=>{
         return task.id === Number(req.params.id)
       });
       
       updatedTask.isDone = !updatedTask.isDone;

       filteredData.push(updatedTask);
       await fs.writeFile(path.join(_dirName,'DATA','TASKS.json'),JSON.stringify(filteredData.sort((a,b)=>a.id-b.id)))
    
       res.json({success:true,msg:'Task finished!'})
})

// PUT for task editing.
server.put('/task/:id/edited',async(req,res)=>{
    const DB = await fs.readFile(path.join(_dirName,'DATA','TASKS.json'),'utf8');
    
    const JSONDB = JSON.parse(DB);
    const FILTEREDDB = JSONDB.filter(task=>task.id !==Number(req.params.id));

    const editableTASK = JSONDB.find(task=>task.id === Number(req.params.id))
    editableTASK.name = req.body.name;
    
    FILTEREDDB.push(editableTASK);

    await fs.writeFile(path.join(_dirName,'DATA','TASKS.json'),JSON.stringify(FILTEREDDB.sort((a,b)=>a.id - b.id)))

    res.json({success:true,msg:'Successfully edited!'})
})
server.listen(3000,()=>{
    console.log('Server on PORT:3000')
})