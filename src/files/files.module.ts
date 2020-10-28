import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports :[MulterModule.registerAsync({
    useFactory: () => ({
      dest: './upload',
    }),})]
})
export class FilesModule {}
