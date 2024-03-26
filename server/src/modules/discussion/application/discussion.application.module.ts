import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DiscussionDomainModule } from '../domain'
import { DiscussionController } from './discussion.controller'

import { UserDomainModule } from '../../user/domain'

import { DiscussionByUserController } from './discussionByUser.controller'

import { CategoryDomainModule } from '../../category/domain'

import { DiscussionByCategoryController } from './discussionByCategory.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DiscussionDomainModule,

    UserDomainModule,

    CategoryDomainModule,
  ],
  controllers: [
    DiscussionController,

    DiscussionByUserController,

    DiscussionByCategoryController,
  ],
  providers: [],
})
export class DiscussionApplicationModule { }
