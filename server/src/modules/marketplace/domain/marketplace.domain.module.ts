import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { MarketplaceDomainFacade } from './marketplace.domain.facade'
import { Marketplace } from './marketplace.model'

@Module({
  imports: [TypeOrmModule.forFeature([Marketplace]), DatabaseHelperModule],
  providers: [MarketplaceDomainFacade, MarketplaceDomainFacade],
  exports: [MarketplaceDomainFacade],
})
export class MarketplaceDomainModule {}
