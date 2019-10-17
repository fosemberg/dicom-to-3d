export const createMessageObject = (str: string) => ({ message: str });
export const createMessageObjectString = (str: string) =>
  JSON.stringify(createMessageObject(str));
