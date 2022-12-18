import { atom, selector } from "recoil";
import _ from "lodash";

export const appAddressAtom = atom({
	key: "appAddressAtom",
	default: "5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL",
});

export const ownerAddressAtom = atom<string>({
	key: "ownerAddressAtom",
	default: selector({
		key: "ownerAddressAtom/default",
		get: () => {
			return localStorage.getItem("dtwitter_owner_address") as string;
		},
	}),
	effects: [
		({ onSet }) => {
			onSet((value) => {
				localStorage.setItem("dtwitter_owner_address", value);
			});
		},
	],
});

export const secretAtom = atom<string>({
	key: "secretAtom",
	default: selector({
		key: "secretAtom/default",
		get: () => {
			return localStorage.getItem("secret_key") as string;
		},
	}),
	effects: [
		({ onSet }) => {
			onSet((value) => {
				localStorage.setItem("secret_key", value);
			});
		},
	],
});

export const publicKeyAtom = atom<string>({
	key: "publicKeyAtom",
	default: selector({
		key: "publicKeyAtom/default",
		get: () => {
			return localStorage.getItem("public_key") as string;
		},
	}),
	effects: [
		({ onSet }) => {
			onSet((value) => {
				localStorage.setItem("public_key", value);
			});
		},
	],
});
