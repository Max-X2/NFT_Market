import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CommentDomainFacade } from './comment.domain.facade'
import { Comment } from './comment.model'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), DatabaseHelperModule],
  providers: [CommentDomainFacade, CommentDomainFacade],
  exports: [CommentDomainFacade],
})
export class CommentDomainModule {}
