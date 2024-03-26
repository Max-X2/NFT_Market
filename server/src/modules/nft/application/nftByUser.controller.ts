import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { NftDomainFacade } from '@server/modules/nft/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { NftApplicationEvent } from './nft.application.event'
import { NftCreateDto } from './nft.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class NftByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private nftDomainFacade: NftDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/owner/:ownerId/nfts')
  async findManyOwnerId(
    @Param('ownerId') ownerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(ownerId)

    const items = await this.nftDomainFacade.findManyByOwner(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/owner/:ownerId/nfts')
  async createByOwnerId(
    @Param('ownerId') ownerId: string,
    @Body() body: NftCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, ownerId }

    const item = await this.nftDomainFacade.create(valuesUpdated)

    await this.eventService.emit<NftApplicationEvent.NftCreated.Payload>(
      NftApplicationEvent.NftCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
