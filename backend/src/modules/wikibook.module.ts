import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/schemas/book.schema';
import { WikibooksService } from 'src/wikibooks/wikibooks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [WikibooksService],
  exports: [WikibooksService],
})
export class WikiBooksModule {}