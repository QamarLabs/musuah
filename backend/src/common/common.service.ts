// common.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CouncilMember } from 'src/schemas/councilmember.schema';

@Injectable()
export class CommonService {
    constructor(@InjectModel(CouncilMember.name) private councilMemberModel: Model<CouncilMember>) {}
  
    async checkShura(userEmail: string) {
        const cM = await this.councilMemberModel.findOne({ email: userEmail }).exec();

        console.log('chekcshura:', cM);
        if(cM)
            return true;
        else
            return false;
    }

}