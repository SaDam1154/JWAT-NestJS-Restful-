import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './schoolClass.entity';
import { SchoolClassService } from './schoolClass.service';
import { SchoolClassResolver } from './schoolClass.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolClass])],
  providers: [SchoolClassService, SchoolClassResolver],
})
export class SchoolClassModule {}
