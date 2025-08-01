import { UploadProfilePicture } from "src/models/auth";


export class UploadProfilePictureDto implements UploadProfilePicture {
    profilePicture: string;
}
