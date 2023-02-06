const MongoRepository = require("../../Repository/mongo.repository");
const { HttpError } = require("../../../utils/formatRes.utils");
const { HTTP_STATUS } = require("../../../constants/api.constants");
const userSchema = require("../../schemas/User.schema");

const collection = "users";

class Users extends MongoRepository {
  constructor() {
    super(collection, userSchema);
  }

  async getByEmail(username) {
    const document = await this.model.findOne({ email: username }, { __v: 0 });
    if (!document) {
      const message = `Resource with email ${username} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return document;
  }
}

module.exports = new Users();
