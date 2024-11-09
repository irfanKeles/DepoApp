export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    errorMessages:any;
}