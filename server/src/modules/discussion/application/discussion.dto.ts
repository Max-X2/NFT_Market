import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class DiscussionCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  categoryId?: string

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

export class DiscussionUpdateDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  categoryId?: string

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
