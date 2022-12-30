// @ts-nocheck
import { useAsyncFn } from 'react-use'
import { useRecoilValue } from 'recoil'
import React, { memo, useState, useMemo } from 'react'
import { Form, Space, Typography, Divider, Input, Button, Switch, InputNumber } from 'antd'
import { DB3, sign, getATestStaticKeypair, getAddress } from 'db3js'
import { publicKeyAtom, secretAtom } from '../state'
import { decode } from 'uint8-to-base64'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const CreateNamespace: React.FC<{}> = memo((props) => {
    const sk = useRecoilValue(secretAtom)
    const pk = useRecoilValue(publicKeyAtom)
    const db3_instance = useMemo(() => new DB3(import.meta.env.VITE_GRPC_URL), [])
    const [nsPublic, setNsPublic] = useState<boolean>(false)
    const navigate = useNavigate()
    const [hash, createNamespace] = useAsyncFn(
        async (values) => {
            async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
                return [await sign(data, decode(sk)), decode(pk)]
            }
            try {
                console.log(values)
                const result = await db3_instance.createSimpleNs(values, _sign)
                await new Promise((r) => setTimeout(r, 1500))
                navigate('/namespace')
                return result
            } catch (error) {
                console.error(error)
            }
        },
        [sk, pk]
    )

    function onFinish(values: any) {
        createNamespace(values)
    }

    function onChangeNsPublic(checked: boolean) {
        setNsPublic(checked)
    }

    return (
        <div className="create-namespace">
            <Title level={5} style={{ textAlign: 'center' }}>
                Create New Name Space
            </Title>
            <Divider></Divider>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off"
                style={{ width: 500 }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your namespace name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="desc"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your description!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Public" name="nsPublic" valuePropName="checked">
                    <Switch onChange={onChangeNsPublic} />
                </Form.Item>
                {nsPublic && (
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Form.Item
                            label="Fee"
                            name="fee"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item
                            label="currency"
                            name="erc20Token"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your currency!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="unit"
                            name="price"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your unit!',
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="querys"
                            name="queryCount"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your query count',
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Form.Item>
                )}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={hash.loading}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
})
export default CreateNamespace
