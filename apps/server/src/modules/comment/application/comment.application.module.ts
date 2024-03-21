import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CommentDomainModule } from '../domain'
import { CommentController } from './comment.controller'

import { PostDataDomainModule } from '../../postData/domain'

import { CommentByPostDataController } from './commentByPostData.controller'

import { UserDomainModule } from '../../user/domain'

import { CommentByUserController } from './commentByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CommentDomainModule,

    PostDataDomainModule,

    UserDomainModule,
  ],
  controllers: [
    CommentController,

    CommentByPostDataController,

    CommentByUserController,
  ],
  providers: [],
})
export class CommentApplicationModule { }
