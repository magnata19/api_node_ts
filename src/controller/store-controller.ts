import { NextFunction, Response } from "express";
import StoreService from "../service/store-service";
import { CustomRequest } from "../types/custom-request";

export default class StoreController {
  constructor(private storeService: StoreService) { }

  async createStore(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const storeData = await this.storeService.createStore(req.body);
      res.status(201).json({ store: storeData })
    } catch (error) {
      next(error);
    }
  }
}