import { makeAutoObservable } from "mobx";
import { Contacts, Organization } from "../api";

export interface Organizations {
  [key: string]: (Organization & {contacts: Contacts} & {types: string[]}) | undefined;
}
export interface OrganizationStore {
  organizations: Organizations;
  rename: (id: string, name: string) => void;
  save: (id: string, organization: any) => void;
  update: (id: string, update: any) => void;
  delete: (id: string) => void;
  contactsUpdate: (id: string, contacts: any) => void;
  photoAdd: (id: string, photo: any) => void;
  photoDelete: (id: string, photoName: string) => void;
}
export function createOrganizationStore() {
  return makeAutoObservable<OrganizationStore>({
    organizations: {},
    rename(id: string, name: string) {
      const organization = this.organizations[id];
      if (organization) {
        organization.name = name;
      }
    },
    save(id: string, organization: any) {
      this.organizations[id] = organization;
      this.organizations[id]!.types = this.organizations[id]!.type;
    },
    update(id: string, update: any) {
      if (this.organizations[id]) {
        this.organizations[id] = {...this.organizations[id], ...update};
      }
    },
    delete(id: string) {
      delete this.organizations[id];
    },
    contactsUpdate(id: string, contacts: any) {
      const organization = this.organizations[id];
      if (organization) {
        organization.contacts = {...organization.contacts, ...contacts};
      }
    },
    photoAdd(id: string, photo: any) {
      const organization = this.organizations[id];
      if (organization) {
        organization.photos.push(photo);
      }
    },
    photoDelete(id: string, photoName: string) {
      const organization = this.organizations[id];
      if (organization) {
        const index = organization.photos.findIndex(photo => photo.name === photoName);
        organization.photos.splice(index, 1);
      }
    }
  });
}