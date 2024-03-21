import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Comment } from './comment.model'

import { PostData } from '../../postData/domain'

import { User } from '../../user/domain'

@Injectable()
export class CommentDomainFacade {
  constructor(
    @InjectRepository(Comment)
    private repository: Repository<Comment>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Comment>): Promise<Comment> {
    return this.repository.save(values)
  }

  async update(item: Comment, values: Partial<Comment>): Promise<Comment> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Comment): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Comment> = {},
  ): Promise<Comment[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Comment> = {},
  ): Promise<Comment> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByPost(
    item: PostData,
    queryOptions: RequestHelper.QueryOptions<Comment> = {},
  ): Promise<Comment[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('post')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        postId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Comment> = {},
  ): Promise<Comment[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
