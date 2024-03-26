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
  Transaction,
  TransactionDomainFacade,
} from '@server/modules/transaction/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TransactionApplicationEvent } from './transaction.application.event'
import { TransactionCreateDto, TransactionUpdateDto } from './transaction.dto'

@Controller('/v1/transactions')
export class TransactionController {
  constructor(
    private eventService: EventService,
    private transactionDomainFacade: TransactionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.transactionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TransactionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.transactionDomainFacade.create(body)

    await this.eventService.emit<TransactionApplicationEvent.TransactionCreated.Payload>(
      TransactionApplicationEvent.TransactionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:transactionId')
  async findOne(
    @Param('transactionId') transactionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.transactionDomainFacade.findOneByIdOrFail(
      transactionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:transactionId')
  async update(
    @Param('transactionId') transactionId: string,
    @Body() body: TransactionUpdateDto,
  ) {
    const item =
      await this.transactionDomainFacade.findOneByIdOrFail(transactionId)

    const itemUpdated = await this.transactionDomainFacade.update(
      item,
      body as Partial<Transaction>,
    )
    return itemUpdated
  }

  @Delete('/:transactionId')
  async delete(@Param('transactionId') transactionId: string) {
    const item =
      await this.transactionDomainFacade.findOneByIdOrFail(transactionId)

    await this.transactionDomainFacade.delete(item)

    return item
  }
}
