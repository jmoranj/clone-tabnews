function status(request, response) {
  response.status(200).json({ Chave: "valor" })
}

export default status