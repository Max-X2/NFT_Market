import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ProductDomainFacade } from './product.domain.facade'
import { Product } from './product.model'

@Module({
  imports: [TypeOrmModule.forFeature([Product]), DatabaseHelperModule],
  providers: [ProductDomainFacade, ProductDomainFacade],
  exports: [ProductDomainFacade],
})
export class ProductDomainModule {}
