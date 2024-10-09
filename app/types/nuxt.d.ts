import { Toast, toast } from "vue3-toastify";
import { NuxtApp } from "#app";
declare module "#app" {
  interface NuxtApp {
    $toast: {
      success: (message: string, options?: any) => void;
      error: (message: string, options?: any) => void;
      info: (message: string, options?: any) => void;
      warning: (message: string, options?: any) => void;
    };
  }
}
declare module "vue3-toastify" {
  export const toast: {
    success: (message: string, options?: any) => void;
    error: (message: string, options?: any) => void;
    info: (message: string, options?: any) => void;
    warning: (message: string, options?: any) => void;
  };
}
