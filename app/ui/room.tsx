"use client"

import { useRef, useState } from "react"
import { CHAT_BOT_DESCRIPTION, CHAT_BOT_NAME } from "../lib/constants"
import MyMessage from "./my-message"
import Message from "./server-message"
import Attach from "./svg/attach"
import Microphone from "./svg/microphone"
import Search from "./svg/search"
import Send from "./svg/send"
import useSocket from "../lib/hooks/socket"

import clsx from "clsx"
import Loading from "./svg/loading"


export default function Room() {
    const [ value, setValue ] = useState('')
    
    const divRef = useRef<HTMLDivElement>(null)

    const [ connect, messages, setMessages, sendMessage ] = useSocket('ws://127.0.0.1:8000/ws/chat/room/')

    function handleClick() {
        
        sendMessage && sendMessage(JSON.stringify({
            'message': value
        }))
        setMessages([
            ...messages,
            {
                type: true,
                value: value
            }
        ])
        setValue('')
        
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.currentTarget.files) {
            const file = event.currentTarget.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setMessages([
                    ...messages,
                    {   
                        type: true,
                        value: reader.result as string
                    }
                ])
           }
        }
    }

    function scrollDown() {
        setTimeout(() => {
            if (divRef.current) {
                divRef.current.scrollTop = divRef.current?.scrollHeight
            }
        }, 10)
    }

    scrollDown()

    return (
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-full">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                        <span className="absolute text-green-500 right-0 bottom-0">
                        <svg width="20" height="20">
                            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                        </svg>
                        </span>
                        <img src="/robot.png" alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"/>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <div className="text-2xl mt-1 flex items-center">
                        <span className="text-gray-700 mr-3">{CHAT_BOT_NAME}</span>
                        </div>
                        <span className="text-lg text-gray-600">{CHAT_BOT_DESCRIPTION}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                        <Search/>
                    </button>
                </div>
            </div>
            <div id="messages"
                ref={divRef}
                className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                {
                    messages.map((message, index) => {
                        if (message.type) {
                            return (
                                <MyMessage key={index} message={message.value} />
                            )
                        } else {
                            return (
                                <Message key={index} message={message.value} />
                            )
                        }
                    })   
                }
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                <div className="relative flex">
                    <span className="absolute inset-y-0 flex items-center">
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <Microphone />
                        </button>
                    </span>
                    <input type="text" 
                        placeholder="Write your message!" 
                        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.code == "Enter") {
                                handleClick()
                            }
                        }}/>
                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                        <label className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <input type="file" className="hidden" onChange={handleFileChange} />
                            <Attach />
                        </label>
                        <button type="button" 
                            className={clsx(
                                "inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none",
                                {
                                    "px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700": connect == false
                                }
                            )}
                            onClick={handleClick}
                            disabled={!connect}>
                            send
                                {
                                    connect? <Send/> : <Loading/>
                                }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}