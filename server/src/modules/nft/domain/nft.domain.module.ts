import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { NftDomainFacade } from './nft.domain.facade'
import { Nft } from './nft.model'

@Module({
  imports: [TypeOrmModule.forFeature([Nft]), DatabaseHelperModule],
  providers: [NftDomainFacade, NftDomainFacade],
  exports: [NftDomainFacade],
})
export class NftDomainModule {}
