import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DiscussionDomainFacade } from '@server/modules/discussion/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DiscussionApplicationEvent } from './discussion.application.event'
import { DiscussionCreateDto } from './discussion.dto'

import { CategoryDomainFacade } from '../../category/domain'

@Controller('/v1/categorys')
export class DiscussionByCategoryController {
  constructor(
    private categoryDomainFacade: CategoryDomainFacade,

    private discussionDomainFacade: DiscussionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/category/:categoryId/discussions')
  async findManyCategoryId(
    @Param('categoryId') categoryId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.categoryDomainFacade.findOneByIdOrFail(categoryId)

    const items = await this.discussionDomainFacade.findManyByCategory(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/category/:categoryId/discussions')
  async createByCategoryId(
    @Param('categoryId') categoryId: string,
    @Body() body: DiscussionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, categoryId }

    const item = await this.discussionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DiscussionApplicationEvent.DiscussionCreated.Payload>(
      DiscussionApplicationEvent.DiscussionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
