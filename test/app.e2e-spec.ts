import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist:true,
        forbidNonWhitelisted:true,
        transform:true,
      })
    )
    await app.init();
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test',
        director: 'Test2',
        year: 2000,
        genres: ['Test'],
      })
      .expect(201);
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404)
    });
  });
  describe('/movies:id', () => {
    it('GET', () => {
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200);
    })
    it('GET 404', () => {
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404);
    })
    it('DELETE', () => {
      request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });
    it('Patch', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        title: 'Updated Test',
        year: 2001,
      })
      .expect(200)
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test',
        director: 'Test2',
        year: 2000,
        genres: ['Test'],
        other: 'sadjfalskj'
      })
      .expect(400);
    })
  })
});
