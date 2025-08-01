import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchBooksService } from 'src/searchBooks/searchBooks.service';
import { Book, BookSchema } from 'src/schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [SearchBooksService],
  exports: [SearchBooksService],
})
export class SearchBooksModule {}