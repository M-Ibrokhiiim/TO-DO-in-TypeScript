import { useState,useEffect} from "react"
import { Box, Container, Text, Checkbox, Flex,Input} from "@chakra-ui/react"
import Delete from '../../icons/Delete.tsx'
import Edit from "../../icons/Edit.tsx"
import CHECK from "../../icons/Check.tsx"
import {ToastContainer, toast} from 'react-toastify'


export default function LISTS({loading,setLoading}){
    const [isChecked,setChecked] =useState(false);
    const [isEdited,setEdited] = useState(false);
    const [editableTask,setEditable] = useState('')
    const [isEditableTASK,setIsEditableTASK] = useState(null);



    const [tasks,setTasks] = useState([])
    const checked=()=>{
        setChecked(!isChecked)
        console.log(isChecked)
    }



//  TASKS API
    const TASKS =async()=>{
        try{
            const response = await fetch('http://localhost:3000/tasks');
            const data = await response.json();
            setTasks(data)
            console.log(data)
        }catch(err){
          console.log('Error is occuring while loading tasks...')
        }
    }
//  PUT request   
    const taskIsDone = async(id:number,name:string,isDone:boolean)=>{
        try{
            const response = await fetch(`http://localhost:3000/tasks/update/${id}`,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({id:id,name:name,isDone:isDone})
            });

            if(!response.ok){
                throw new Error("Error!")
            }
            TASKS();

            const data =await response.json();
            console.log(data)
        }catch(err){
           console.log(err)
        }
    }

//  const taskEditorByEnterBTN =async(e,id:number,name:string)=>{

//     if(e.key === 'Enter' && name.length > 0){
//     try{
//        const res = await fetch(`http://localhost:3000/tasks/update/${id}`,{
//         method:'PUT',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({name:name})
//        })

//        if(!res.ok){
//         throw new Error('Error occured white editing!')
//        }
//        TASKS()
//        const data = await res.json();
//        toast.success(data.msg,{
//         autoClose:1500
//        })

//        setEdited(!isEdited)
//     }catch(err){
//         console.log(err)
//     }
//     }
//  }   
    useEffect(()=>{
         TASKS()
    },[loading])
    return(
        <>
        <Box>
            {tasks.length >0 ? <Container w={{base:'85vw',md:'50vw',lg:'30vw'}} mt={'50px'} border={'2px solid blue'} h={{base:'100vw',md:"60vw",lg:'30vw'}} borderRadius={'20px'}>
                <Text bg={'white'} textAlign={'center'} mt='3'  fontSize={'30px'} fontWeight={'800'} textDecoration={'underline'} color={'blue.600'} fontFamily={'cursive'}>
                    Tasks
                </Text>
                <Box h={{base:'70%',lg:'80%'}} mt='20px' overflow={'scroll'} display={'flex'} flexDirection={'column'}>
                    {tasks.map(task=>{
                        return(
                    <Flex mt='2'  justifyContent={'space-between'}>
                         {!isEdited ?
                         <Checkbox.Root cursor={'pointer'} overflow={'scroll'} w={{base:"200px", md:"450px"}} onClick={()=>{taskIsDone(task.id,task.name,!task.isDone)}}>
                           <input type="checkbox" style={{width:"30px",height:"20px"}} checked={task.isDone}/>
                            <Checkbox.Label fontSize={{base:'15px',md:'22px'}} textDecoration={task.isDone ? 'line-through' :'none'}>{task.name}</Checkbox.Label> 
                          </Checkbox.Root>  
                            : <>
                            {
                                isEditableTASK === task.id ? <Input borderTop={'none'} key={task.id} fontSize={'20px'} borderRight={'none'}  value={editableTask} onChange={(e)=>{setEditable(e.target.value)}} autoFocus borderLeft={'none'} outline={'none'} borderRadius={'none'} /> 
                                : <>
                                <Flex mt='2'  justifyContent={'space-between'}>
                                  <Checkbox.Root cursor={'pointer'} overflow={'scroll'} w={{base:"200px", md:"250px"}} onClick={()=>{taskIsDone(task.id,task.name,!task.isDone)}}>
                                    <input type="checkbox" style={{width:"30px",height:"20px"}} checked={task.isDone}/>
                                    <Checkbox.Label fontSize={{base:'15px',md:'22px'}} textDecoration={task.isDone ? 'line-through' :'none'}>{task.name}</Checkbox.Label> 
                                  </Checkbox.Root>           
                                </Flex>
                                </>
                            }
                            </>
                           }
                        
                    <Flex   alignItems={'center'} w={'70px'} bg='white' justifyContent={'space-between'}>
                        { isEdited && isEditableTASK === task.id ? <CHECK
                          taskId = {task.id}
                          taskName={editableTask}
                          isEdited={isEdited} 
                          setEdited={setEdited}
                          uiUpdater={TASKS}
                          taskDone = {task.isDone}
                        />  
                          :<Edit setEdited ={setEdited}
                         isEdited={isEdited} 
                         setEditable={setEditable}
                         inputField={task.name}
                         editableTASK={setIsEditableTASK}
                         taskID={task.id}
                         />
                          }
                        <Delete id={task.id} setLoading={setLoading} loading={loading}/>
                    </Flex>
                  </Flex>
                        )
                    })}
                  
                </Box>
            </Container>
            :'' }
            
        </Box>
        </>
    )
}