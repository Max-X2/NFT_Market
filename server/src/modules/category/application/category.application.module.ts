import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CategoryDomainModule } from '../domain'
import { CategoryController } from './category.controller'

@Module({
  imports: [AuthenticationDomainModule, CategoryDomainModule],
  controllers: [CategoryController],
  providers: [],
})
export class CategoryApplicationModule {}
