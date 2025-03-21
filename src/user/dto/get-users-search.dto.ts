import { ApiProperty } from '@nestjs/swagger';
import { PagerbleDto } from './pagerble.dto';
import { IsString, Length } from 'class-validator';

export class GetUserSearchDto extends PagerbleDto {
  @ApiProperty({
    description: '검색키워드',
  })
  @IsString()
  @Length(2, 100, { message: '검색 글자수 제한 2자-100자' })
  search: string;
}
