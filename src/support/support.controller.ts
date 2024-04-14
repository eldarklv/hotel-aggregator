import { Controller } from '@nestjs/common';
import { SupportRequestService } from './support-request.service';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportRequestService) {}
}
