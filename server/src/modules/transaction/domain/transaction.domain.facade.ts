import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Transaction } from './transaction.model'

import { User } from '../../user/domain'

import { Nft } from '../../nft/domain'

@Injectable()
export class TransactionDomainFacade {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Transaction>): Promise<Transaction> {
    return this.repository.save(values)
  }

  async update(
    item: Transaction,
    values: Partial<Transaction>,
  ): Promise<Transaction> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Transaction): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Transaction> = {},
  ): Promise<Transaction[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Transaction> = {},
  ): Promise<Transaction> {
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

  async findManyByBuyer(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Transaction> = {},
  ): Promise<Transaction[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('buyer')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        buyerId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyBySeller(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Transaction> = {},
  ): Promise<Transaction[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('seller')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        sellerId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByNft(
    item: Nft,
    queryOptions: RequestHelper.QueryOptions<Transaction> = {},
  ): Promise<Transaction[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('nft')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        nftId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
