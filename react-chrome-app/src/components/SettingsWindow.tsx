import {actionKey, tokenKey} from "../App";

type Props = {
  action?: string
  setAction: (action: string) => void
  token?: string
  setToken: (action: string) => void
}

export default function ({
  action,
  setAction,
  token,
  setToken,
                         }: Props) {
  return (
    <>
      <h3>Setings</h3>
      <label>ChatGPT API key:
        <input value={token} onChange={(e) => {
          setToken(e.target.value)
          chrome.storage.local.set({[tokenKey]: e.target.value})
        }} />
      </label>
      <label>Akce:
        <select
          value={action}
          onChange={(e) => {
            setAction(e.target.value)
            chrome.storage.local.set({[actionKey]: e.target.value})
          }}
        >
          <option value={undefined}>Zvol akci</option>
          <option>Zjednodusi text</option>
          <option>Preloz do cestiny tento text</option>
        </select>
      </label>
    </>
  )
}
