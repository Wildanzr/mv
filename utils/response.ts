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

export const formatErrorResponse = (error: Error): Response => {
  const response = fail((error as Error).message)

  return new Response(JSON.stringify(response), {
    status: 500,
  })
}
