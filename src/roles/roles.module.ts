import { Module } from '@nestjs/common';
import { RoleService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RolesController],
  providers: [RoleService, PrismaService],
  exports: [RoleService],
})
export class RolesModule {}
