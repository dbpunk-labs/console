// @ts-nocheck
import React, { memo, useEffect, useMemo, useState } from 'react'
import { Button, Select, Space, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { DB3, DocStore, DocKeyType, sign, DocMetaManager } from 'db3js'
import { defaultCode } from './defaultCode'
import { useRecoilState } from 'recoil'
import { publicKeyAtom, secretAtom } from '../state'
import { decode } from 'uint8-to-base64'
import { useAsync } from 'react-use'
import SyntaxHighlighter from 'react-syntax-highlighter'

const { Title, Text } = Typography
const { Option } = Select

const CodeView: React.FC<{}> = memo((props) => {
    const [excuteResult, setExcuteResult] = useState<string>('')
    const { name: ns_name } = useParams()
    const db3_instance = useMemo(() => new DB3(import.meta.env.VITE_GRPC_URL), [])
    const doc_store = useMemo(() => new DocStore(db3_instance), [db3_instance])
    const [code, setCode] = useState<string>()
    const [sk] = useRecoilState(secretAtom)
    const [pk] = useRecoilState(publicKeyAtom)
    async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
        return [await sign(data, decode(sk)), decode(pk)]
    }
    const docMetasState = useAsync(async () => {
        const doc_meta_mgr = new DocMetaManager(db3_instance)
        try {
            const result = await doc_meta_mgr.get_all_doc_metas(ns_name, _sign)
            return result
        } catch (error) {
            console.error(error)
        }
    }, [db3_instance, ns_name])
    const [docName, setDocName] = useState<string>()
    function runInsertDocCode() {
        const fn = new Function('db3_instance', 'doc_store', 'DocKeyType', '_sign', 'docName', code)
        fn(db3_instance, doc_store, DocKeyType, _sign, docName).then((data: any) => {
            setExcuteResult(JSON.stringify(data, null, '\t'))
        })
    }
    useEffect(() => {
        if (docMetasState.value && docName) {
            setCode(
                defaultCode(
                    docMetasState.value.find((item: any) => item.doc_name === docName).index
                )
            )
        }
    }, [docMetasState.value, docName])
    return (
        <div className="code-view">
            <Space>
                <Title level={3}>NS: {ns_name}</Title>
                <div style={{ display: 'flex' }}>
                    collection:
                    <Select
                        value={docName}
                        onChange={(value) => setDocName(value)}
                        style={{ width: 300 }}
                    >
                        {docMetasState.value?.map((item) => (
                            <Option key={item.doc_name} value={item.doc_name}>
                                {item.doc_name}
                            </Option>
                        ))}
                    </Select>
                </div>
            </Space>
            <div>
                <Text>
                    This table gives the most recent erc-20 token balance of an address. The data
                    refreshes every ETH block or 13s
                </Text>
            </div>
            <div>
                <Title level={5}>insert data</Title>
            </div>
            <div>
                <Text>Only table owner have the right to write table</Text>
            </div>
            <Editor
                theme="vs-dark"
                height="30vh"
                defaultLanguage="javascript"
                value={code}
                onChange={(value) => setCode(value)}
            />
            <Button type="primary" onClick={runInsertDocCode}>
                Run
            </Button>
            <SyntaxHighlighter language="json">{excuteResult}</SyntaxHighlighter>
        </div>
    )
})
export default CodeView
