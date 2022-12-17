import UAuth from '@uauth/js'

const uauth = new UAuth({
  clientID: "8281b30a-61de-4df4-99e4-116a3a4c340a",
  // redirectUri: "https://cjustinobi.github.io/unstoppable-healthy-street/",
  redirectUri: "http://localhost:3000",
  scope: "openid wallet"
})



export const loginWithUD = async () => {
  return await uauth.loginWithPopup()
}