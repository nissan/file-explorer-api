import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { validFileFilter } from 'src/utils/file-utils';
@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService) { }

    @Get()
    findAll(): string {
        return 'This action returns all files';
    }

    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './files',
            }),
            fileFilter: validFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file) {
        console.log(file);
        const response = {
            originalname: file.originalname,
        };
        return response;
    }


    @Get('/download/:file')
    downloadFile(@Param('file') file, @Res() res) {
        return res.sendFile(file, { root: './files' });
    }
}

