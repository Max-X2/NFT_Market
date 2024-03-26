import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CommentCreateDto {
  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  postId?: string

  @IsString()
  @IsOptional()
  userId?: string

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

export class CommentUpdateDto {
  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  postId?: string

  @IsString()
  @IsOptional()
  userId?: string

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
