import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Vote } from './vote.model'

import { User } from '../../user/domain'

import { PostData } from '../../postData/domain'

import { Comment } from '../../comment/domain'

@Injectable()
export class VoteDomainFacade {
  constructor(
    @InjectRepository(Vote)
    private repository: Repository<Vote>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Vote>): Promise<Vote> {
    return this.repository.save(values)
  }

  async update(item: Vote, values: Partial<Vote>): Promise<Vote> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Vote): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Vote> = {},
  ): Promise<Vote[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Vote> = {},
  ): Promise<Vote> {
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

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Vote> = {},
  ): Promise<Vote[]> {
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

  async findManyByPost(
    item: PostData,
    queryOptions: RequestHelper.QueryOptions<Vote> = {},
  ): Promise<Vote[]> {
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

  async findManyByComment(
    item: Comment,
    queryOptions: RequestHelper.QueryOptions<Vote> = {},
  ): Promise<Vote[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('comment')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        commentId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
