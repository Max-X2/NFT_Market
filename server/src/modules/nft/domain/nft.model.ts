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

import { Transaction } from '../../transaction/domain'

@Entity()
export class Nft {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  title: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  imageUrl?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  price?: number

  @Column({})
  ownerId: string

  @ManyToOne(() => User, parent => parent.nftsAsOwner)
  @JoinColumn({ name: 'ownerId' })
  owner?: User

  @OneToMany(() => Transaction, child => child.nft)
  transactions?: Transaction[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
