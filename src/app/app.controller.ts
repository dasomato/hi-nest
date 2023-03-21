import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    return 'Welcome to my Movie API';
  }
}
