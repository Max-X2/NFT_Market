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

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({ nullable: true })
  description?: string

  @OneToMany(() => Discussion, child => child.category)
  discussions?: Discussion[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
