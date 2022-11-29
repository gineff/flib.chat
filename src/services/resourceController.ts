import ResourceApi from "api/ResourceApi";

export const uploadFile = async (data: FormData) => {
  const response = await ResourceApi.create(data);
  const file = response.response;
  return file;
};
