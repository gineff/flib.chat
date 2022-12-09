import ResourceApi from "api/ResourceApi";
import { File } from "api/types";

export const uploadFile = async (data: FormData): Promise<File> => {
  const response = await ResourceApi.create(data);
  const file = response.response as File;
  return file;
};
