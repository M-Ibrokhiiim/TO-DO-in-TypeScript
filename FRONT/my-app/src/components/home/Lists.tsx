import { useState, useEffect } from "react";
import { Box, Container, Text, Checkbox, Flex, Input } from "@chakra-ui/react";
import Delete from '../../icons/Delete.tsx';
import Edit from "../../icons/Edit.tsx";
import CHECK from "../../icons/Check.tsx";
import { ToastContainer, toast } from 'react-toastify';

// TypeScript interfaces
interface Task {
  id: number;
  content: string;
  isDone: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ListsProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export default function LISTS({ loading, setLoading }: ListsProps) {
  const [isChecked, setChecked] = useState<boolean>(false);
  const [isEdited, setEdited] = useState<boolean>(false);
  const [editableTask, setEditable] = useState<string>('');
  const [isEditableTASK, setIsEditableTASK] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const checked = (): void => {
    setChecked(!isChecked);
    console.log(isChecked);
  };

  // TASKS API
  const TASKS = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks');
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data: Task[] = await response.json();
      setTasks(data);
      console.log(data);
    } catch (err) {
      console.log('Error is occuring while loading tasks...');
    }
  };

  // PUT request
  const taskIsDone = async (
    id: number,
    content: string,
    isDone: boolean
  ): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/update/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, content, isDone })
      });

      if (!response.ok) {
        throw new Error("Error!");
      }
      
      await TASKS();

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    TASKS();
  }, [loading]);

  return (
    <>
      <Box>
        {tasks.length > 0 ? (
          <Container
            w={{ base: '85vw', md: '50vw', lg: '30vw' }}
            mt={'50px'}
            border={'2px solid blue'}
            h={{ base: '100vw', md: "60vw", lg: '30vw' }}
            borderRadius={'20px'}
          >
            <Text
              bg={'white'}
              textAlign={'center'}
              mt='3'
              fontSize={'30px'}
              fontWeight={'800'}
              textDecoration={'underline'}
              color={'blue.600'}
              fontFamily={'cursive'}
            >
              Tasks
            </Text>
            <Box
              h={{ base: '70%', lg: '80%' }}
              mt='20px'
              overflow={'scroll'}
              display={'flex'}
              flexDirection={'column'}
            >
              {tasks.map((task: Task) => {
                return (
                  <Flex key={task.id} mt='2' justifyContent={'space-between'}>
                    {!isEdited ? (
                      <Checkbox.Root
                        cursor={'pointer'}
                        overflow={'scroll'}
                        w={{ base: "200px", md: "450px" }}
                        onClick={() => { taskIsDone(task.id, task.content, !task.isDone) }}
                      >
                        <input
                          type="checkbox"
                          style={{ width: "30px", height: "20px" }}
                          checked={task.isDone}
                          readOnly
                        />
                        <Checkbox.Label
                          fontSize={{ base: '15px', md: '22px' }}
                          textDecoration={task.isDone ? 'line-through' : 'none'}
                        >
                          {task.content}
                        </Checkbox.Label>
                      </Checkbox.Root>
                    ) : (
                      <>
                        {isEditableTASK === task.id ? (
                          <Input
                            borderTop={'none'}
                            key={task.id}
                            fontSize={'20px'}
                            borderRight={'none'}
                            value={editableTask}
                            onChange={(e) => { setEditable(e.target.value) }}
                            autoFocus
                            borderLeft={'none'}
                            outline={'none'}
                            borderRadius={'none'}
                          />
                        ) : (
                          <Flex mt='2' justifyContent={'space-between'}>
                            <Checkbox.Root
                              cursor={'pointer'}
                              overflow={'scroll'}
                              w={{ base: "200px", md: "250px" }}
                              onClick={() => { taskIsDone(task.id, task.content, !task.isDone) }}
                            >
                              <input
                                type="checkbox"
                                style={{ width: "30px", height: "20px" }}
                                checked={task.isDone}
                                readOnly
                              />
                              <Checkbox.Label
                                fontSize={{ base: '15px', md: '22px' }}
                                textDecoration={task.isDone ? 'line-through' : 'none'}
                              >
                                {task.content}
                              </Checkbox.Label>
                            </Checkbox.Root>
                          </Flex>
                        )}
                      </>
                    )}

                    <Flex alignItems={'center'} w={'70px'} bg='white' justifyContent={'space-between'}>
                      {isEdited && isEditableTASK === task.id ? (
                        <CHECK
                          taskId={task.id}
                          taskName={editableTask}
                          isEdited={isEdited}
                          setEdited={setEdited}
                          uiUpdater={TASKS}
                          taskDone={task.isDone}
                        />
                      ) : (
                        <Edit
                          setEdited={setEdited}
                          isEdited={isEdited}
                          setEditable={setEditable}
                          inputField={task.content}
                          editableTASK={setIsEditableTASK}
                          taskID={task.id}
                        />
                      )}
                      <Delete id={task.id} setLoading={setLoading} loading={loading} />
                    </Flex>
                  </Flex>
                );
              })}
            </Box>
          </Container>
        ) : null}
      </Box>
    </>
  );
}