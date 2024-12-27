import { Module } from '@nestjs/common';
import { SchoolClassService } from './schoolClass.service';
import { SchoolClassController } from './schoolClass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './schoolClass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolClass])],
  controllers: [SchoolClassController],
  providers: [SchoolClassService],
})
export class ClassModule {}
