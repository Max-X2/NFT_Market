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
import { Vote, VoteDomainFacade } from '@server/modules/vote/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { VoteApplicationEvent } from './vote.application.event'
import { VoteCreateDto, VoteUpdateDto } from './vote.dto'

@Controller('/v1/votes')
export class VoteController {
  constructor(
    private eventService: EventService,
    private voteDomainFacade: VoteDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.voteDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: VoteCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.voteDomainFacade.create(body)

    await this.eventService.emit<VoteApplicationEvent.VoteCreated.Payload>(
      VoteApplicationEvent.VoteCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:voteId')
  async findOne(@Param('voteId') voteId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.voteDomainFacade.findOneByIdOrFail(
      voteId,
      queryOptions,
    )

    return item
  }

  @Patch('/:voteId')
  async update(@Param('voteId') voteId: string, @Body() body: VoteUpdateDto) {
    const item = await this.voteDomainFacade.findOneByIdOrFail(voteId)

    const itemUpdated = await this.voteDomainFacade.update(
      item,
      body as Partial<Vote>,
    )
    return itemUpdated
  }

  @Delete('/:voteId')
  async delete(@Param('voteId') voteId: string) {
    const item = await this.voteDomainFacade.findOneByIdOrFail(voteId)

    await this.voteDomainFacade.delete(item)

    return item
  }
}
