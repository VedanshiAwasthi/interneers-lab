import axios from "axios";

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data.detail || "Something went wrong.";
  }
  return error instanceof Error ? error.message : String(error);
};
