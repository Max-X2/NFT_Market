import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TransactionDomainFacade } from '@server/modules/transaction/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TransactionApplicationEvent } from './transaction.application.event'
import { TransactionCreateDto } from './transaction.dto'

import { NftDomainFacade } from '../../nft/domain'

@Controller('/v1/nfts')
export class TransactionByNftController {
  constructor(
    private nftDomainFacade: NftDomainFacade,

    private transactionDomainFacade: TransactionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/nft/:nftId/transactions')
  async findManyNftId(@Param('nftId') nftId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.nftDomainFacade.findOneByIdOrFail(nftId)

    const items = await this.transactionDomainFacade.findManyByNft(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/nft/:nftId/transactions')
  async createByNftId(
    @Param('nftId') nftId: string,
    @Body() body: TransactionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, nftId }

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
