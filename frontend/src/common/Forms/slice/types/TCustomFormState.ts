export interface FormState {
  error: string | null;
  loading: boolean;
  success: boolean;
  fieldErrors: Record<string, string>;
}

export type TCustomFormState = {
  forms: Record<string, FormState>;
};
