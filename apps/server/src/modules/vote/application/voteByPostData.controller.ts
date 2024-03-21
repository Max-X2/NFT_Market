import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { VoteDomainFacade } from '@server/modules/vote/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { VoteApplicationEvent } from './vote.application.event'
import { VoteCreateDto } from './vote.dto'

import { PostDataDomainFacade } from '../../postData/domain'

@Controller('/v1/postDatas')
export class VoteByPostDataController {
  constructor(
    private postDataDomainFacade: PostDataDomainFacade,

    private voteDomainFacade: VoteDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/post/:postId/votes')
  async findManyPostId(
    @Param('postId') postId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.postDataDomainFacade.findOneByIdOrFail(postId)

    const items = await this.voteDomainFacade.findManyByPost(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/post/:postId/votes')
  async createByPostId(
    @Param('postId') postId: string,
    @Body() body: VoteCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, postId }

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
