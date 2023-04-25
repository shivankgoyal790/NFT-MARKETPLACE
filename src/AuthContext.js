import { createContext } from "react";
import { JsonRpcSigner } from "@ethersproject/providers";

export const AuthContext = createContext({
	signer: JsonRpcSigner,
	address: null,
	loading: false,
	connectWallet: () => {},
});
