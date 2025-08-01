import axios from "axios";
// import { PaginatedResult } from "../models/common";
import { axiosResponseBody } from "./agent";
import { User } from "../models/auth";
import { AiAssistantMessageForm } from "../typings.d";

export const aiAssistantApi = {
    message: (values: AiAssistantMessageForm) =>
        axios.post<User>(`/ai-assistant/message`, { values }).then(axiosResponseBody)
}