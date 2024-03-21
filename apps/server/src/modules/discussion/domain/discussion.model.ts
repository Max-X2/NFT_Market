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

import { Category } from '../../category/domain'

import { PostData } from '../../postData/domain'

@Entity()
export class Discussion {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  title: string

  @Column({ nullable: true })
  content?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.discussions)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  categoryId: string

  @ManyToOne(() => Category, parent => parent.discussions)
  @JoinColumn({ name: 'categoryId' })
  category?: Category

  @OneToMany(() => PostData, child => child.discussion)
  posts?: PostData[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
