import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';

@Module({
  imports: [FilesModule, MulterModule.registerAsync({
    useFactory: () => ({
      dest: 'uploads/',
    }),})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
