import React, { useEffect, useState } from 'react'
interface Chat
{
    id: string;
    message: string;
    sender: {
        image: string;
        is_kyc_verified: boolean;
        self: boolean;
        user_id: string;
    };
    time: string;
}
interface MessageProps
{
    chats: Chat[];
    increasepage:Function
}

const Message: React.FC<MessageProps> = ({ chats, increasepage }) =>
{
    var prevDate = '';
    window.addEventListener('scroll', () =>
    {
        // console.log('scrolled',window.scrollY);
        if (window.scrollY ==0) {
            console.log('on top');
            increasepage();
        }
    });
    return (
        <div className='messages flex flex-col gap-2 pb-20' id='messagecontainer'>
            {chats?.map((item, index) =>
            {
                var currentDate = item.time.split(' ')[0];
                return (
                    <div className='messages flex flex-col gap-2 mb-5' key={index}>
                        {prevDate !== currentDate && (
                            <div className='w-full flex flex-row justify-center items-center my-5'>
                                <span className='w-full h-[2px] absolute bg-gray-500 opacity-30  max-w-[50rem] mx-auto'></span>
                                <h1 className='px-5 border-0 overflow-hidden z-10 backgroundset'>{currentDate}</h1>
                            </div>
                        )}
                        <p className='hidden'>{prevDate = currentDate}</p>
                        {item.sender.self ? (
                            <div className='w-[80%] ml-auto mr-2 flex justify-end gap-1'>
                                <p className='w-[90%] text-justify text-sm bg-blue-700 text-white p-2 rounded-lg rounded-tr-none'>
                                    {item.message}
                                </p>
                                <img className='w-7 h-7 rounded-full' src={item.sender.image} alt='' />
                            </div>
                        ) : (
                            <div className='w-[80%] ml-2 flex justify-start gap-1'>
                                <img className='w-7 h-7 rounded-full' src={item.sender.image} alt='' />
                                <p className='w-[90%] text-justify text-sm bg-gray-300 p-2 rounded-lg rounded-tl-none'>
                                    {item.message}
                                </p>
                            </div>
                        )}
                        <div id='messagesEnd' />
                    </div>
                );
            })}
            
        </div>
    )
}

export default Message;