import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { VoteDomainFacade } from '@server/modules/vote/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { VoteApplicationEvent } from './vote.application.event'
import { VoteCreateDto } from './vote.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class VoteByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private voteDomainFacade: VoteDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/votes')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.voteDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/votes')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: VoteCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
