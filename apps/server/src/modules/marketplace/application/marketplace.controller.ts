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
import {
  Marketplace,
  MarketplaceDomainFacade,
} from '@server/modules/marketplace/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { MarketplaceApplicationEvent } from './marketplace.application.event'
import { MarketplaceCreateDto, MarketplaceUpdateDto } from './marketplace.dto'

@Controller('/v1/marketplaces')
export class MarketplaceController {
  constructor(
    private eventService: EventService,
    private marketplaceDomainFacade: MarketplaceDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.marketplaceDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: MarketplaceCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.marketplaceDomainFacade.create(body)

    await this.eventService.emit<MarketplaceApplicationEvent.MarketplaceCreated.Payload>(
      MarketplaceApplicationEvent.MarketplaceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:marketplaceId')
  async findOne(
    @Param('marketplaceId') marketplaceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.marketplaceDomainFacade.findOneByIdOrFail(
      marketplaceId,
      queryOptions,
    )

    return item
  }

  @Patch('/:marketplaceId')
  async update(
    @Param('marketplaceId') marketplaceId: string,
    @Body() body: MarketplaceUpdateDto,
  ) {
    const item =
      await this.marketplaceDomainFacade.findOneByIdOrFail(marketplaceId)

    const itemUpdated = await this.marketplaceDomainFacade.update(
      item,
      body as Partial<Marketplace>,
    )
    return itemUpdated
  }

  @Delete('/:marketplaceId')
  async delete(@Param('marketplaceId') marketplaceId: string) {
    const item =
      await this.marketplaceDomainFacade.findOneByIdOrFail(marketplaceId)

    await this.marketplaceDomainFacade.delete(item)

    return item
  }
}
