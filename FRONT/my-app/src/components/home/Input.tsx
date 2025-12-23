import { Box, Input, Button } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

// ✅ Proper TypeScript types for props
interface InputProps {
  setLoading: (value: boolean) => void;
  loading: boolean;
}

export default function INPUT({ setLoading, loading }: InputProps) {
  const [task, setTask] = useState<string>('');

  // EVENTS
  const addTasksByButton = async (task: string): Promise<void> => {
    try {
      if (task === '') return;

      const res = await fetch('http://localhost:3000/api/notes/newTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: task })
      });

      if (!res.ok) {
        console.log(res);
        toast.info('Task already exist!', { autoClose: 2400 });
        setTask('');
        throw new Error('Backend error!');
      }

      setLoading(!loading);
      const data = await res.json();
      toast.success(data.msg, { autoClose: 2400 });

      setTask('');
    } catch (err) {
      console.log('Error occured while API call...');
    }
  };

  // Proper type for keyboard event
  const addTasksByEnter = async (
    task: string,
    e: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (e.key === 'Enter') {
      try {
        if (task === '') return;

        const res = await fetch('http://localhost:3000/api/notes/newTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: task })
        });

        if (!res.ok) {
          toast.info('Task already exist!', { autoClose: 2400 });
          setTask('');
          throw new Error('Backend error!');
        }

        setLoading(!loading);
        const data = await res.json();
        toast.success(data.msg, { autoClose: 2400 });

        setTask('');
      } catch (err) {
        console.log('Error occured while API call...');
      }
    }
  };

  return (
    <>
      <Box display={'flex'} justifyContent={'center'} mt={'20px'}>
        <Input
          placeholder="Typing..."
          w={{ base: '320px', md: '50vw', lg: '30vw' }}
          outline={'none'}
          border={'2px solid blue'}
          borderRadius={'40px'}
          fontSize={'18px'}
          p={5}
          onKeyDown={(e) => {
            addTasksByEnter(task, e);
          }}
          color={'black'}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          value={task}
          autoFocus
        />
        <Button
          bg={'blue.500'}
          w={{ base: '70px', md: '100px' }}
          _active={{ scale: '0.97' }}
          transition={'all'}
          borderRightRadius={'100px'}
          fontSize={'20px'}
          mt={{ base: '0.vw', sm: '10px', md: '0px' }}
          ml={{ base: '-40px', md: '-99px' }}
          h={'100%'}
          outline={'none'}
          border={'none'}
          _focus={{ outline: 'none' }}
          onClick={() => {
            addTasksByButton(task);
          }}
        >
          Add
        </Button>
        <ToastContainer />
      </Box>
    </>
  );
}