import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CategoryDomainFacade } from './category.domain.facade'
import { Category } from './category.model'

@Module({
  imports: [TypeOrmModule.forFeature([Category]), DatabaseHelperModule],
  providers: [CategoryDomainFacade, CategoryDomainFacade],
  exports: [CategoryDomainFacade],
})
export class CategoryDomainModule {}
