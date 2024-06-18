import OpenAI from "openai";
import { metadata } from '../app/layout';

export default async function openaigen(input:String) {
  const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
  });
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: input }],
      model: "gpt-3.5-turbo-0125", 
    });
    return "Hello"
  } catch (error) {
    return error.message;
  }
  
}
