import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/schemas/book.schema';
import { DeleteBookRequest, DeleteBookRequestSchema } from 'src/schemas/deletebookrequest.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { WikibookRequestsService } from 'src/wikibookrequests/wikibookrequests.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
      { name: DeleteBookRequest.name, schema: DeleteBookRequestSchema }
    ]),
  ],
  providers: [WikibookRequestsService],
  exports: [WikibookRequestsService],
})

export class WikiBookRequestsModule {}