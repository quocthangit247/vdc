import { ApiPropertyOptional } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export interface ICommon {
  createdAt?: string;
  updatedAt?: string;
}

export class CommonDto {
  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedAt?: string;
}

export const checkEqualDate = (date1: string, date2: string): boolean => {
  const comparedDate1 = date1.slice(0, 10);
  const comparedDate2 = date2.slice(0, 10);
  if (comparedDate1 === comparedDate2) {
    return true;
  }
  return false;
};

export const removeUndefined = (obj: Record<string, unknown>) => JSON.parse(JSON.stringify(obj));

export const getBooleanString = (value: string) => {
  switch (value) {
    case 'false':
      return false;
    case 'true':
      return true;
  }
};
