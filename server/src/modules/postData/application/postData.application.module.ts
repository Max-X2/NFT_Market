import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { PostDataDomainModule } from '../domain'
import { PostDataController } from './postData.controller'

import { DiscussionDomainModule } from '../../discussion/domain'

import { PostDataByDiscussionController } from './postDataByDiscussion.controller'

import { UserDomainModule } from '../../user/domain'

import { PostDataByUserController } from './postDataByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    PostDataDomainModule,

    DiscussionDomainModule,

    UserDomainModule,
  ],
  controllers: [
    PostDataController,

    PostDataByDiscussionController,

    PostDataByUserController,
  ],
  providers: [],
})
export class PostDataApplicationModule { }
