import { CreateDeleteWikiBookRequest } from "src/models/book";


export class CreateDeleteBookRequestDto implements CreateDeleteWikiBookRequest {
    bookId: string;
    reasonToDelete: string;
}