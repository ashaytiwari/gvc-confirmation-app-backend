export interface IAddUpdateUserParamsModel {
  email: string,
  username: string,
  password: string,
  role: string
}

export interface ITokenDataModel {
  _id: any,
  username: string,
  email: string,
  token?: string
}

export interface IAdminLoginParamsModel {
  username: string,
  password: string
}