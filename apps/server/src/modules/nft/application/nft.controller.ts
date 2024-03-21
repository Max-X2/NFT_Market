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
import { Nft, NftDomainFacade } from '@server/modules/nft/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { NftApplicationEvent } from './nft.application.event'
import { NftCreateDto, NftUpdateDto } from './nft.dto'

@Controller('/v1/nfts')
export class NftController {
  constructor(
    private eventService: EventService,
    private nftDomainFacade: NftDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.nftDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: NftCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.nftDomainFacade.create(body)

    await this.eventService.emit<NftApplicationEvent.NftCreated.Payload>(
      NftApplicationEvent.NftCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:nftId')
  async findOne(@Param('nftId') nftId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.nftDomainFacade.findOneByIdOrFail(
      nftId,
      queryOptions,
    )

    return item
  }

  @Patch('/:nftId')
  async update(@Param('nftId') nftId: string, @Body() body: NftUpdateDto) {
    const item = await this.nftDomainFacade.findOneByIdOrFail(nftId)

    const itemUpdated = await this.nftDomainFacade.update(
      item,
      body as Partial<Nft>,
    )
    return itemUpdated
  }

  @Delete('/:nftId')
  async delete(@Param('nftId') nftId: string) {
    const item = await this.nftDomainFacade.findOneByIdOrFail(nftId)

    await this.nftDomainFacade.delete(item)

    return item
  }
}
