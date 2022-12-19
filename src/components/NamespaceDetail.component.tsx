import React, {useMemo, memo, useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Tabs, Typography } from 'antd'
import { DB3, sign,DocMetaManager,DocStore, DocKeyType} from "db3js";
import { PlusCircleOutlined } from '@ant-design/icons'
import { useRecoilValue } from "recoil";
import '../styles/namespaceDetail.scss'
import { useParams } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import { divide } from 'lodash'
import { publicKeyAtom, secretAtom } from "../state";
import { decode } from "uint8-to-base64";
import { Buffer as BufferPolyfill } from 'buffer'
globalThis.Buffer = BufferPolyfill;

const { Title } = Typography

const Collections: React.FC<{}> = memo((props) => {
    const sk = useRecoilValue(secretAtom);
	const pk = useRecoilValue(publicKeyAtom);
	const db3_instance = useMemo(() => new DB3("http://127.0.0.1:26659"), []);
    const { name: ns_name } = useParams()
    const [visible, setVisible] = useState(false)
    const [docVisible, setDocVisible] = useState(false)
    const [cname, addCollection] = useAsyncFn(async (collection_name, doc_index) => {
        async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
			return [await sign(data, decode(sk)), decode(pk)];
		} 
        const keys = [];
        const doc_index_obj = JSON.parse(doc_index);
        doc_index_obj.keys.forEach((key) => {
            const new_key = {name: key.name,
            keyType:null};
            if (key.keyType == "string") {
                new_key.keyType = DocKeyType.STRING;
            }else {
                new_key.keyType = DocKeyType.NUMBER; 
            }
            keys.push(new_key);
        });
        const new_doc_index = {
            keys:keys,
            docName:collection_name,
            ns:ns_name
        };
        const doc_meta_mgr = new DocMetaManager(db3_instance);
        try {
            const result = await doc_meta_mgr.create_doc_meta(new_doc_index, "desc", _sign);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        // create doc_meta
        setVisible(false);
        return collection_name;
    }, [db3_instance, ns_name])
    const [docMetasState, getAllDocMetas] = useAsyncFn(async () => {
        async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
			return [await sign(data, decode(sk)), decode(pk)];
		} 
        const doc_meta_mgr = new DocMetaManager(db3_instance);
        const result = await doc_meta_mgr.get_all_doc_metas(ns_name, _sign);
        return result;
    }, [db3_instance, ns_name])
    const [docs, getDocs] = useAsyncFn(
        async (doc_index) => {
            async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
                return [await sign(data, decode(sk)), decode(pk)];
            } 
            const doc_store = new DocStore(db3_instance);
            const docs = await doc_store.queryAllDocs(ns_name, doc_index, _sign);
            return docs;
        },
        [db3_instance, ns_name]
    )

    const [doc, getDocByKey] = useAsyncFn(
        async (key) => {
            return docs.value?.find((item) => item.key === key)?.data
        },
        [docs]
    )

    const [docsInfo, setDocsInfo] = useState('')
    const [insertDocHash, insertDocs] = useAsyncFn(async (name, doc_content) => {
        async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
            return [await sign(data, decode(sk)), decode(pk)];
        } 
        try {
            const doc_index = docMetasState.value?.find((item) => item.doc_name === name)?.index
            const doc_store = new DocStore(db3_instance)
            const hash = await doc_store.insertDocs(doc_index, [JSON.parse(doc_content)], _sign)
            setDocVisible(false)
            return hash
        } catch(error) {
            console.log(error)
        }
    }, [docMetasState, db3_instance, ns_name])
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
    }, [])
    return (
        <>
            <div className="ns-collections">
                <div className="collections-panel">
                    <div onClick={() => setVisible(true)} style={{ cursor: 'pointer' }}>
                        <PlusCircleOutlined style={{ marginRight: 7 }} />
                        Add Collection
                    </div>
                    {docMetasState.value?.map((item) => (
                        <div
                            key={item.doc_name}
                            onClick={() => {
                                getDocs(item.index)
                            }}
                            style={{ padding: '7px 10px', cursor: 'pointer' }}
                        >
                            {item.doc_name}
                        </div>
                    ))}
                </div>
                <div className="docs-panel">
                    <div onClick={() => setDocVisible(true)} style={{ cursor: 'pointer' }}>
                        <PlusCircleOutlined style={{ marginRight: 7 }} />
                        Add doc
                    </div>
                    {docs.value?.map((item) => (
                        <div
                            style={{ padding: '7px 10px', cursor: 'pointer' }}
                        >
                            {JSON.stringify(item)}
                        </div>
                    ))}
                </div>
                <div className="docs-detail">{doc.value && JSON.stringify(doc.value)}</div>
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
                        <Button type="primary" htmlType="submit">
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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Doc Content"
                        name="doc_content"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
})

const Detail: React.FC<{}> = memo((props) => {
    return <div className="ns-detail"></div>
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
                        children: <Detail />,
                    },
                ]}
            ></Tabs>
        </div>
    )
})
export default NamespaceDetail
