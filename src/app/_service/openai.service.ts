import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  openAI: OpenAIApi | undefined;

  constructor() {
    const configuration = new Configuration({
      apiKey: 'XX',
    });
    this.openAI = new OpenAIApi(configuration);
  }

  /**
   * Rest API call to OpenAI
   * Ref - https://platform.openai.com/docs/api-reference
   * @param prompt -> Question in string
   */
  async generateText(prompt: string): Promise<string> {
    try {
      const completions = await this.openAI?.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0,
        max_tokens: 100,

      });

      const message = completions?.data.choices[0].text;
      // @ts-ignore
      return message || 'No Response';
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }
      return error.response;
    }
  }


}
