import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../../user/domain'

import { PostData } from '../../postData/domain'

import { Comment } from '../../comment/domain'

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  type?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.votes)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({ nullable: true })
  postId?: string

  @ManyToOne(() => PostData, parent => parent.votes)
  @JoinColumn({ name: 'postId' })
  post?: PostData

  @Column({ nullable: true })
  commentId?: string

  @ManyToOne(() => Comment, parent => parent.votes)
  @JoinColumn({ name: 'commentId' })
  comment?: Comment

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
