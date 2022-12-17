import UAuth from '@uauth/js'
import { Resolution }  from '@unstoppabledomains/resolution'

const resolution = new Resolution()

const uauth = new UAuth({
  clientID: "8281b30a-61de-4df4-99e4-116a3a4c340a",
  redirectUri: "https://cjustinobi.github.io/unstoppable-healthy-street/",
  // redirectUri: "http://localhost:3000",
  scope: "openid wallet"
})

export const login = async () => {
  return await uauth.loginWithPopup()
}

export const logout = async () => {
  return await uauth.logout()
}

export const domainResolution = async domain => {
  try{
    return await resolution.addr(domain, 'ETH')
  }catch(err){
    console.log(err)
  }
}