import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { VoteDomainModule } from '../domain'
import { VoteController } from './vote.controller'

import { UserDomainModule } from '../../user/domain'

import { VoteByUserController } from './voteByUser.controller'

import { PostDataDomainModule } from '../../postData/domain'

import { VoteByPostDataController } from './voteByPostData.controller'

import { CommentDomainModule } from '../../comment/domain'

import { VoteByCommentController } from './voteByComment.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    VoteDomainModule,

    UserDomainModule,

    PostDataDomainModule,

    CommentDomainModule,
  ],
  controllers: [
    VoteController,

    VoteByUserController,

    VoteByPostDataController,

    VoteByCommentController,
  ],
  providers: [],
})
export class VoteApplicationModule { }
