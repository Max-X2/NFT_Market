import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { VoteDomainFacade } from './vote.domain.facade'
import { Vote } from './vote.model'

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), DatabaseHelperModule],
  providers: [VoteDomainFacade, VoteDomainFacade],
  exports: [VoteDomainFacade],
})
export class VoteDomainModule {}
