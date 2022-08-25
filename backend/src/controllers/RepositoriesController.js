import Repository from "../models/Repository";
import User from "../models/User";

class RepositoriesController {
    async create(req, res) {
        try {
            const {
                user_id
            } = req.params;
            const user = await User.findById(user_id);
            const {
                name,
                url
            } = req.body;

            if (!user) {
                return res.status(404).json();
            }

            const repository = await Repository.findOne({
                userId: user.id,
                url
            });

            if (repository) {
                return res.status(422).json({
                    message: `Repository ${name} already exists`
                });
            }

            const newRepository = await Repository.create({
                name,
                url,
                userId: user_id
            });

            return res.status(201).json(newRepository);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: "Internal Server Error"
            });
        }
    }

    async list(req, res) {
        try {
            const {
                user_id,
            } = req.params;
            const {
                q
            } = req.query;
            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            let query = {};

            if(q) {
                query = { url: { $regex: q } }
            }

            const repositories = await Repository.find({
                userId: user_id,
                ...query
            });

            return res.json(repositories);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: "Internal Server Error"
            });
        }
    }

    async delete(req, res) {
        try {
            const {
                user_id,
                id
            } = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            const repository = await Repository.findOne({
                userId: user.id,
                id
            });

            if (!repository) {
                return res.status(404).json();
            }

            await repository.deleteOne();

            return res.status(200).json();
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: "Internal Server Error"
            });
        }
    }
}

export default new RepositoriesController();