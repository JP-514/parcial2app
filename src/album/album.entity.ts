/* eslint-disable prettier/prettier */
import { TrackEntity } from '../track/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { PerformerEntity } from '../performer/performer.entity';

@Entity()
export class AlbumEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   nombre: string;
   @Column()
   caratula: string;
   @Column()
   fecha_lanzamiento: Date;
   @Column()
   descripcion: string;

   @OneToMany(() => TrackEntity, track => track.album)
   tracks: TrackEntity[];

   @ManyToMany(() => PerformerEntity, performer => performer.albums)
   performers: PerformerEntity[];

}