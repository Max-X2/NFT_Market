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
import { Product, ProductDomainFacade } from '@server/modules/product/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ProductApplicationEvent } from './product.application.event'
import { ProductCreateDto, ProductUpdateDto } from './product.dto'

@Controller('/v1/products')
export class ProductController {
  constructor(
    private eventService: EventService,
    private productDomainFacade: ProductDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.productDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ProductCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.productDomainFacade.create(body)

    await this.eventService.emit<ProductApplicationEvent.ProductCreated.Payload>(
      ProductApplicationEvent.ProductCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:productId')
  async findOne(
    @Param('productId') productId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.productDomainFacade.findOneByIdOrFail(
      productId,
      queryOptions,
    )

    return item
  }

  @Patch('/:productId')
  async update(
    @Param('productId') productId: string,
    @Body() body: ProductUpdateDto,
  ) {
    const item = await this.productDomainFacade.findOneByIdOrFail(productId)

    const itemUpdated = await this.productDomainFacade.update(
      item,
      body as Partial<Product>,
    )
    return itemUpdated
  }

  @Delete('/:productId')
  async delete(@Param('productId') productId: string) {
    const item = await this.productDomainFacade.findOneByIdOrFail(productId)

    await this.productDomainFacade.delete(item)

    return item
  }
}
