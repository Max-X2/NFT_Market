import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PostDataDomainFacade } from '@server/modules/postData/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PostDataApplicationEvent } from './postData.application.event'
import { PostDataCreateDto } from './postData.dto'

import { DiscussionDomainFacade } from '../../discussion/domain'

@Controller('/v1/discussions')
export class PostDataByDiscussionController {
  constructor(
    private discussionDomainFacade: DiscussionDomainFacade,

    private postDataDomainFacade: PostDataDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/discussion/:discussionId/postDatas')
  async findManyDiscussionId(
    @Param('discussionId') discussionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.discussionDomainFacade.findOneByIdOrFail(discussionId)

    const items = await this.postDataDomainFacade.findManyByDiscussion(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/discussion/:discussionId/postDatas')
  async createByDiscussionId(
    @Param('discussionId') discussionId: string,
    @Body() body: PostDataCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, discussionId }

    const item = await this.postDataDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PostDataApplicationEvent.PostDataCreated.Payload>(
      PostDataApplicationEvent.PostDataCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
