import Errors from 'restify-errors'
import mongoose from 'mongoose'
import co from 'co'

class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    makeModel(data = {}) {
        return new this.model(data);
    }

    findAll() {
        return this.model.find({});
    }

    findById(id) {
        return this.model.find({ _id: id }).cursor().next();
    }

    create(data) {
        return this.makeModel(data).save();
    }

    update(id, data) {
        const query = this.model;
        return co(function* () {
            return yield query.findOne({ _id: id }).then(() => {
                return query.update({ _id: id }, { '$set': data })
                    .then((task) => {
                        return query.findById(task._id);
                    })
                    .catch((err) => {
                        throw new Errors.InternalServerError('problems in update');
                    });
            }).catch(err => {
                throw new Errors.NotFoundError('document not found');
            });
        });
    }

    delete(id) {
        const query = this.model;
        return co(function* () {
            let isTaskRemoved = yield query.findOne({ _id: id }).then(() => {
                return query.remove({ _id: id }).then(() => {
                    return true;
                }).catch(err => {
                    throw new Errors.InternalServerError("can't remove the task");
                });
            }).catch(err => {
                throw new Errors.NotFoundError('document not found');
            });
            return isTaskRemoved;
        });
    }
}

export default BaseRepository
