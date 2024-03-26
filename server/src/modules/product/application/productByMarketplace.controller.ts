import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ProductDomainFacade } from '@server/modules/product/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ProductApplicationEvent } from './product.application.event'
import { ProductCreateDto } from './product.dto'

import { MarketplaceDomainFacade } from '../../marketplace/domain'

@Controller('/v1/marketplaces')
export class ProductByMarketplaceController {
  constructor(
    private marketplaceDomainFacade: MarketplaceDomainFacade,

    private productDomainFacade: ProductDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/marketplace/:marketplaceId/products')
  async findManyMarketplaceId(
    @Param('marketplaceId') marketplaceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.marketplaceDomainFacade.findOneByIdOrFail(marketplaceId)

    const items = await this.productDomainFacade.findManyByMarketplace(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/marketplace/:marketplaceId/products')
  async createByMarketplaceId(
    @Param('marketplaceId') marketplaceId: string,
    @Body() body: ProductCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, marketplaceId }

    const item = await this.productDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ProductApplicationEvent.ProductCreated.Payload>(
      ProductApplicationEvent.ProductCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
