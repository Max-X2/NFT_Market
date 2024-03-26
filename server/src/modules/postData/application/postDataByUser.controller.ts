import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { PostDataDomainFacade } from '@server/modules/postData/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { PostDataApplicationEvent } from './postData.application.event'
import { PostDataCreateDto } from './postData.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class PostDataByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private postDataDomainFacade: PostDataDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/postDatas')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.postDataDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/postDatas')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: PostDataCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.postDataDomainFacade.create(valuesUpdated)

    await this.eventService.emit<PostDataApplicationEvent.PostDataCreated.Payload>(
      PostDataApplicationEvent.PostDataCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
