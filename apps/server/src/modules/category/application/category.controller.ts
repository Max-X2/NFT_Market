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
import { Category, CategoryDomainFacade } from '@server/modules/category/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CategoryApplicationEvent } from './category.application.event'
import { CategoryCreateDto, CategoryUpdateDto } from './category.dto'

@Controller('/v1/categorys')
export class CategoryController {
  constructor(
    private eventService: EventService,
    private categoryDomainFacade: CategoryDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.categoryDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CategoryCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.categoryDomainFacade.create(body)

    await this.eventService.emit<CategoryApplicationEvent.CategoryCreated.Payload>(
      CategoryApplicationEvent.CategoryCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:categoryId')
  async findOne(
    @Param('categoryId') categoryId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.categoryDomainFacade.findOneByIdOrFail(
      categoryId,
      queryOptions,
    )

    return item
  }

  @Patch('/:categoryId')
  async update(
    @Param('categoryId') categoryId: string,
    @Body() body: CategoryUpdateDto,
  ) {
    const item = await this.categoryDomainFacade.findOneByIdOrFail(categoryId)

    const itemUpdated = await this.categoryDomainFacade.update(
      item,
      body as Partial<Category>,
    )
    return itemUpdated
  }

  @Delete('/:categoryId')
  async delete(@Param('categoryId') categoryId: string) {
    const item = await this.categoryDomainFacade.findOneByIdOrFail(categoryId)

    await this.categoryDomainFacade.delete(item)

    return item
  }
}
