export const success = (message: string, data: any) => {
  return {
    success: true,
    message: message,
    data: data,
  }
}

export const fail = (message: string) => {
  return {
    success: false,
    message: message,
    data: null,
  }
}
