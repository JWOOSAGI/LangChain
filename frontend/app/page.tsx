'use client'
import {useState} from 'react';
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  question: string
  exampleRequired?: string
}

export default function Home() {



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('입력된 값 : '+JSON.stringify(data))
    fetch('http://localhost:8000/chat', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
   // .then((response) => console.log('답변: '+JSON.stringify(response)))
   .then((response) => response.json()) // JSON 형식으로 파싱
   .then((data) => console.log(data)) // 파싱된 데이터 콘솔 출력
    .catch((error) => console.log("error:", error));
  }

  console.log(watch("question")) // watch input value by passing the name of it


  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6">Bit Chat GPT</h2>
        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <div className="h-64 overflow-y-auto">
            {/* 여기에 채팅 메시지를 표시하는 컴포넌트를 추가하세요 */}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("question", { required: true })} className="w-full mb-4 p-3 border border-gray-300 rounded" />
          <button type="submit" className="w-full py-3 bg-blue-500 text-white font-bold rounded">전송</button>
        </form>
        {errors.question && <span>This field is required</span>}
      </div>
    </div>
  );
}