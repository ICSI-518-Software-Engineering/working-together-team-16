import OpenAI from "openai";
import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import { API_KEY, OPENAI_BASE_URL } from "../Constants";

const useOpenAi = (initialState = {}) => {
  const openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const assistant_id = "asst_UvLTCC84w0hjFfgZWNvc2bnT";
  const [thread_id, setThread] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("IN home", thread_id);

  useEffect(() => {
    const fetch = async () => {
      const thread = await openai.beta.threads.create();
      setThread(thread.id);
      console.log("Chat thread created", thread.id);
    };
    fetch();
  }, []);

  const addMessage = async (msg) => {
    setIsLoading(true)
    console.log("thread_d", thread_id);
    const message = await openai.beta.threads.messages.create(thread_id, {
        role: "user",
        content: msg,
    });

    let run = await openai.beta.threads.runs.create(thread_id, {
        assistant_id
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

    while(run.status != 'completed'){
        run = await openai.beta.threads.runs.retrieve(thread_id, run.id)
        console.log("status : pending")
        await sleep(500);
    }

    if (run.status === "completed") {
      const _messages = await openai.beta.threads.messages.list(thread_id);
      setMessages(_messages.data);
      for (const message of _messages.data.reverse()) {
        console.log(`${message.role} > ${message.content[0].text.value}`);
      }
    } else {
      console.log(run.status);
    }
    setIsLoading(false)
  };
  return {
    messages,
    addMessage,
    isLoading
  };
};

const OpenAi = createContainer(useOpenAi);

export default OpenAi;
