import { PartialType } from '@nestjs/swagger';
import { CreateCourierDto } from './create-courier.dto';

export class UpdateCourierDto extends PartialType(CreateCourierDto) {}
