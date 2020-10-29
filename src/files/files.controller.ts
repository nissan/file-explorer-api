import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { editFileName, validFileFilter } from 'src/utils/file-utils';
import { CreateFileDto } from './dtos/create-file.dto';
import { UpdateFileDto } from './dtos/update-file.dto';
@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService) { }

    @Get()
    findAll(@Query()paginationQuery) {
        const {limit,offset}=paginationQuery;
        return this.fileService.findAll(offset?parseInt(offset):0,
                                        limit?parseInt(limit):20,
                                        );
    }
    @Get('/deleted')
    findAllDeletedFiles() {
        return this.fileService.findAll(0,100,true);
    }

    @Get(":id")
    findByFolder(@Param("id")folderId:number){
        return this.fileService.findByFolder(folderId);
    }
    @Post()
    createFolder(@Body() createFileDto:CreateFileDto){
        console.log(`createFileDTO: ${createFileDto}`);
        return this.fileService.createFolder(createFileDto);
    }

    @Patch(':id')
    updateFile(@Param("id") fileOrFolderId:number, @Body() updateFileDto:UpdateFileDto)
    {
        console.log(fileOrFolderId);
        console.log(updateFileDto);
        return this.fileService.updateFile(fileOrFolderId, updateFileDto);
    }

    @Delete(':id')
    deleteFileOrFolder(@Param('id')fileOrFolderId:number)
    {
        return this.fileService.deleteFileOrFolder(fileOrFolderId);
    }

// Reference: https://gabrieltanner.org/blog/nestjs-file-uploading-using-multer
    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: validFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file, @Body() createFileDto:CreateFileDto) {
        return this.fileService.createFile(file,createFileDto);
    }


    @Get('/download/:file')
    downloadFile(@Param('file') file, @Res() res) {
        return res.sendFile(file, { root: './files' });
    }

    
}

