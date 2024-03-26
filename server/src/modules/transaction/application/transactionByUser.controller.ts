import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TransactionDomainFacade } from '@server/modules/transaction/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TransactionApplicationEvent } from './transaction.application.event'
import { TransactionCreateDto } from './transaction.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class TransactionByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private transactionDomainFacade: TransactionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/buyer/:buyerId/transactions')
  async findManyBuyerId(
    @Param('buyerId') buyerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(buyerId)

    const items = await this.transactionDomainFacade.findManyByBuyer(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/buyer/:buyerId/transactions')
  async createByBuyerId(
    @Param('buyerId') buyerId: string,
    @Body() body: TransactionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, buyerId }

    const item = await this.transactionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TransactionApplicationEvent.TransactionCreated.Payload>(
      TransactionApplicationEvent.TransactionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/seller/:sellerId/transactions')
  async findManySellerId(
    @Param('sellerId') sellerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(sellerId)

    const items = await this.transactionDomainFacade.findManyBySeller(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/seller/:sellerId/transactions')
  async createBySellerId(
    @Param('sellerId') sellerId: string,
    @Body() body: TransactionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, sellerId }

    const item = await this.transactionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TransactionApplicationEvent.TransactionCreated.Payload>(
      TransactionApplicationEvent.TransactionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
