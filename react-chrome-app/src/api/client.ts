import {Simulate} from "react-dom/test-utils";
import progress = Simulate.progress;

const engine = 'text-davinci-003'
const API_URL = `https://api.openai.com/v1/engines/${engine}/completions`

export const pushText = async (text: string, action: string, token: string) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      prompt: `${action}: "${text}"`,
      temperature: 0.9,
      max_tokens: 1024,
    }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }).then((res) => res.json());

  return  response?.choices?.[0]?.text;
}
