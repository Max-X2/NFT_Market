import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationCategorySubscriber } from './subscribers/notification.category.subscriber'

import { NotificationDiscussionSubscriber } from './subscribers/notification.discussion.subscriber'

import { NotificationPostDataSubscriber } from './subscribers/notification.postData.subscriber'

import { NotificationCommentSubscriber } from './subscribers/notification.comment.subscriber'

import { NotificationVoteSubscriber } from './subscribers/notification.vote.subscriber'

import { NotificationMarketplaceSubscriber } from './subscribers/notification.marketplace.subscriber'

import { NotificationProductSubscriber } from './subscribers/notification.product.subscriber'

import { NotificationNftSubscriber } from './subscribers/notification.nft.subscriber'

import { NotificationTransactionSubscriber } from './subscribers/notification.transaction.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationCategorySubscriber,

    NotificationDiscussionSubscriber,

    NotificationPostDataSubscriber,

    NotificationCommentSubscriber,

    NotificationVoteSubscriber,

    NotificationMarketplaceSubscriber,

    NotificationProductSubscriber,

    NotificationNftSubscriber,

    NotificationTransactionSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
