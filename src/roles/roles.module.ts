import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RolesController],
  providers: [RoleService, PrismaService],
  exports: [RoleService],
  imports: [forwardRef(() => AuthModule)],
})
export class RolesModule {}
