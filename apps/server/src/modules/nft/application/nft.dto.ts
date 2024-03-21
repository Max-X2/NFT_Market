import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class NftCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  imageUrl?: string

  @IsNumber()
  @IsOptional()
  price?: number

  @IsString()
  @IsOptional()
  ownerId?: string

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

export class NftUpdateDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  imageUrl?: string

  @IsNumber()
  @IsOptional()
  price?: number

  @IsString()
  @IsOptional()
  ownerId?: string

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
