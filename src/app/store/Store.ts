import { createDialogboxStore } from "./Dialogbox";
import { createOrganizationStore } from "./Organization";

export const Store = {
  Organization: createOrganizationStore(),
  Dialogbox: createDialogboxStore()
};