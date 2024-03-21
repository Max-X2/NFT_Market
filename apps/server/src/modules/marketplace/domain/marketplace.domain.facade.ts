import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Marketplace } from './marketplace.model'

@Injectable()
export class MarketplaceDomainFacade {
  constructor(
    @InjectRepository(Marketplace)
    private repository: Repository<Marketplace>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Marketplace>): Promise<Marketplace> {
    return this.repository.save(values)
  }

  async update(
    item: Marketplace,
    values: Partial<Marketplace>,
  ): Promise<Marketplace> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Marketplace): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Marketplace> = {},
  ): Promise<Marketplace[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Marketplace> = {},
  ): Promise<Marketplace> {
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
}
