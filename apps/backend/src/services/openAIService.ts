import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

if (!process.env.OPENAI_API_KEY) {
  console.log('OPENAI_API_KEY is not defined in the environment variables.');
}


/**
 * Calls the OpenAI API to process a given prompt.
 * @param prompt - The string input to be processed by OpenAI.
 * @returns The response from OpenAI as a string.
 */
export const callOpenAI = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const choice = response.choices[0];
    if (choice && choice.message && choice.message.content) {
      return choice.message.content.trim();
    }

    return 'No response from OpenAI.';
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return 'Error processing your request.';
  }
};
