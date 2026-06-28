import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ImageGeneratorService {
  private client: OpenAI | null = null;

  constructor() {
    const key = process.env.OPENAI_API_KEY;
    if (key) {
      this.client = new OpenAI({ apiKey: key });
    }
  }

  async generate(prompt: string) {
    if (!this.client) {
      return {
        success: false,
        error: 'OPENAI_API_KEY is not configured',
      };
    }

    try {
      const result = await this.client.images.generate({
        model: 'dall-e-3',
        prompt: this.buildBrandPrompt(prompt),
        size: '1024x1024',
      });

      return {
        success: true,
        prompt,
        image: result.data?.[0],
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Image generation failed';
      return {
        success: false,
        error: message,
      };
    }
  }

  private buildBrandPrompt(prompt: string) {
    return `
KVRAT Brand Identity Style:
- futuristic AI system design
- orange and blue color palette
- clean modern UI aesthetic
- tech startup landing page visuals
- premium, minimal, high-end design

User request:
${prompt}
`;
  }
}
