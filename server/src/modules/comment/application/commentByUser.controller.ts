import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CommentDomainFacade } from '@server/modules/comment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CommentApplicationEvent } from './comment.application.event'
import { CommentCreateDto } from './comment.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class CommentByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private commentDomainFacade: CommentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/comments')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.commentDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/comments')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: CommentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
