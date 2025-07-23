import { MuslimWikiSession } from "src/models/auth";


export class SessionUserDto implements MuslimWikiSession {
    userInfo: {
        _id: string;
        email: string;
        firstName: string;
        profilePicture: string;
        countryOfOrigin: string;
    };
    jwt: string;
    constructor(session: MuslimWikiSession) {
        this.userInfo = session.userInfo;
        this.jwt = session.jwt;
    }
}