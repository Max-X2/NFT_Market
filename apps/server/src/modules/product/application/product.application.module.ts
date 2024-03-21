import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ProductDomainModule } from '../domain'
import { ProductController } from './product.controller'

import { UserDomainModule } from '../../user/domain'

import { ProductByUserController } from './productByUser.controller'

import { MarketplaceDomainModule } from '../../marketplace/domain'

import { ProductByMarketplaceController } from './productByMarketplace.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ProductDomainModule,

    UserDomainModule,

    MarketplaceDomainModule,
  ],
  controllers: [
    ProductController,

    ProductByUserController,

    ProductByMarketplaceController,
  ],
  providers: [],
})
export class ProductApplicationModule { }
