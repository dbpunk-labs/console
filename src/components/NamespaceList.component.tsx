import React, { memo, useEffect, useMemo } from 'react'
import { DB3, sign, getATestStaticKeypair, getAddress } from 'db3js'
import { useRecoilValue } from 'recoil'
import { publicKeyAtom, secretAtom } from '../state'
import { useAsyncFn } from 'react-use'
import { Card, Space, Typography, Divider } from 'antd'
import { DashboardOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/namespaceList.scss'
import { decode } from 'uint8-to-base64'

const { Title } = Typography

const NamespaceList: React.FC<{}> = memo((props) => {
    const sk = useRecoilValue(secretAtom)
    const pk = useRecoilValue(publicKeyAtom)
    const db3_instance = useMemo(() => new DB3('http://127.0.0.1:26659'), [])
    const [nsState, getNs] = useAsyncFn<() => Promise<[any]>>(async () => {
        console.log(await getAddress(decode(pk)))
        async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
            return [await sign(data, decode(sk)), decode(pk)]
        }
        const nsList = await db3_instance.getNsList(_sign)
        return nsList.nsListList
    }, [db3_instance, sk, pk])
    useEffect(() => {
        db3_instance && getNs()
    }, [db3_instance])
    const navigate = useNavigate()
    return (
        <>
            <Title level={5} style={{ textAlign: 'center' }}>
                Personal Name Space Station
            </Title>
            <Divider></Divider>
            <div className="namespace-list">
                {nsState.value?.map((item) => (
                    <Card
                        key={item.name}
                        title={`ns: ${item.name}`}
                        extra={<Link to={`/namespace/${item.name}`}>More</Link>}
                        style={{ width: 300 }}
                    >
                        <p>{item.description}</p>
                        <div className="ns-meta-data">
                            <Space>
                                <span>
                                    <DashboardOutlined /> {item.ts}
                                </span>
                            </Space>
                        </div>
                    </Card>
                ))}
                <Card title="Create Name New Name Space" style={{ width: 300 }}>
                    <p style={{ fontSize: 36 }} onClick={() => navigate('/namespace/post')}>
                        <PlusOutlined />
                    </p>
                </Card>
            </div>
        </>
    )
})
export default NamespaceList
