import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  health() {
    return {
      status: 'KVRAT backend running',
      time: new Date(),
    };
  }

  @Post('ai/test')
  testAI(@Body() body: any) {
    return {
      input: body,
      output: `KVRAT received: ${JSON.stringify(body)}`,
    };
  }
}