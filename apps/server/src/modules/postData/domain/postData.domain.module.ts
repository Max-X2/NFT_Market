import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { PostDataDomainFacade } from './postData.domain.facade'
import { PostData } from './postData.model'

@Module({
  imports: [TypeOrmModule.forFeature([PostData]), DatabaseHelperModule],
  providers: [PostDataDomainFacade, PostDataDomainFacade],
  exports: [PostDataDomainFacade],
})
export class PostDataDomainModule {}
