import { IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class UserDto {
  @IsString()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @MinLength(2, { message: 'Name must contain at least 2 characters' })
  name: string;
}
