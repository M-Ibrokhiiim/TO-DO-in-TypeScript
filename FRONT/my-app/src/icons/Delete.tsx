import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

interface DeleteProps {
  id: number;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export default function Delete({ id, loading, setLoading }: DeleteProps) {

  const [isActive, setActive] = useState<boolean>(false);

  const Click = async (id: number): Promise<void> => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 200);

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/delete/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      const data = await response.json();
      toast.success(data.msg, {
        autoClose: 1000
      });
      setLoading(!loading);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        onClick={() => Click(id)}
        width={isActive ? "30" : "35"}
        height={isActive ? "34" : "35"}
        cursor="pointer"
        viewBox="0 0 64 64"
      >
        <ellipse cx="32" cy="61" opacity=".3" rx="19" ry="3"></ellipse>
        <path
          fill="#9c34c2"
          d="M43.299,55H20.701c-1.535,0-2.823-1.159-2.984-2.686L14,17h36l-3.717,35.314	C46.122,53.841,44.834,55,43.299,55z"
        ></path>
        <path
          fill="#ffa1ac"
          d="M50,22H14c-1.657,0-3-1.343-3-3v-2c0-1.657,1.343-3,3-3h36c1.657,0,3,1.343,3,3v2	C53,20.657,51.657,22,50,22z"
        ></path>
        <path
          fill="none"
          stroke="#ffa1ac"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="4"
          d="M42.5,16.5h-21v-5c0-1.657,1.343-3,3-3h15c1.657,0,3,1.343,3,3V16.5z"
        ></path>
        <path
          fill="#ffa1ac"
          d="M26.5,48L26.5,48c-1.381,0-2.5-1.119-2.5-2.5v-17c0-1.381,1.119-2.5,2.5-2.5l0,0	c1.381,0,2.5,1.119,2.5,2.5v17C29,46.881,27.881,48,26.5,48z"
        ></path>
        <path
          fill="#ffa1ac"
          d="M37.5,48L37.5,48c-1.381,0-2.5-1.119-2.5-2.5v-17c0-1.381,1.119-2.5,2.5-2.5l0,0	c1.381,0,2.5,1.119,2.5,2.5v17C40,46.881,38.881,48,37.5,48z"
        ></path>
        <path
          d="M43.965,26.469l-2.248,21.757C41.602,49.237,40.746,50,39.729,50H33c-2.762,0-4.997,2.239-4.997,5	h15.296c1.535,0,2.823-1.159,2.984-2.686l3.152-30.249C46.712,21.784,44.274,23.747,43.965,26.469z"
          opacity=".15"
        ></path>
        <path
          fill="#fff"
          d="M21.111,37.65l-1.585-16.205c-0.004-0.04-0.009-0.08-0.015-0.119	C19.346,20.102,20.244,19,21.48,19h9.385c2.762,0,4.997-2.239,4.997-5H14c-1.657,0-3,1.343-3,3v2c0,1.657,1.343,3,3,3h0.558	l2.139,21.174C19.441,42.868,21.418,40.395,21.111,37.65z"
          opacity=".3"
        ></path>
        <line
          x1="17.5"
          x2="23.5"
          y1="17.5"
          y2="17.5"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="3"
        ></line>
      </svg>
      <ToastContainer />
    </>
  );
}