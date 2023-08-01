export const success = (message: string, data: any, status: number) => {
  const payload = {
    success: true,
    message: message,
    data: data,
  }
  return new Response(JSON.stringify(payload), {
    status: status,
  })
}

export const fail = (message: string) => {
  return {
    success: false,
    message: message,
    data: null,
  }
}

export const formatErrorResponse = (error: Error, status: number): Response => {
  const response = fail((error as Error).message)

  return new Response(JSON.stringify(response), {
    status: status,
  })
}
