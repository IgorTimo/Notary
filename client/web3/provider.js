import { ethers } from "ethers";

let provider;

provider = ethers.providers.getDefaultProvider("rinkeby");

if (typeof window !== "undefined") {
  window.ethereum ? handleEthereum() : setTimeout(handleEthereum, 3000);
}

function handleEthereum() {
  const { ethereum } = window;

  if (ethereum && ethereum.isMetaMask)
    provider = new ethers.providers.Web3Provider(window.ethereum, "rinkeby");
}

//TODO: написать провайдера, который подключается к window.ethereum если может, а если на может то к какому-то дефолтному провайдеру, чтобы мы могли читать данные и до загрузки окна

export default provider;
