import { ApiPropertyOptional } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export interface ICommon {
  createdBy?: string | null;
  createdAt?: string;
  updatedBy?: string | null;
  updatedAt?: string;
}

export class CommonDto {
  @ApiPropertyOptional()
  createdBy?: string | null;

  @ApiPropertyOptional()
  createdAt?: string;

  @ApiPropertyOptional()
  updatedBy?: string | null;

  @ApiPropertyOptional()
  updatedAt?: string;
}

export const checkValidDate = (date: string, fromDateProp: string, toDateProp: string): boolean => {
  const comparedDate = new Date(dayjs(date, 'DD/MM/YYYY').toString()).getTime();
  const fromDate = new Date(dayjs(fromDateProp, 'DD/MM/YYYY').toString()).getTime();
  const toDate = new Date(dayjs(toDateProp, 'DD/MM/YYYY').toString()).getTime();
  if (comparedDate >= fromDate && comparedDate <= toDate) {
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
