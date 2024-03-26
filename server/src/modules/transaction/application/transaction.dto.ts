import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class TransactionCreateDto {
  @IsNumber()
  @IsOptional()
  price?: number

  @IsString()
  @IsOptional()
  buyerId?: string

  @IsString()
  @IsOptional()
  sellerId?: string

  @IsString()
  @IsOptional()
  nftId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class TransactionUpdateDto {
  @IsNumber()
  @IsOptional()
  price?: number

  @IsString()
  @IsOptional()
  buyerId?: string

  @IsString()
  @IsOptional()
  sellerId?: string

  @IsString()
  @IsOptional()
  nftId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
