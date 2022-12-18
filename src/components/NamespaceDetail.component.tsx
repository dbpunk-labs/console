import React, { memo, useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Tabs, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

import '../styles/namespaceDetail.scss'
import { useParams } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import { divide } from 'lodash'

const { Title } = Typography

const Collections: React.FC<{}> = memo((props) => {
    const { name: ns_name } = useParams()
    const [visible, setVisible] = useState(false)
    const [docVisible, setDocVisible] = useState(false)
    const [activeCollectionName, setActiveCollectionName] = useState('')
    const [hash, addCollection] = useAsyncFn(async (collection_name, doc_index) => {
        // create doc_meta
        setVisible(false)
        return 'fdsfsdfsdfd'
    }, [])
    const [docMetasState, getAllDocMetas] = useAsyncFn(async () => {
        console.log('getAllDocMetas')
        return [
            { doc_name: 'test1', index: {} },
            { doc_name: 'test2', index: {} },
        ]
    }, [hash])
    const [docs, getDocs] = useAsyncFn(
        async (doc_index) => {
            return [{ key: 'xxxx', data: { name: '123' } }]
        },
        [hash]
    )

    const [doc, getDocByKey] = useAsyncFn(
        async (key) => {
            return docs.value?.find((item) => item.key === key)?.data
        },
        [docs]
    )
    const [docsInfo, setDocsInfo] = useState('')
    const [insertDocHash, insertDocs] = useAsyncFn(async () => {
        // insertDocs
        setDocVisible(false)
        console.log(docsInfo, activeCollectionName)
    }, [docsInfo, activeCollectionName])
    function onFinish(values: any) {
        const { name, index } = values
        addCollection(name, index)
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
                                setActiveCollectionName(item.doc_name)
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
                            key={item.key}
                            onClick={() => getDocByKey(item.key)}
                            style={{ padding: '7px 10px', cursor: 'pointer' }}
                        >
                            {item.key}
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
                onOk={insertDocs}
                onCancel={() => setDocVisible(false)}
            >
                <Input.TextArea
                    value={docsInfo}
                    onChange={(e) => setDocsInfo(e.target.value)}
                ></Input.TextArea>
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
