import { Poll } from "../../../domain/entities/poll.type";
import { PollDocument } from "../../../infrastructure/database/model/poll.interface";


export class PollMapper {
    static toResponseDTO(poll: PollDocument): Poll {
        return {

            id: poll._id.toString(),
            question: poll.question,
            options: poll.options.map(item => ({ id: item._id.toString(), text: item.text, voteCount: item.voteCount })),
            url: poll.url,
            createdBy: poll.createdBy ? poll.createdBy.toString() : '',
            createdAt: poll.createdAt,
            expiresAt: poll.expiresAt,
            isActive: poll.isActive

        };
    }
}