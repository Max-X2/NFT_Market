import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { CategoryApplicationModule } from './category/application'

import { DiscussionApplicationModule } from './discussion/application'

import { PostDataApplicationModule } from './postData/application'

import { CommentApplicationModule } from './comment/application'

import { VoteApplicationModule } from './vote/application'

import { MarketplaceApplicationModule } from './marketplace/application'

import { ProductApplicationModule } from './product/application'

import { NftApplicationModule } from './nft/application'

import { TransactionApplicationModule } from './transaction/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    CategoryApplicationModule,

    DiscussionApplicationModule,

    PostDataApplicationModule,

    CommentApplicationModule,

    VoteApplicationModule,

    MarketplaceApplicationModule,

    ProductApplicationModule,

    NftApplicationModule,

    TransactionApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
