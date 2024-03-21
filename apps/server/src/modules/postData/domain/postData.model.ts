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

import { Discussion } from '../../discussion/domain'

import { User } from '../../user/domain'

import { Comment } from '../../comment/domain'

import { Vote } from '../../vote/domain'

@Entity()
export class PostData {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  content?: string

  @Column({})
  discussionId: string

  @ManyToOne(() => Discussion, parent => parent.posts)
  @JoinColumn({ name: 'discussionId' })
  discussion?: Discussion

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.posts)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Comment, child => child.post)
  comments?: Comment[]

  @OneToMany(() => Vote, child => child.post)
  votes?: Vote[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
