import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  home() {
    return 'Welcome to my Movie API';
  }
  @Get('hello')
  hello(@Query('name') name:string) :string {
    return `hello EveryBody ${name}`;
  }
}
