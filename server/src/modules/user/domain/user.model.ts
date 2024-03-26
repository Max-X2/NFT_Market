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

import { Notification } from '../../notification/domain'

import { Discussion } from '../../discussion/domain'

import { PostData } from '../../postData/domain'

import { Comment } from '../../comment/domain'

import { Vote } from '../../vote/domain'

import { Product } from '../../product/domain'

import { Nft } from '../../nft/domain'

import { Transaction } from '../../transaction/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ select: false, nullable: true })
  password: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Discussion, child => child.user)
  discussions?: Discussion[]

  @OneToMany(() => PostData, child => child.user)
  posts?: PostData[]

  @OneToMany(() => Comment, child => child.user)
  comments?: Comment[]

  @OneToMany(() => Vote, child => child.user)
  votes?: Vote[]

  @OneToMany(() => Product, child => child.user)
  products?: Product[]

  @OneToMany(() => Nft, child => child.owner)
  nftsAsOwner?: Nft[]

  @OneToMany(() => Transaction, child => child.buyer)
  transactionsAsBuyer?: Transaction[]

  @OneToMany(() => Transaction, child => child.seller)
  transactionsAsSeller?: Transaction[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
