export const get = async (url) => {
  const res = await fetch("http://localhost:4001/" + url)
  return await res.json()
}

export const post = async (url, data) => {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }

  const res = await fetch("http://localhost:4001/" + url, options)
  return await res.json()
}




