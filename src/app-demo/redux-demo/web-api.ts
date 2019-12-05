import { Fetch } from '@commons'


export const getSomethingInfo = async () => {
   const res = await Fetch.Get({url: 'http://rydev.com:8090/api/userInfo'})
   return res
}