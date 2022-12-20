import { atom, selector } from 'recoil'
import _ from 'lodash'

export const ownerAddressAtom = atom<string>({
    key: 'ownerAddressAtom',
    default: selector({
        key: 'ownerAddressAtom/default',
        get: () => {
            return localStorage.getItem('ownerAddressAtom') as string
        },
    }),
    effects: [
        ({ onSet }) => {
            onSet((value) => {
                localStorage.setItem('ownerAddressAtom', value)
            })
        },
    ],
})

export const secretAtom = atom<string>({
    key: 'secretAtom',
    default: selector({
        key: 'secretAtom/default',
        get: () => {
            return localStorage.getItem('secret_key') as string
        },
    }),
    effects: [
        ({ onSet }) => {
            onSet((value) => {
                localStorage.setItem('secret_key', value)
            })
        },
    ],
})

export const publicKeyAtom = atom<string>({
    key: 'publicKeyAtom',
    default: selector({
        key: 'publicKeyAtom/default',
        get: () => {
            return localStorage.getItem('public_key') as string
        },
    }),
    effects: [
        ({ onSet }) => {
            onSet((value) => {
                localStorage.setItem('public_key', value)
            })
        },
    ],
})
