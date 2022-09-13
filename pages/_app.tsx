import type { AppProps } from 'next/app'

import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css';
import { useEffect, useState } from 'react'

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: 'https://rpc.ankr.com/polygon',
        };
    },
  }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'scaleUp-web3',
  chains,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<any>()
  useEffect(() =>
    setClient(createClient(
      {
        autoConnect: true,
        connectors,
        provider,
      })
    )
  , [])

  return (
      client &&
        <WagmiConfig client={client}>
          <RainbowKitProvider chains={chains} theme={darkTheme()} coolMode>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
  );
}

export default MyApp;