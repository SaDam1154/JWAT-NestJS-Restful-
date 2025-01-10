import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { SchoolClassModule } from './school-class/schoolClass.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { GraphqlModule } from './graphql.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StudentModule,
    SchoolClassModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
