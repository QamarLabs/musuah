import { MuslimWikiSession, SessionUser } from "src/models/auth";


export class SessionUserDto implements MuslimWikiSession {
    userInfo: SessionUser;
    jwt: string;
    constructor(session: MuslimWikiSession) {
        this.userInfo = session.userInfo;
        this.jwt = session.jwt;
    }
}