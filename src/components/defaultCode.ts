export function defaultCode(doc_index: any) {
    const transacion: any = {}
    doc_index.keys.map((item: any) =>
        item.keyType === 0 ? (item.keyType = 'string') : (item.keyType = 'number')
    )
    doc_index.keys.forEach((item: any) => {
        transacion[item.name] = null
    })
    return `
const doc_index = ${JSON.stringify(doc_index, null, '\t')};
const transacion = ${JSON.stringify(transacion, null, '\t')};
return doc_store.insertDocs(
    doc_index,
    [transacion],
    _sign,
    1,
)
    `
}
