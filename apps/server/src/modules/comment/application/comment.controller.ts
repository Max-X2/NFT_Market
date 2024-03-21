import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Comment, CommentDomainFacade } from '@server/modules/comment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CommentApplicationEvent } from './comment.application.event'
import { CommentCreateDto, CommentUpdateDto } from './comment.dto'

@Controller('/v1/comments')
export class CommentController {
  constructor(
    private eventService: EventService,
    private commentDomainFacade: CommentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.commentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CommentCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.commentDomainFacade.create(body)

    await this.eventService.emit<CommentApplicationEvent.CommentCreated.Payload>(
      CommentApplicationEvent.CommentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:commentId')
  async findOne(
    @Param('commentId') commentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.commentDomainFacade.findOneByIdOrFail(
      commentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:commentId')
  async update(
    @Param('commentId') commentId: string,
    @Body() body: CommentUpdateDto,
  ) {
    const item = await this.commentDomainFacade.findOneByIdOrFail(commentId)

    const itemUpdated = await this.commentDomainFacade.update(
      item,
      body as Partial<Comment>,
    )
    return itemUpdated
  }

  @Delete('/:commentId')
  async delete(@Param('commentId') commentId: string) {
    const item = await this.commentDomainFacade.findOneByIdOrFail(commentId)

    await this.commentDomainFacade.delete(item)

    return item
  }
}
