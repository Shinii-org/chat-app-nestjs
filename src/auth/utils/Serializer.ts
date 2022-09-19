import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { IUserService } from 'src/users/user';
import { User } from 'src/utils/typeorm';
import { Services } from '../../utils/constants';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USER)
    private readonly userService: IUserService,
  ) {
    super();
  }
  serializeUser(user: User, done: Function) {
    done(null, user);
  }
  async deserializeUser(user: User, done: Function) {
    const userDb = await this.userService.findUser({ id: user.id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
