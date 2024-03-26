import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TransactionDomainModule } from '../domain'
import { TransactionController } from './transaction.controller'

import { UserDomainModule } from '../../user/domain'

import { TransactionByUserController } from './transactionByUser.controller'

import { NftDomainModule } from '../../nft/domain'

import { TransactionByNftController } from './transactionByNft.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TransactionDomainModule,

    UserDomainModule,

    NftDomainModule,
  ],
  controllers: [
    TransactionController,

    TransactionByUserController,

    TransactionByNftController,
  ],
  providers: [],
})
export class TransactionApplicationModule { }
