import { BaseApiClient } from './BaseApiClient';
import type { RegisterResponse, LoginResponse, UpdateUserResponse, GetUserResponse, DeleteUserResponse} from './types';

export class ReqResClient extends BaseApiClient {
  static updateUser(arg0: number, arg1: { name: string; job: string; }): UpdateUserResponse | PromiseLike<UpdateUserResponse> {
      throw new Error("Method not implemented.");
  }
  constructor() {
    super("https://reqres.in/api");
  }

  async registerUser(email: string, password: string): Promise<RegisterResponse> {
    const response = await this.post("/register", { email, password });
    return response.data as RegisterResponse;
  }

  async loginUser(email: string, password: string): Promise<LoginResponse> {
    const response = await this.post("/login", { email, password });
    return response.data as LoginResponse;
  }

  async updateUser(id: number, data: any): Promise<UpdateUserResponse> {
    const response = await this.put(`/users/${id}`, data);
    return response.data as UpdateUserResponse;
  }

  async getUser(id: number): Promise<GetUserResponse> {
    const response = await this.get(`/users/${id}`);
    return response.data as GetUserResponse;
  }

  async deleteUser(id: number): Promise<DeleteUserResponse> {
    await this.delete(`/users/${id}`);
    return {};
  }
  
  public async registerEmptyBody(): Promise<DeleteUserResponse> {
    await this.post("/register", {});
    return {};
  }
  
}
