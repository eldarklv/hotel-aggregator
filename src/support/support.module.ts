import { Module } from '@nestjs/common';
import { SupportRequestService } from './support-request.service';
import { SupportController } from './support.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import {
  SupportRequest,
  SupportRequestSchema,
} from './schemas/support-request.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [SupportController],
  providers: [SupportRequestService, RolesGuard],
})
export class SupportModule {}
