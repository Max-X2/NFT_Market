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

import { Nft } from '../../nft/domain'

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  price?: number

  @Column({})
  buyerId: string

  @ManyToOne(() => User, parent => parent.transactionsAsBuyer)
  @JoinColumn({ name: 'buyerId' })
  buyer?: User

  @Column({})
  sellerId: string

  @ManyToOne(() => User, parent => parent.transactionsAsSeller)
  @JoinColumn({ name: 'sellerId' })
  seller?: User

  @Column({})
  nftId: string

  @ManyToOne(() => Nft, parent => parent.transactions)
  @JoinColumn({ name: 'nftId' })
  nft?: Nft

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
