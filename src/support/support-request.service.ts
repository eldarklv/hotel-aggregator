import { Injectable } from '@nestjs/common';
import { ISupportRequestService } from './interfaces/ISupportRequestService';
import { ID } from 'src/types/CommonTypes';
import { SendMessageDto } from './dto/SendMessageDto';
import { GetChatListParams } from './interfaces/GetChatListParams';
import { Message } from './schemas/message.schema';
import { SupportRequest } from './schemas/support-request.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getMskDate } from 'src/helpers/dateHelper';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SupportRequestService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private supportRequest: Model<SupportRequest>,

    @InjectModel(Message.name)
    private message: Model<Message>,

    private eventEmitter: EventEmitter2,
  ) {}

  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
    const { user, isActive } = params;

    const supportRequests = this.supportRequest.find({
      user,
      isActive,
    });

    return supportRequests;
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const messageData = {
      author: data.author,
      supportRequest: data.supportRequest,
      text: data.text,
      sentAt: getMskDate(),
    };
    const message = await this.message.create(messageData);

    const supportRequest = await this.supportRequest
      .updateOne(
        { _id: data.supportRequest },
        { $push: { messages: message._id } },
      )
      .exec();

    this.eventEmitter.emit('message', {
      supportRequest: supportRequest,
      message: message,
    });

    return message;
  }

  async getMessages(supportRequestID: ID): Promise<Message[]> {
    const supportRequestMessages = await this.supportRequest
      .findById(supportRequestID)
      .lean();

    return supportRequestMessages.messages;
  }

  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    this.eventEmitter.on('message', handler);
    return;
  }
}
