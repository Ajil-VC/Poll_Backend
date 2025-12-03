
import mongoose from "mongoose";
import { IPollRepository } from "../../../domain/repositories/poll.repo";
import { PollDocument } from "../../database/model/poll.interface";
import pollModel from "../../database/poll.model";
import voteModel from "../../database/vote.model";


export class PollRepositoryImp implements IPollRepository {


    giveVote = async (pollId: string, optionId: string, userId: string): Promise<PollDocument> => {

        const pollOb = new mongoose.Types.ObjectId(pollId);
        const optionOb = new mongoose.Types.ObjectId(optionId);
        const userOb = new mongoose.Types.ObjectId(userId);

        const isVoted = await voteModel.findOne({ pollId: pollOb, userId: userOb });
        if (isVoted) {

            await pollModel.updateOne(
                { _id: pollOb, "options._id": isVoted.optionId },
                { $inc: { "options.$.voteCount": -1 } }
            );

            await voteModel.updateOne(
                { pollId: pollOb, userId: userOb },
                { optionId: optionOb }
            );

        } else {
            await voteModel.create({
                pollId: pollOb,
                userId: userOb,
                optionId: optionOb
            });

        }

        const updatedPoll = await pollModel.findOneAndUpdate(
            { _id: pollOb, "options._id": optionOb },
            { $inc: { "options.$.voteCount": 1 } },
            { new: true }
        );

        return updatedPoll;
    }

    getPollWithId = async (id: string): Promise<PollDocument> => {

        const pollId = new mongoose.Types.ObjectId(id);
        const poll = await pollModel.findOne({ _id: pollId });
        if (!poll) throw new Error('Couldnt findout the poll.');
        return poll;
    }

    getPolls = async (userId: string): Promise<PollDocument[]> => {

        const userOb = new mongoose.Types.ObjectId(userId);
        const polls = await pollModel.find({ createdBy: userOb });
        if (!polls) throw new Error('Couldnt findout polls created by this user');
        return polls;

    }

    createPoll = async (question: string, options: Array<string>, frontendURL: string, userId: string): Promise<PollDocument> => {

        const optionsArray = options.map((item) => {
            return { text: item }
        });

        const userOb = new mongoose.Types.ObjectId(userId);

        const newPoll = new pollModel({
            question,
            options: optionsArray,
            createdBy: userOb
        });


        const result = await newPoll.save();
        if (!result) throw new Error('Couldnt create new poll');

        const pollURL = frontendURL + `/app/home/${result._id}`;
        const pollWithURL = await pollModel.findByIdAndUpdate(
            newPoll._id,
            { $set: { url: pollURL } },
            { new: true }
        );

        return pollWithURL;
    }


}