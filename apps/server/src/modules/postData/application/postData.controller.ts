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
import { PostData, PostDataDomainFacade } from '@server/modules/postData/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { PostDataApplicationEvent } from './postData.application.event'
import { PostDataCreateDto, PostDataUpdateDto } from './postData.dto'

@Controller('/v1/postDatas')
export class PostDataController {
  constructor(
    private eventService: EventService,
    private postDataDomainFacade: PostDataDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.postDataDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: PostDataCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.postDataDomainFacade.create(body)

    await this.eventService.emit<PostDataApplicationEvent.PostDataCreated.Payload>(
      PostDataApplicationEvent.PostDataCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:postDataId')
  async findOne(
    @Param('postDataId') postDataId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.postDataDomainFacade.findOneByIdOrFail(
      postDataId,
      queryOptions,
    )

    return item
  }

  @Patch('/:postDataId')
  async update(
    @Param('postDataId') postDataId: string,
    @Body() body: PostDataUpdateDto,
  ) {
    const item = await this.postDataDomainFacade.findOneByIdOrFail(postDataId)

    const itemUpdated = await this.postDataDomainFacade.update(
      item,
      body as Partial<PostData>,
    )
    return itemUpdated
  }

  @Delete('/:postDataId')
  async delete(@Param('postDataId') postDataId: string) {
    const item = await this.postDataDomainFacade.findOneByIdOrFail(postDataId)

    await this.postDataDomainFacade.delete(item)

    return item
  }
}
