// @ts-nocheck
import React, { useMemo, memo, useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, List, Modal, Select, Tabs, Typography } from 'antd'
import { DB3, sign, DocMetaManager, DocStore, DocKeyType, genPrimaryKey } from 'db3js/src/index'
import { ArrowRightOutlined, PlusCircleOutlined, RightOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import '../styles/namespaceDetail.scss'
import { useParams } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import { publicKeyAtom, secretAtom } from '../state'
import { encode, decode } from 'uint8-to-base64'
import CodeView from './Codeview.component'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Buffer as BufferPolyfill } from 'buffer'
globalThis.Buffer = BufferPolyfill;
const { Title, Text } = Typography
const { Option } = Select

const Collections: React.FC<{}> = memo((props) => {
    const sk = useRecoilValue(secretAtom)
    const pk = useRecoilValue(publicKeyAtom)
    const db3_instance = useMemo(() => new DB3(import.meta.env.VITE_GRPC_URL), [])
    const { name: ns_name } = useParams()
    const [visible, setVisible] = useState(false)
    const [docVisible, setDocVisible] = useState(false)
    const [collection, addCollection] = useAsyncFn(
        async (collection_name, doc_index) => {
            async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
                return [await sign(data, decode(sk)), decode(pk)]
            }
            const keys = []
            const doc_index_obj = JSON.parse(doc_index)
            doc_index_obj.keys.forEach((key) => {
                const new_key = { name: key.name, keyType: null }
                if (key.keyType == 'string') {
                    new_key.keyType = DocKeyType.STRING
                } else {
                    new_key.keyType = DocKeyType.NUMBER
                }
                keys.push(new_key)
            })
            const new_doc_index = {
                keys: keys,
                docName: collection_name,
                ns: ns_name,
            }
            const doc_meta_mgr = new DocMetaManager(db3_instance)
            try {
                const result = await doc_meta_mgr.create_doc_meta(new_doc_index, 'desc', _sign)
                await new Promise((r) => setTimeout(r, 2000))
            } catch (error) {
                console.log(error)
            }
            // create doc_meta
            setVisible(false)
            return collection_name
        },
        [db3_instance, ns_name]
    )
    const [docMetasState, getAllDocMetas] = useAsyncFn(async () => {
        async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
            return [await sign(data, decode(sk)), decode(pk)]
        }
        const doc_meta_mgr = new DocMetaManager(db3_instance)
        try {
            const result = await doc_meta_mgr.get_all_doc_metas(ns_name, _sign)
            return result
        } catch (error) {
            console.error(error)
        }
    }, [db3_instance, ns_name])
    const [docs, getDocs] = useAsyncFn(
        async (doc_index) => {
            async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
                return [await sign(data, decode(sk)), decode(pk)]
            }
            const doc_store = new DocStore(db3_instance)
            const docs = await doc_store.queryAllDocs(ns_name, doc_index, _sign)
            return docs.map((item) => ({ key: encode(genPrimaryKey(doc_index, item)), data: item }))
        },
        [db3_instance, ns_name]
    )

    const [doc, getDocByKey] = useAsyncFn(
        async (key) => {
            return docs.value?.find((item) => item.key === key)?.data
        },
        [docs]
    )
    const [activeDocName, setActiveDocName] = useState<string>()
    const [activeDocKey, setActiveDocKey] = useState<string>()
    const [insertDocHash, insertDocs] = useAsyncFn(
        async (name, doc_content) => {
            async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
                return [await sign(data, decode(sk)), decode(pk)]
            }
            try {
                const doc_index = docMetasState.value?.find((item) => item.doc_name === name)?.index
                const doc_store = new DocStore(db3_instance)
                const hash = await doc_store.insertDocs(doc_index, [JSON.parse(doc_content)], _sign)
                await new Promise((r) => setTimeout(r, 2000))
                getDocs(doc_index)
                setDocVisible(false)
                return hash
            } catch (error) {
                console.log(error)
            }
        },
        [docMetasState, db3_instance, ns_name]
    )
    function onFinish(values: any) {
        const { name, index } = values
        addCollection(name, index)
    }

    function onAddDocFinish(values: any) {
        const { name, doc_content } = values
        insertDocs(name, doc_content)
    }

    useEffect(() => {
        getAllDocMetas()
    }, [collection.value])
    return (
        <>
            <div className="ns-collections">
                <div className="collections-panel">
                    <List
                        header={
                            <div
                                onClick={() => setVisible(true)}
                                style={{ cursor: 'pointer', padding: 7 }}
                            >
                                <PlusCircleOutlined style={{ marginRight: 7 }} />
                                Add Collection
                            </div>
                        }
                        loading={docs.loading}
                        dataSource={docMetasState.value}
                        renderItem={(item) => (
                            <List.Item
                                key={item.doc_name}
                                className={item.doc_name === activeDocName ? 'active' : ''}
                                onClick={() => {
                                    setActiveDocName(item.doc_name)
                                    getDocs(item.index)
                                }}
                            >
                                <Typography.Text mark></Typography.Text> {item.doc_name}
                                <RightOutlined />
                            </List.Item>
                        )}
                    />
                </div>
                <div className="docs-panel">
                    <List
                        header={
                            <div
                                onClick={() => setDocVisible(true)}
                                style={{ cursor: 'pointer', padding: 7 }}
                            >
                                <PlusCircleOutlined style={{ marginRight: 7 }} />
                                Add doc
                            </div>
                        }
                        loading={docs.loading}
                        dataSource={docs.value}
                        renderItem={(item) => (
                            <List.Item
                                key={item.key}
                                className={item.key === activeDocKey ? 'active' : ''}
                                onClick={() => {
                                    setActiveDocKey(item.key)
                                    getDocByKey(item.key)
                                }}
                            >
                                <Typography.Text mark></Typography.Text> {item.key}
                                <RightOutlined />
                            </List.Item>
                        )}
                    />
                </div>
                <div className="docs-detail">
                    <SyntaxHighlighter language="json">
                        {JSON.stringify(doc.value, null, '\t')}
                    </SyntaxHighlighter>
                </div>
            </div>
            <Modal
                title="Add Collection"
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Collection Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="index"
                        name="index"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={collection.loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Add doc"
                open={docVisible}
                onCancel={() => setDocVisible(false)}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onAddDocFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Collection Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Select style={{ width: '100%' }}>
                            {docMetasState.value?.map((item) => (
                                <Option key={item.doc_name} value={item.doc_name}>
                                    {item.doc_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Doc Content"
                        name="doc_content"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={insertDocHash.loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
})

const NamespaceDetail: React.FC<{}> = memo((props) => {
    const { name: ns_name } = useParams()
    return (
        <div className="namespace-detail">
            <Title level={5} style={{ textAlign: 'center' }}>
                NS: {ns_name}
            </Title>
            <Tabs
                items={[
                    {
                        label: `Collections`,
                        key: 'Collections',
                        children: <Collections />,
                    },
                    {
                        label: `Detail`,
                        key: '3',
                        children: <CodeView />,
                    },
                ]}
            ></Tabs>
        </div>
    )
})
export default NamespaceDetail
