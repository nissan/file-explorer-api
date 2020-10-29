import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileTypeEntity } from './entities/file-type.entity';
import { FileEntity } from './entities/file.entity';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports :[TypeOrmModule.forFeature([FileEntity,FileTypeEntity])]
})
export class FilesModule {}
