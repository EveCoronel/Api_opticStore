const envConfig = require("../config/env.config");
const { HTTP_STATUS } = require("../constants/api.constants");
const { getDAOS } = require("../models/dao/daos.factory");
const { HttpError } = require("../utils/formatRes.utils");

class ProductsApi {
  constructor() {
    this.productsDao = getDAOS(envConfig.DATASOURCE).productsDao;
  }

  async getProducts(category = null) {
    if (!category) return this.productsDao.getAll();
    let filter = {category: category}
    return this.productsDao.getAll(filter);
  }
  async getProductById(_id) {
    if (!_id)
      throw HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
    return this.productsDao.getById(_id);
  }
  async createProduct(productPayload) {
    return this.productsDao.save(productPayload);
  }
  async updateProduct(_id, productPayload) {
    if (!_id)
      throw HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
    return this.productsDao.update(_id, productPayload);
  }
  async deleteProduct(_id) {
    if (!_id)
      throw HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
    return this.productsDao.delete(_id);
  }
}

module.exports = ProductsApi;
