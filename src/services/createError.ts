
export const createError = (status:any, message:string) => {
    const err = new Error();
    // err.status = status;
    err.message = message;
    return err;
}