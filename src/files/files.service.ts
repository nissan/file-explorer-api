import { HttpException, Injectable } from '@nestjs/common';
import { CreatefileDto } from './dtos/createfile.dto';
import { FileTypeEntity } from './entities/file-type.entity';
import { FileEntity } from './entities/file.entity';


@Injectable()
export class FilesService {
    private fileTypes:FileTypeEntity[] = [
        {
            id:1,
            name:'CSV',
            extension:'csv'
        },
        {
            id:2,
            name:'GeoJSON',
            extension:'geojson'
        },
        {
            id:3,
            name:'folder',
            extension:''
        }
    ];
    private files:FileEntity[] = [
        {
            id: 1,
            originalFileName: 'root',
            storedFileName: '',
            fileTypeEntityId: 3,
            parentFolderId: 1,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            isDeleted:false
        },
        {
            id: 2,
            originalFileName: 'documents',
            storedFileName: '',
            fileTypeEntityId: 3,
            parentFolderId: 1,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            isDeleted:false
        },
        {
            id: 3,
            originalFileName: 'sales.csv',
            storedFileName: 'sales-0123.csv',
            fileTypeEntityId: 1,
            parentFolderId: 1,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            isDeleted:false
        },
        {
            id: 3,
            originalFileName: 'sales.csv',
            storedFileName: 'sales-0001.csv',
            fileTypeEntityId: 1,
            parentFolderId: 1,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            isDeleted:true
        },
        {
            id: 4,
            originalFileName: 'salesdistribution.geojson',
            storedFileName: 'salesdistribution-0113.csv',
            fileTypeEntityId: 2,
            parentFolderId: 2,
            dateCreated: new Date(),
            dateLastUpdated: new Date(),
            isDeleted:false
        },       
    ]

    findAll(limit:number=20, offset:number=0){
        return this.files.slice(offset, limit);
    }

    findByFolder(folderId:number){
       return this.files.filter(file=>file.id!==+folderId && 
                        file.parentFolderId===+folderId);
    }

    createFile(createFileDto:CreatefileDto){
        //create the information to the database
        return "done";
    }
}
