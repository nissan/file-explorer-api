import { Injectable, NotFoundException } from '@nestjs/common';
import { extname } from 'path';
import { CreateFileDto } from './dtos/create-file.dto';
import { UpdateFileDto } from './dtos/update-file.dto';
import { FileTypeEntity } from './entities/file-type.entity';
import { FileEntity } from './entities/file.entity';


@Injectable()
export class FilesService {
    private seed = 100; //for test purposes until DB generates ids
    private fileTypes: FileTypeEntity[] = [
        {
            id: 1,
            name: 'CSV',
            extension: 'csv'
        },
        {
            id: 2,
            name: 'GeoJSON',
            extension: 'geojson'
        },
        {
            id: 3,
            name: 'folder',
            extension: ''
        }
    ];
    private files: FileEntity[] = [
        {
            id: 1,
            originalFileName: 'root',
            storedFileName: '',
            fileTypeEntityId: 3,
            parentFolderId: 1,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            isDeleted: false
        },
        {
            id: 2,
            originalFileName: 'documents',
            storedFileName: '',
            fileTypeEntityId: 3,
            parentFolderId: 1,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            isDeleted: false
        },
        {
            id: 3,
            originalFileName: 'sales.csv',
            storedFileName: 'sales-0123.csv',
            fileTypeEntityId: 1,
            parentFolderId: 1,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            isDeleted: false
        },
        {
            id: 4,
            originalFileName: 'sales.csv',
            storedFileName: 'sales-0001.csv',
            fileTypeEntityId: 1,
            parentFolderId: 1,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            isDeleted: true
        },
        {
            id: 5,
            originalFileName: 'salesdistribution.geojson',
            storedFileName: 'salesdistribution-0113.csv',
            fileTypeEntityId: 2,
            parentFolderId: 2,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            isDeleted: false
        },
    ]

    findAll(offset = 0, limit = 20, isDeleted = false) {
        console.log(offset);
        console.log(limit);
        console.log(offset + limit);
        return this.files.filter(file => file.isDeleted === isDeleted).slice(offset, offset + limit);
    }

    findByFolder(folderId: number) {
        const folderType = this.fileTypes.find(fileType => fileType.name === 'folder');
        if (this.files.find(file => file.id === +folderId).fileTypeEntityId !== folderType.id)
            throw new NotFoundException(`${folderId} does not exist, is deleted or is not a valid folder`);
        const matches = this.files.filter(file => file.id !== +folderId && file.parentFolderId === +folderId);
        return matches;
    }

    renameFileOrFolder(updateFileDto: any) {
        // TODO:
    }

    deleteFileOrFolder(id: number) {
        //first find the file
        const match = this.files.find(file => file.id === +id);
        if (!match)
            throw new NotFoundException(`${id} does not exist`);
        // check if it is already deleted
        if (match.isDeleted)
            throw new NotFoundException(`${id} is already deleted`);
        ;
        //fset the isDeleted flag to true for the file
        const newEntry = { ...match, isDeleted: true };
        //splice the array to insert the deleted file entry
        this.files.splice(this.files.findIndex(
            file => file.id === +match.id), 1, newEntry);
        //if it is a folder, cascade delete to its children     
        const folderType = this.fileTypes.find(
            fileType => fileType.name === 'folder');
        if (match.fileTypeEntityId === folderType.id) {
            try {
                this.findByFolder(match.id)
                    .forEach(child =>
                        this.deleteFileOrFolder(child.id)
                    );
            }
            catch (ex) { } //do nothing
        }
    }

    createFile(file, createFileDto: CreateFileDto) {
        const newFileEntity: FileEntity = {
            id: this.seed++,
            originalFileName: file.originalname,
            storedFileName: file.filename,
            fileTypeEntityId: this.fileTypes.find(
                fileType => fileType.extension
                    ===
                    (extname(file.originalname).slice(1))).id,
            parentFolderId: +createFileDto.parentFolderId ? +createFileDto.parentFolderId : 1,
            isDeleted: false,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
        }
        this.files.push(newFileEntity);
        return newFileEntity;
    }

    createFolder(createFileDto: CreateFileDto) {
        console.log(`createFileDTO: ${createFileDto}`);

        const newFileEntity: FileEntity = {
            id: this.seed++,
            originalFileName: createFileDto.originalName,
            storedFileName: createFileDto.originalName,
            fileTypeEntityId: this.fileTypes.find(
                fileType => fileType.name
                    ===
                    ('folder')).id,
            parentFolderId: +createFileDto.parentFolderId ? +createFileDto.parentFolderId : 1,
            isDeleted: false,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
        }
        this.files.push(newFileEntity);
        return newFileEntity;
    }

    updateFile(id: number, updateFileDto: UpdateFileDto) {
        const updatedFileEntity = { ...this.files.find(file => file.id === +id) };
        if (!updatedFileEntity) {
            throw new NotFoundException("file or folder could not be found");
        }
        if (updatedFileEntity.isDeleted) {
            throw new NotFoundException("file or folder has been deleted");
        }
        if (updateFileDto.originalName) {
            updatedFileEntity.originalFileName = updateFileDto.originalName;
        }
        if (updateFileDto.parentFolderId){
            updatedFileEntity.parentFolderId = updateFileDto.parentFolderId;
        }
        updatedFileEntity.dateLastUpdated = new Date();
        this.files.splice(this.files.findIndex(
            file => file.id === +updatedFileEntity.id), 1, updatedFileEntity);    
    }
}

