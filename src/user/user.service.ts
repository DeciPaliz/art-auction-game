import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditMeDto } from './edit-me.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditMeDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });

    delete user.hash;
    return user;
  }

  async findUser(options: { email?: string; name?: string; id?: number }) {
    if (options.email) {
      return await this.prisma.user.findUnique({
        where: { email: options.email },
      });
    }

    if (options.name) {
      return await this.prisma.user.findFirst({
        where: { name: options.name },
      });
    }

    if (options.id) {
      return await this.prisma.user.findUnique({
        where: { id: options.id },
      });
    }
  }
}
