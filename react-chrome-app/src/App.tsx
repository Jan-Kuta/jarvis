import { useEffect, useState } from 'react'
import './App.css'
import { pushText } from "./api/client";
import ManiWindow from "./components/ManiWindow";
import SettingsWindow from "./components/SettingsWindow";

export const actionKey = 'textAction'
export const tokenKey = 'tokenChatGPT'

function App() {
  const [content, setContent] = useState<string | undefined>(undefined)
  const [action, setAction] = useState<string | undefined>(undefined)
  const [response, setResponse] = useState<string | undefined>(undefined)
  const [token, setToken] = useState<string | undefined>(undefined)
  const [showSettngs, setShowSettings] = useState<boolean>(false)

  useEffect(() => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      // Callback function
      chrome.tabs.sendMessage(
        tabs[0]?.id || 0,
        {type: 'getSelection'},
        (res) => {
          setContent(`${res?.data}`)
          if (!res?.data) {
            setShowSettings(true)
          }
        })
    })
  }, [])

  useEffect(() => {
    chrome.storage.local.get().then(res => setAction(res[actionKey]))
  }, [])

  useEffect(() => {
    chrome.storage.local.get().then(res => setToken(res[tokenKey]))
  }, [])

  useEffect(() => {
    if (action!==undefined && content !== undefined && token !== undefined){
      pushText(content, action, token).then((res) => setResponse(res))
    }
  }, [action, content, token])

  return (
    <div className="App">
      <div>
        <img src="/codeHelpsIcon.png" className="logo" alt="Code Helps" />
      </div>
      <h1>Code Helps</h1>
      <label>
        <input
          type="checkbox"
          checked={showSettngs} onChange={() => setShowSettings(prev => !prev)}
        /> Show settings
      </label>
      {!showSettngs && (
        <ManiWindow action={action} content={content} response={response} />
      )}
      {showSettngs && (
        <SettingsWindow
          action={action}
          setAction={setAction}
          token={token}
          setToken={setToken}
        />
      )}
    </div>
  )
}

export default App
