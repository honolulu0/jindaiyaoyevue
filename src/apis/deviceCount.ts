import instance from "./axios"

export const getDeviceCount = async () => {
  const res = await instance.get('/device/count')
  console.log(res)
  return res
}
