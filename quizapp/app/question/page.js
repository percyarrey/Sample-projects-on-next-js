//QUESTION PAGE
'use client'
import { useEffect, useRef, useState } from "react"
import {MoonLoader, PropagateLoader} from 'react-spinners'

function page() {
  //DROPDOWN DIV
  const dropdiv = useRef(null)
  //HANDLE DROPDOWM
  const handleDropdown=()=>{
    if(dropdiv.current!=null && dropdiv.current !=undefined){
      dropdiv.current.classList.toggle("hidden")  
    }
  }
  //USESTATE
  const [req,setReq] = useState({
    category:"trivia",
    num:1
  })
  const [answer, setAnswer] = useState()
  const [data, setData] = useState("")
  const [warning, setWarning] = useState({
    message:"",
    score:0
  })
  //HANDLEDATA
  const handleData=(e)=>{
      setData(e.target.value)
  }
  //HANDLECATEGORY
  const handleCategory=(e)=>{
    setAnswer('loading1')
    setReq(prev=>({
      ...prev,
      category:e.target.name
    }))
  }
  //HANDLE SUBMIT
  const handleSubmit=(e)=>{
      if(warning.message ==""){
        if(answer.number==data){
          setWarning(prev=>({
            message:"Correct",
            score:prev.score+1
          }))
      }else{
        setWarning(prev=>({
          ...prev,
          message:"wrong"
        }))
      };
      }
  }
  //HANDLE NEXT QUESTION
  const handleNext=(e)=>{
    setAnswer("loading")
    setData("")
    setReq(prev=>({
      ...prev,
      num:prev.num+1
    }))
    setWarning(prev=>({
      ...prev,
      message:""
    }))
}

  useEffect(()=>{
    (
      
      async()=>{
        if(req.category=='random'){
          const url = 'https://numbersapi.p.rapidapi.com/random/trivia?json=true&fragment=true&max=100&min=1';
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '255c233b7bmsh57f646830e62342p196947jsna52efd43ed47',
              'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
            }
          };
          
          await fetch(url, options)
          .then(res=>res.json())
          .then(res=>{
            setTimeout(() => {
              setAnswer(res)
              console.log(res)
            }, 0);
          })
          .catch(err=>{
            setTimeout(() => {
              setAnswer("Something Went Wrong")
            }, 2000);
          })
        }else{
          const url = 'https://numbersapi.p.rapidapi.com/random/'+req.category+'?json=true&fragment=true&max=100&min=1';
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '255c233b7bmsh57f646830e62342p196947jsna52efd43ed47',
              'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
            }
          };
          await fetch(url, options)
          .then(res=>res.json())
          .then(res=>{
            console.log(res)
            setTimeout(() => {
              setAnswer(res)
            }, 1000);
          })
          .catch(err=>{
            setTimeout(() => {
              setAnswer("Something Went Wrong")
            }, 2000);
          })
        }
        
      })()
  },[req])
  return (
    <div className='min-h-[95vh] pt-[6rem] flex justify-center bg-slate-50'>
      {
        answer !=="Something Went Wrong" && answer? <div className=" h-[100] w-full flex">
          <div className="z-10  h-[100] w-0 mt-11 sm:mt-0 sm:w-4/12 bg-slate-100 border-e-4 rounded-sm">
            <button onClick={handleDropdown} id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="z-10  text-white min-w-[3rem] bg-sky-600 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 md:py-2 sm:w-[100%] flex justify-between" type="button">Category<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg></button>
            <div ref={dropdiv} className="z-10  min-w-[10rem] bg-white divide-y divide-gray-100 rounded-lg shadow w-50 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                  <li>
                    <button onClick={handleCategory} name="year" className="block w-full  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Year Fact</button>
                  </li>
                  <li>
                     <button onClick={handleCategory} name="trivia" className="block w-full  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Trivia Fact</button>
                  </li>
                  <li>
                    <button onClick={handleCategory} name="random" className="block w-full  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Random Fact</button>
                  </li>
                  <li>
                    <button onClick={handleCategory} name="math" className="block w-full  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Math Fact</button>
                  </li>
                  <li>
                    <button onClick={handleCategory} name="date" className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Date Fact <small>(<b>hint:</b><span  className=" italic"> input day</span>)</small></button>
                  </li>
                </ul>
            </div>

          </div>
          {
            answer!="loading1"?<div className="w-full sm:w-8/12 flex justify-center">
            <div className="w-full">
              <div className="flex justify-between px-5">
                <h1 className="text-xl">Category : <span className=" font-extrabold uppercase  text-indigo-600">{req.category}</span></h1>
                <h1 className="text-xl">Score : <span className=" font-extrabold uppercase text-teal-600">{warning.score}</span></h1>
              </div>
              <div className="mt-3 mb-2 w-[100%] flex border-b-2 rounded-md">
              </div>
              {answer!="loading"?
                <>
                  <div className="w-full">
                    <div className="h-[0px] text-center w-full text-lg">  
                      {warning.message==="Correct"?
                        <div className=" font-extrabold text-teal-600 text-3xl">Your Correct</div>:
                        warning.message==="wrong"?<div className=" text-red-600">Wrong Answer <br/> <span className=" text-teal-600">Answer: {answer.number}</span></div>:<span></span>
                      }
                    </div>
                    <div className="flex mt-[8rem] w-full justify-center">
                      <div className="w-full lg:px-10">
                        <h1 className="ms-2 text-lg">{req.num}) {answer.text}</h1>
                        <div>
                        <input
                        type="text" onChange={handleData} value={data}
                        placeholder="Enter the right number"
                        className="w-[70%] sm:w-[60%] md:w-[70%] border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
                        />
                        <button className="inline-flex w-[30%] sm:w-[40%] md:w-[30%] items-center justify-center px-3 md:px-8 py-3 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]" onClick={handleSubmit}>
                                  Check Answer
                        </button>
                      </div>
                        </div>
                    </div>
                  </div>
                  {/* NEXT BUTTON */}
                  <div className="mt-8 px-3">
                    <button onClick={handleNext} className="inline-flex items-center justify-center px-8 py-3 font-sans font-semibold tracking-wide text-white bg-emerald-600 w-full rounded-lg h-[60px]">
                      Next Question
                    </button>
                  </div>
                </>:
                <div className="w-full mt-11 flex justify-center items-center">
                  <MoonLoader/>
              </div>
              }
            </div>
          </div>:<div className="w-full sm:w-8/12 flex justify-center items-center">
            <PropagateLoader/>
          </div>
          }
          
      </div>
      : answer==="Something Went Wrong"?<div className=" text-rose-600">{answer}</div>:<img className=" rounded-lg" src='loadingAvater.gif' />
      }
      
      
    </div>
  )
}

export default page