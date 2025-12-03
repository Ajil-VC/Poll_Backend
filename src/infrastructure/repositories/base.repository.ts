import { Document, Model } from "mongoose";

export abstract class BaseRepository<T extends Document> {

    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }


    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }


    async findByEmail(email: string): Promise<T | null> {
        return this.model.findOne({ email }).exec();
    }

}