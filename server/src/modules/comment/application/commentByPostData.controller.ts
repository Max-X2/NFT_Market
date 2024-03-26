import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CommentDomainFacade } from '@server/modules/comment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CommentApplicationEvent } from './comment.application.event'
import { CommentCreateDto } from './comment.dto'

import { PostDataDomainFacade } from '../../postData/domain'

@Controller('/v1/postDatas')
export class CommentByPostDataController {
  constructor(
    private postDataDomainFacade: PostDataDomainFacade,

    private commentDomainFacade: CommentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/post/:postId/comments')
  async findManyPostId(
    @Param('postId') postId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.postDataDomainFacade.findOneByIdOrFail(postId)

    const items = await this.commentDomainFacade.findManyByPost(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/post/:postId/comments')
  async createByPostId(
    @Param('postId') postId: string,
    @Body() body: CommentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, postId }

    const item = await this.commentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CommentApplicationEvent.CommentCreated.Payload>(
      CommentApplicationEvent.CommentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
