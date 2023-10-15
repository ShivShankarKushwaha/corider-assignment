import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Message from './Components/Message';
// import ChatLoader from './Components/ChatLoader';

function App()
{
  const [showfileoption, setfileoption] = useState(false);
  const [alldata, setalldata] = useState({ name: '', message: '', status: '', to: '', from: '', chats: [{ id: '', message: '', sender: { image: '', is_kyc_verified: false, self: false, user_id: '' }, time: '' }] });
  const [page, setpage] = useState(1);
  const [pageload,setpageload]=useState(false);
  function increasepage()
  {
    console.log('page getting now', page + 1);
    setpage(page+1);
    setTimeout(() =>
    {
      window.scrollTo({
        top: 10,
        behavior: 'smooth' // Enable smooth scrolling behavior
      });
    }, 50);
  }
  useEffect(() =>
  {
    console.log('inside useeffect',page);
    if (page !== 1) {
      fetch('https://qa.corider.in/assignment/chat?page=' + page)
        .then(response => response.json())
        .then(result =>
        {
          // Add new chats to the existing chats array
          setalldata(prevData =>
          {
            // setpage(page+1);
            return {
              ...prevData,
              chats: result.chats.concat(prevData.chats),
            };
          });
          console.log('chats are', result);
        })
        .catch(err =>
        {
          alert('Error while loading the chat');
        });
    } else 
    {
      fetch('https://qa.corider.in/assignment/chat?page=' + page)
        .then(response => response.json())
        .then(result =>
        {
          setalldata(result);
          setpageload(!pageload);
          console.log('chats are', result);
        })
        .catch(err =>
        {
          alert('Error while loading the chat');
        });
    }
  }, [page]);

  useEffect(() =>
  {
    window.scrollTo({
      top: window.outerHeight*10,
      behavior: 'smooth' // Enable smooth scrolling behavior
    });
  },[pageload])
  return (
    <div className='backgroundset max-w-[50rem] mx-auto'>
      <div className='fixed z-20 w-full backgroundset  max-w-[50rem] mx-auto'>
        <div className='w-[80%] flex justify-between mx-auto my-5 items-center'>
          <div className='flex justify-center items-center gap-2'>
            {/* <img className='w-5 h-5 rounded-full' src="./arrow.png" alt="" /> */}
            <h1 className='text-2xl text-black'>{alldata?.name}</h1>
          </div>
          <img className='w-4 h-4' src="./editing.png" alt="" />
        </div>
        <div className='w-[80%] mx-auto flex justify-between items-center border-0'>
          <div className='flex gap-2 items-center'>
            <div className='w-10 h-10 overflow-hidden rounded-full flex flex-wrap'>
              <img className='w-5 h-5 ' src={alldata?.chats[0]?.sender.image} alt="" />
              <img className='w-5 h-5 ' src={alldata?.chats[1]?.sender.image} alt="" />
              <img className='w-5 h-5' src={alldata?.chats[2]?.sender.image} alt="" />
              <img className='w-5 h-5' src={alldata?.chats[3]?.sender.image} alt="" />
            </div>
            <div>
              <h1>From <span className='font-bold'>{alldata?.from}</span></h1>
              <h2>To <span className='font-bold'>{alldata?.to}</span></h2>
            </div>
          </div>
          <div className='flex flex-col justify-between items-center gap-1'>
            <span className='w-1 h-1 bg-black rounded-full'></span>
            <span className='w-1 h-1 bg-black rounded-full'></span>
            <span className='w-1 h-1 bg-black rounded-full'></span>
          </div>
        </div>
      </div>
      <div className='pt-40 -z-10' id='messagebox'>
        <Message chats={alldata?.chats} increasepage={increasepage} />
      </div>
      {/* <ChatLoader></ChatLoader> */}
      <div className='inputbox bg-white flex justify-center items-center fixed bottom-1  w-full ml-1 gap-4 border-2 border-l-2 px-1 rounded-lg z-20 -left-1 sm:left-auto max-w-[49.5rem] mx-96'>
        <input className='w-[85%] p-1 h-10 bg-white border-0 rounded-tl-lg rounded-bl-lg border-r-0 outline-none' type="text" placeholder={'Chat in @' + alldata?.from} />
        <img className='w-5 h-5 active:scale-95 hover:scale-105 transition-all duration-300' src="./file.png" onClick={() => { setfileoption(!showfileoption) }} alt="" />
        <img className='w-5 h-5 active:scale-95 hover:scale-105 transition-all duration-300' src="./send.png" alt="" />
        {showfileoption && <div style={{ backgroundColor: 'rgb(5, 228, 5)' }} className={'fixed w-fit flex p-2 rounded-xl right-5 bottom-16 gap-3 transition-all duration-300 '}>
          <img className='w-5 h-5 text-white' src="./camera.png" alt="" />
          <img className='w-5 h-5' src="./video-camera.png" alt="" />
          <img className='w-5 h-5' src="./download.png" alt="" />
          <span className='absolute -bottom-4 left-1/2 bg-[rgb(5, 228, 5)] w-5 h-4 conemessage'></span>
        </div>}
      </div>
    </div>
  );
}

export default App;
