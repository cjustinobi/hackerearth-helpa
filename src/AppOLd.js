import { ethers } from 'ethers'
import Web3 from 'web3'
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets, RainbowKitProvider, ConnectButton} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import HelpaJson from './artifacts/contracts/Helpa.sol/Helpa.json'
import { loginWithUD } from './services'

const contractAddress = '0x258fca4dd2856bAEE5A4944567452dDDFBf098E8'

const { chains, provider } = configureChains(
  [polygon, polygonMumbai],
  [
    // alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_PK }),
    alchemyProvider({ apiKey: 'rfjiBZC5XvCvg4XZAn4Xpn1lc5Cmi_rK' }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Helpa App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})



function App() {

  const login = () => {
    const res = loginWithUD()
    console.log(res)

  }

  const getName = async () => {

    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // const contract = new ethers.Contract(contractAddress, Helpa.abi, provider);
      const contract = new ethers.Contract(contractAddress, HelpaJson.abi, signer);

      try {
        const data = await contract.payOwner(
          '0x01a3f5cB1BCf260d12A2466cE075398aAB8cA610',
          ).send({
          value: ethers.utils.parseUnits('0.0000006', 'ether')
        });
        console.log("data: ", data);
        const res = await data.wait()
        console.log(res)
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton />
        <button onClick={getName}>Get Name</button>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
