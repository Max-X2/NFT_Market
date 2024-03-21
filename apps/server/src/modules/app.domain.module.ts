import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { CategoryDomainModule } from './category/domain'

import { DiscussionDomainModule } from './discussion/domain'

import { PostDataDomainModule } from './postData/domain'

import { CommentDomainModule } from './comment/domain'

import { VoteDomainModule } from './vote/domain'

import { MarketplaceDomainModule } from './marketplace/domain'

import { ProductDomainModule } from './product/domain'

import { NftDomainModule } from './nft/domain'

import { TransactionDomainModule } from './transaction/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    CategoryDomainModule,

    DiscussionDomainModule,

    PostDataDomainModule,

    CommentDomainModule,

    VoteDomainModule,

    MarketplaceDomainModule,

    ProductDomainModule,

    NftDomainModule,

    TransactionDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
