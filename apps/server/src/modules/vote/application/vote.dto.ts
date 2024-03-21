import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class VoteCreateDto {
  @IsString()
  @IsOptional()
  type?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  postId?: string

  @IsString()
  @IsOptional()
  commentId?: string

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

export class VoteUpdateDto {
  @IsString()
  @IsOptional()
  type?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  postId?: string

  @IsString()
  @IsOptional()
  commentId?: string

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
