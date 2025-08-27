import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonService } from 'src/common/common.service';
import { CouncilMember, CouncilMemberSchema } from 'src/schemas/councilmember.schema';

@Module({
imports: [
    MongooseModule.forFeature([
      { name: CouncilMember.name, schema: CouncilMemberSchema }
    ]),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}