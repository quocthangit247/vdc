import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationException extends HttpException {
  private constructor(
    response: string | Record<string, any> = '',
    status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY,
  ) {
    super(response, status);
  }

  static EntityNotFound(id?: string): ApplicationException {
    return new ApplicationException(`Entity Not Found: ${id || ''}`, HttpStatus.BAD_REQUEST);
  }
}
