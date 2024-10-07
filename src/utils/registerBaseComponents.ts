import type { App } from "vue";
import {
  BaseButton,
  BaseForm,
  BaseInput,
  BaseModal,
  BaseTable,
  BaseSelect,
  BaseHeader,
  BasePagination,
} from "@/components/BaseComponents";

const registerBaseComponents = (app: App<Element>) => {
  app
    .component("BaseInput", BaseInput)
    .component("BaseForm", BaseForm)
    .component("BaseModal", BaseModal)
    .component("BaseButton", BaseButton)
    .component("BaseTable", BaseTable)
    .component("BaseHeader", BaseHeader)
    .component("BaseSelect", BaseSelect)
    .component("BasePagination", BasePagination);
};

export { registerBaseComponents };
