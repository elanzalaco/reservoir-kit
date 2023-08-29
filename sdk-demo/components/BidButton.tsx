import { BrowserProvider, Signer } from 'ethers'
import { getClient } from './utils'
import { adaptEthersSigner } from '@reservoir0x/ethers-wallet-adapter'

function BidButton() {
  let signer: Signer

  async function init () {
    const provider = new BrowserProvider(window.ethereum!)
    signer = await provider.getSigner()
  }
  
  init()
  const collectionId = '0x05a0b0985ba3b7bd9ade8a7478caa2fa4fda24e5'
  const price = '100000000000000'
  return (
    <div
      style={{
        border: '1px solid black',
        padding: 10,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div>
        <b>Price:</b>
        {price}
      </div>
      <div>
        <b>CollectionId:</b>
        {collectionId}
      </div>
      <button
        onClick={() => {
          if (!signer) {
            throw Error('Signer not available!')
          }

          getClient().actions.placeBid({
            bids: [
              {
                collection: collectionId,
                weiPrice: price,
              },
            ],
            wallet: adaptEthersSigner(signer),
            onProgress: () => {},
          })
        }}
      >
        Place Bid
      </button>
    </div>
  )
}

export default BidButton
