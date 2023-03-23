import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app/app.controller';
import { ActorController } from './actor/actor.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController, ActorController],
  providers: [],
})
export class AppModule {}
