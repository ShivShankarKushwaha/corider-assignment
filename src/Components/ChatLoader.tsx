import React from 'react';

function ChatLoader()
{
    return (
        <div className="messages flex flex-col gap-2">
            <div className="message">
                <div className="avatar"></div>
                <div className="message-content"></div>
            </div>
            <div className="message">
                <div className="avatar"></div>
                <div className="message-content"></div>
            </div>
            <div className="message">
                <div className="avatar"></div>
                <div className="message-content"></div>
            </div>
        </div>
    );
}

export default ChatLoader;
