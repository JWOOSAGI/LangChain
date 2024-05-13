'use client'
import {useState} from 'react';
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  question: string
  exampleRequired?: string
}

export default function Home() {
  const [responseData, setResponseData] = useState<any>(null);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('입력된 값 : '+JSON.stringify(data))
    fetch('http://localhost:8000/api/chat/titanic', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
   // .then((response) => console.log('답변: '+JSON.stringify(response)))
    .then((response) => response.json()) // JSON 형식으로 파싱
    .then((data) => {
    console.log(data); // 파싱된 데이터 콘솔 출력
    setResponseData(data); // 데이터 상태 업데이트
  })

    .catch((error) => console.log("error:", error));
  }

  console.log(watch("question")) // watch input value by passing the name of it


  return (
    <div className="Article flex w-screen h-screen justify-items-center relative bg-white">
  <div className="Cards left-[90px] top-[654px] absolute justify-start items-start gap-8 inline-flex">
    <div className="Card w-[404px] h-[434px] flex-col justify-start items-start gap-6 inline-flex">
      <img className="Image w-[404px] h-[346px] relative rounded-lg" src="https://i.namu.wiki/i/x47RToDHJ4nW-lOE_9gj648wcXwl-Sc-gC8S1Fk0mhAZ8y-YlX30NxxUUxKdLKwzRuJitCLUa0kjTztnu5w2uA.webp" />
      <div className="Copy self-stretch h-16 flex-col justify-center items-start gap-1 flex">
        <div className="Title self-stretch text-black text-xl font-medium font-['Inter'] leading-[30px]">타이타닉</div>
        <div className="Author self-stretch text-zinc-500 text-xl font-medium font-['Inter'] leading-[30px]">명작이긴해</div>
      </div>
    </div>
    <div className="Card w-[404px] h-[434px] flex-col justify-start items-start gap-6 inline-flex">
      <img className="Image w-[404px] h-[346px] relative rounded-lg" src="https://cdn.bizwatch.co.kr/news/photo/2019/07/17/28998fc1752badece1e6af2f13278926.jpg" />
      <div className="Copy self-stretch h-16 flex-col justify-center items-start gap-1 flex">
        <div className="Title self-stretch text-black text-xl font-medium font-['Inter'] leading-[30px]">AI로 돈벌기</div>
        <div className="Author self-stretch text-zinc-500 text-xl font-medium font-['Inter'] leading-[30px]">가 쉬워보이냐?</div>
      </div>
    </div>
    <div className="Card w-[404px] h-[434px] flex-col justify-start items-start gap-6 inline-flex">
      <img className="Image w-[404px] h-[346px] relative rounded-lg" src="https://item.kakaocdn.net/do/c6da697d32943268c295c0417c45356e7154249a3890514a43687a85e6b6cc82" />
      <div className="Copy self-stretch h-16 flex-col justify-center items-start gap-1 flex">
        <div className="Title self-stretch text-black text-xl font-medium font-['Inter'] leading-[30px]">집에 가고싶냐?</div>
        <div className="Author self-stretch text-zinc-500 text-xl font-medium font-['Inter'] leading-[30px]">니가 가라 하와이</div>
      </div>
    </div>
  </div>
  <div className="ArticleTitle w-[1181px] h-[139px] left-[80px] top-[244px] absolute flex-col justify-center items-start gap-6 inline-flex">
    <div className="Titanic self-stretch text-black text-[64px] font-bold font-['Inter']">Titanic에 대해서 물어보세요!</div>
  </div>
  <div className="Navigation h-[164px] px-20 py-14 left-0 top-0 absolute bg-white justify-center items-center gap-[795px] inline-flex">
    <div className="SiteName text-black text-xl font-medium font-['Inter'] leading-[30px]">Site name</div>
    <div className="Items self-stretch justify-end items-center gap-12 inline-flex">
      <div className="Page text-black text-xl font-medium font-['Inter'] leading-[30px]">Page</div>
      <div className="Page text-black text-xl font-medium font-['Inter'] leading-[30px]">Page</div>
      <div className="Page text-black text-xl font-medium font-['Inter'] leading-[30px]">Page</div>
      <div className="Button px-6 py-3.5 bg-black rounded-lg shadow justify-center items-center gap-2 flex">
        <div className="Button text-white text-base font-medium font-['Inter'] leading-normal">Button</div>
      </div>
    </div>
  </div>
  <form onSubmit={handleSubmit(onSubmit)} className="InputField w-[1312px] h-[101px] px-4 py-3 left-[80px] top-[383px] absolute bg-white rounded-lg shadow border-4 border-blue-500 flex justify-between items-center">
    <input
      type="text"
      className="w-full h-full bg-transparent border-none outline-none text-black text-lg font-medium font-['Inter']"
      placeholder="글을 입력하세요..."
      {...register("question")}
    />
    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow font-medium font-['Inter']">전송</button>
  </form>
  {responseData && ( // responseData가 있을 때만 출력
        <div className="ResponseBox w-[404px] h-[346px] absolute bottom-[-47px] left-[49.8%] transform translate-x-[-48%] bg-gray-100 p-4 rounded-lg shadow">
          <p>답변 : </p>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
  <div className="ComicboldButtonLargeIdleTrue left-[292px] top-[591px] absolute flex-col justify-start items-start inline-flex" />
  <div className="ComicboldButtonLargeIdleTrue left-[1173px] top-[605px] absolute flex-col justify-start items-start inline-flex" />
  <div className="ComicboldButtonLargeIdleTrue left-[747px] top-[605px] absolute flex-col justify-start items-start inline-flex" />
</div>
  );
}