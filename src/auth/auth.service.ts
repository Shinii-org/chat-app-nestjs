import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUserService } from 'src/users/user';

import { Services } from 'src/utils/constants';
import { compareHash } from 'src/utils/helpers';
import { ValidateUserDetails } from 'src/utils/types';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USER) private readonly userService: IUserService,
  ) {}
  async validateUser(credentials: ValidateUserDetails) {
    const user = await this.userService.findUser({ email: credentials.email });
    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    return compareHash(credentials.password, user.password);
  }
}
