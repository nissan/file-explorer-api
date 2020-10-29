import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { editFileName, validFileFilter } from 'src/utils/file-utils';
import { CreatefileDto } from './dtos/createfile.dto';
@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService) { }

    @Get()
    findAll(@Query()paginationQuery) {
        const {limit,offset}=paginationQuery;
        return this.fileService.findAll(limit, offset);
    }

    @Get(":id")
    findByFolder(@Param("id")folderId:number){
        console.log(folderId);
        return this.fileService.findByFolder(folderId);
    }
    @Post()
    createFolder(@Body() body){
        return 'This creates a new folder';
    }

    @Patch(':fileOrFolderid')
    renameFileOrFilder(@Param('fileOrFolderId')fileOrFolderId:number, 
                        @Body() body)
    {
        return 'Rename a file or folder'
    }

    @Delete(':fileOrFolderId')
    deleteFileOrFolder(@Param('fileOrFolderId')fileOrFolderId:number)
    {
        return 'Deletes a file or folder'
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
    async uploadedFile(@UploadedFile() file, @Body() body) {
        console.log(file);
        const response = {
            originalName: file.originalname,
            fileName: file.filename,
            filePath: body.filepath,
            body: JSON.parse(body.createFileDto)
        };
        let createFileDto:CreatefileDto = body.createFileDto;
        createFileDto.fileName = file.filename,


        this.fileService.createFile(createFileDto)

        return response;
    }


    @Get('/download/:file')
    downloadFile(@Param('file') file, @Res() res) {
        return res.sendFile(file, { root: './files' });
    }

    
}

