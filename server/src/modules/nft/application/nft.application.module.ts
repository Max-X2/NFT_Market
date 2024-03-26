import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { NftDomainModule } from '../domain'
import { NftController } from './nft.controller'

import { UserDomainModule } from '../../user/domain'

import { NftByUserController } from './nftByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, NftDomainModule, UserDomainModule],
  controllers: [NftController, NftByUserController],
  providers: [],
})
export class NftApplicationModule { }
