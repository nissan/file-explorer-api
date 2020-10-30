import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    extension: string;
}
