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

import { Marketplace } from '../../marketplace/domain'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({ nullable: true })
  description?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  price?: number

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.products)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  marketplaceId: string

  @ManyToOne(() => Marketplace, parent => parent.products)
  @JoinColumn({ name: 'marketplaceId' })
  marketplace?: Marketplace

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
