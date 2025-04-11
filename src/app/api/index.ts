import { authHeaderAdd } from "@/shared/utils/authHeaderAdd";

export async function request(...args: Parameters<typeof fetch>) {
  let [input, init] = args;
  if (!init) init = {};
  
  if (!localStorage.getItem("token")) {
    await API.Auth.refreshToken();
  }
  let response = await fetch(input, authHeaderAdd(init));
  if (response.status === 401) {
    await API.Auth.refreshToken();
    response = await fetch(input, authHeaderAdd(init));
    if (response.status === 401) {
      throw new Error("Cannot fetch correct token to use API");
    }
  }
  return response;
}

export interface Contract {
  no: string;
  issue_date: string;
}
export interface Photo {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
}
export interface Organization {
   id: string;
   contactId: string;
   name: string;
   shortName: string;
   businessEntity: string;
   type: string[];
   status: string;
   createdAt: string;
   updatedAt: string;
   contract: Contract;
   photos: Photo[];
}
export interface Contacts {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseError {
  error: string;
}

export const API = {
  URL: "https://test-task-api.allfuneral.com",
  Auth: {
    user: "ivan938",
    async getToken() {
      const response = await fetch(`${API.URL}/auth?user=${this.user}`);
      return response.headers.get("Authorization");
    },
    async refreshToken() {
      const token = await this.getToken();
      localStorage.setItem("token", token || "");
    }
  },
  Organization: {
    endpoint: (id: number) => `${API.URL}/companies/${id}`,
    async get(id: number): Promise<Organization | ResponseError> {
      return await (await request(this.endpoint(id))).json();
    },
    async update(id: number, body: Partial<Organization>): Promise<Organization | ResponseError> {
      return await (await request(this.endpoint(id), {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)})).json();
    },
    async delete(id: number): Promise<Response> {
      return await request(this.endpoint(id), {method: "DELETE"});
    }
  },
  Image: {
    endpoint: (id: number, imageName?: string) => `${API.URL}/companies/${id}/image/${imageName ?? ""}`,
    async add(id: number, formData: FormData): Promise<Photo | ResponseError> {
      return await (await request(this.endpoint(id), {method: "POST", body: formData})).json();
    },
    async delete(id: number, imageName: string): Promise<Response> {
      return await request(this.endpoint(id, imageName), {method: "DELETE"});
    }
  },
  Contacts: {
    endpoint: (id: number) => `${API.URL}/contacts/${id}`,
    async get(id: number): Promise<Contacts | ResponseError> {
      return await (await request(this.endpoint(id))).json();
    },
    async update(id: number, body: Partial<Contacts>): Promise<Contacts | ResponseError> {
      return await (await request(this.endpoint(id), {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)})).json();
    }
  }
}