/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/m1DZoM8hkBu
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { useState, useRef } from "react"

export function AIConsole() {
  async function fetchData(input: String) {
    const res = await fetch('/api/fetchAI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const result = await res.json()
    return result.body;
  }
  const [aiResponse, setAiResponse] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const chatContainerRef = useRef(null)
  const handleUserInput = async (e) => {
    if (e.key === "Enter") {
      const response = await fetchData(userInput)
      setIsTyping(true)
      let i = -1
      const interval = setInterval(() => {
        setAiResponse((prev) => prev + response[i])
        i++
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        if (i >= response.length) {
          clearInterval(interval)
          setIsTyping(false)
          setUserInput("")
          setChatHistory([...chatHistory, { user: userInput, ai: [response] }])
          setAiResponse("")
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
      }, 50)
    } else {
      setUserInput(e.target.value)
    }
  }
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-50">
      <div className="flex-1 p-6">
        <div className="rounded-md overflow-hidden">
          <header className="bg-gray-900 pr-6 pl-4 py-2 flex items-center justify-between">
            <h1 className="text-xl font-semibold">AI Chatbot</h1>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
          </header>
          <div ref={chatContainerRef} className="h-[calc(100vh-10rem)] overflow-auto bg-[#0C0C0C] p-4">
            <div className="mb-4 text-sm text-green-500">
              Welcome to the AI Chatbot V0.0.3
            </div>
            {chatHistory.map((message, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">user@chatbot</span>
                  <span className="text-gray-400">~$</span>
                  <div className="text-gray-50">{message.user}</div>
                </div>
                <div className="mt-4 text-sm">{message.ai}</div>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <span className="text-green-400">user@chatbot</span>
              <span className="text-gray-400">~$</span>
              <input
                type="text"
                value={userInput}
                className="w-full bg-transparent text-gray-50 focus:outline-none"
                placeholder="Type your command here..."
                onKeyDown={handleUserInput}
                onChange={handleUserInput}
              />
            </div>
            <div className="mt-4 text-sm">
              {aiResponse}
              {isTyping && <span className="animate-pulse">_</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}