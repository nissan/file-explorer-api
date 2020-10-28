import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello friend, you may want to <a href='#'>load the website now</a>";
  }
}
