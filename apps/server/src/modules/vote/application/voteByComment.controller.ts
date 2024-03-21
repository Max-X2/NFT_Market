import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { VoteDomainFacade } from '@server/modules/vote/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { VoteApplicationEvent } from './vote.application.event'
import { VoteCreateDto } from './vote.dto'

import { CommentDomainFacade } from '../../comment/domain'

@Controller('/v1/comments')
export class VoteByCommentController {
  constructor(
    private commentDomainFacade: CommentDomainFacade,

    private voteDomainFacade: VoteDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/comment/:commentId/votes')
  async findManyCommentId(
    @Param('commentId') commentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.commentDomainFacade.findOneByIdOrFail(commentId)

    const items = await this.voteDomainFacade.findManyByComment(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/comment/:commentId/votes')
  async createByCommentId(
    @Param('commentId') commentId: string,
    @Body() body: VoteCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, commentId }

    const item = await this.voteDomainFacade.create(valuesUpdated)

    await this.eventService.emit<VoteApplicationEvent.VoteCreated.Payload>(
      VoteApplicationEvent.VoteCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
