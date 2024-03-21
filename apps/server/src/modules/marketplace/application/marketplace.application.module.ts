import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { MarketplaceDomainModule } from '../domain'
import { MarketplaceController } from './marketplace.controller'

@Module({
  imports: [AuthenticationDomainModule, MarketplaceDomainModule],
  controllers: [MarketplaceController],
  providers: [],
})
export class MarketplaceApplicationModule {}
