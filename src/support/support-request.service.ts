import { Injectable } from '@nestjs/common';
import { ISupportRequestService } from './interfaces/ISupportRequestService';
import { ID } from 'src/types/CommonTypes';
import { SendMessageDto } from './dto/SendMessageDto';
import { GetChatListParams } from './interfaces/GetChatListParams';
import { Message } from './schemas/message.schema';
import { SupportRequest } from './schemas/support-request.schema';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
    throw new Error('Method not implemented.');
  }
  sendMessage(data: SendMessageDto): Promise<Message> {
    throw new Error('Method not implemented.');
  }
  getMessages(supportRequest: ID): Promise<Message[]> {
    throw new Error('Method not implemented.');
  }
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    throw new Error('Method not implemented.');
  }
}
