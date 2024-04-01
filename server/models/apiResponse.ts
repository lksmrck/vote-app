export type ApiResponse = {
  isSuccess: boolean;
  statusCode: number;
  data: any | null;
  errorMessage: string | null;
};
