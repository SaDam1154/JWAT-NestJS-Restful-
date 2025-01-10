import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SchoolClassService } from './schoolClass.service';
import { SchoolClass } from './schoolClass.entity';
import { CreateSchoolClassDto } from './dto/create-schoolClass.dto';
import { UpdateSchoolClassDto } from './dto/update-schoolClass.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/decorators/roles.decorator';

@Resolver(() => SchoolClass)
@UseGuards(RolesGuard)
export class SchoolClassResolver {
  constructor(private readonly schoolClassService: SchoolClassService) {}

  @Query(() => [SchoolClass])
  @Roles('admin', 'principal', 'teacher')
  async getAllSchoolClasses(): Promise<SchoolClass[]> {
    return this.schoolClassService.readAll();
  }

  @Query(() => SchoolClass)
  @Roles('admin', 'principal', 'teacher')
  async getSchoolClassById(@Args('id') id: string): Promise<SchoolClass> {
    return this.schoolClassService.readById(id);
  }

  @Mutation(() => SchoolClass)
  @Roles('admin', 'teacher')
  async createSchoolClass(
    @Args('input') input: CreateSchoolClassDto,
  ): Promise<SchoolClass> {
    return this.schoolClassService.create(input);
  }

  @Mutation(() => SchoolClass)
  @Roles('admin', 'teacher')
  async updateSchoolClass(
    @Args('id') id: string,
    @Args('input') input: UpdateSchoolClassDto,
  ): Promise<SchoolClass> {
    return this.schoolClassService.update(id, input);
  }

  @Mutation(() => Boolean)
  @Roles('admin', 'teacher')
  async deleteSchoolClass(@Args('id') id: string): Promise<boolean> {
    await this.schoolClassService.delete(id);
    return true;
  }
}
