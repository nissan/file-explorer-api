import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { FileTypeEntity } from "./file-type.entity";
@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    originalFileName: string;
    @Column()
    storedFileName: string;
    @OneToOne(()=>FileTypeEntity)
    @Column()
    fileTypeEntityId: number;
    @OneToOne(()=>FileEntity) //maps back on to itself
    @Column()
    parentFolderId: number;
    @Column()
    dateCreated: Date;
    @Column()
    dateLastUpdated: Date;
    @Column()
    isDeleted:boolean;
}
