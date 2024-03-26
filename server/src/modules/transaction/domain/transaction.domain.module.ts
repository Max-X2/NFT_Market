import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TransactionDomainFacade } from './transaction.domain.facade'
import { Transaction } from './transaction.model'

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), DatabaseHelperModule],
  providers: [TransactionDomainFacade, TransactionDomainFacade],
  exports: [TransactionDomainFacade],
})
export class TransactionDomainModule {}
