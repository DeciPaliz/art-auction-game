import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/jwt-guard.service';
import { GetUser } from 'src/decorator/get-user';
import { User } from '@prisma/client';
import { EditMeDto } from './edit-me.dto';

@UseGuards(JwtGuard)
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    delete user.hash;
    return user;
  }

  @Patch('me')
  editMe(@GetUser('id') userId: number, @Body() dto: EditMeDto) {
    return this.userService.editUser(userId, dto);
  }
}
