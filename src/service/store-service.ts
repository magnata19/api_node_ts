import { prismaClient } from "..";
import { StoreDto } from "../validation/store-validation";

export default class StoreService {

  async createStore(storeDto: StoreDto): Promise<any> {
    const storeData = await prismaClient.store.create({
      data: {
        name: storeDto.name,
        description: storeDto.description ?? '',
        location: storeDto.location ?? ''
      }
    })

    return storeData;
  }
}