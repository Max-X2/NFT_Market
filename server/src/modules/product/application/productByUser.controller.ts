import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ProductDomainFacade } from '@server/modules/product/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ProductApplicationEvent } from './product.application.event'
import { ProductCreateDto } from './product.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ProductByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private productDomainFacade: ProductDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/products')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.productDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/products')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: ProductCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
