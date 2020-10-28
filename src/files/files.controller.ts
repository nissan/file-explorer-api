import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express'
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private readonly fileService:FilesService){}

    @Get()
    findAll(): string {
        return 'This action returns all files';
    }
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        console.log(file);
    }
}
