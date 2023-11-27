/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typerorm-testing-config';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { faker } from '@faker-js/faker';

describe('AlbumService', () => {
 let service: AlbumService;
 let repository: Repository<AlbumEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [AlbumService],
   }).compile();

   service = module.get<AlbumService>(AlbumService);
   repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('create should return a new album', async () => {
  const album: AlbumEntity = {
    id: "",
    nombre: faker.music.songName(),
    caratula: faker.image.url(),
    fecha_lanzamiento: faker.date.anytime(),
    descripcion: faker.lorem.words(10),
    tracks: [],
    performers: []
  }

  const newAlbum: AlbumEntity = await service.create(album);
  expect(newAlbum).not.toBeNull();

  const storedAlbum: AlbumEntity = await repository.findOne({where: {id: newAlbum.id}})
  expect(storedAlbum).not.toBeNull();
  expect(storedAlbum.nombre).toEqual(newAlbum.nombre)
  expect(storedAlbum.caratula).toEqual(newAlbum.caratula)
  expect(storedAlbum.fecha_lanzamiento).toEqual(newAlbum.fecha_lanzamiento)
  expect(storedAlbum.descripcion).toEqual(newAlbum.descripcion)
});

it('create should return an error due to empty description', async () => {
  const album: AlbumEntity = {
    id: "",
    nombre: faker.music.songName(),
    caratula: faker.image.url(),
    fecha_lanzamiento: faker.date.anytime(),
    descripcion: "",
    tracks: [],
    performers: []
  }

  const newAlbum: AlbumEntity = await service.create(album);
  expect(() => service.create(newAlbum)).toThrow("The album must have a description")
});

});