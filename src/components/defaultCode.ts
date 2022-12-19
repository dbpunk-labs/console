export const defaultCode = `
const doc_index = {
    keys: [
        {
            name: "address",
            keyType: DocKeyType.STRING,
        },
        {
            name: "ts",
            keyType: DocKeyType.NUMBER,
        },
    ],
    ns: "ns1",
    docName,
};
const transacion = {
    address: "0x11111",
    ts: 9527,
    amount: 10,
};
return doc_store.insertDocs(
    doc_index,
    [transacion],
    _sign,
    1,
)
`
