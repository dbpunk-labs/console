import React, { memo, useEffect, useMemo } from "react";
import { DB3, sign, getATestStaticKeypair } from "db3js";
import { useRecoilValue } from "recoil";
import { secretAtom } from "../state";
import { useAsyncFn } from "react-use";
import { Card, Space, Typography, Divider } from "antd";
import { DashboardOutlined, PlusOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/namespaceList.scss";

const { Title } = Typography;

const NamespaceList: React.FC<{}> = memo((props) => {
	const db3_instance = useMemo(() => new DB3("http://127.0.0.1:26659"), []);
	const [nsState, getNs] = useAsyncFn<() => Promise<[any]>>(async () => {
		 console.log("get ns");
        // TODO use global sk and pk
         async function getSign() {
            const [sk, public_key] = await getATestStaticKeypair();
            async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
                return [await sign(data, sk), public_key];
            }
            return _sign;
         };
         const _sign = await getSign();
         const nsList = await db3_instance.getNsList(_sign);
		 return nsList.nsListList;
	}, [db3_instance]);
	useEffect(() => {
		db3_instance && getNs();
	}, [db3_instance]);

	const navigate = useNavigate();
	return (
		<>
			<Title level={5} style={{ textAlign: "center" }}>
				Personal Name Space Station
			</Title>
			<Divider></Divider>
			<div className='namespace-list'>
				{nsState.value?.map((item) => (
					<Card title={`ns: ${item.name}`} style={{ width: 300 }}>
						<p>{item.description}</p>
						<div className='ns-meta-data'>
							<Space>
								<span>
								<DashboardOutlined /> {item.ts}
								</span>
							</Space>
						</div>
					</Card>
				))}
				<Card title='Create Name New Name Space' style={{ width: 300 }}>
					<p
						style={{ fontSize: 36 }}
						onClick={() => navigate("/namespace/post")}
					>
						<PlusOutlined />
					</p>
				</Card>
			</div>
		</>
	);
});
export default NamespaceList;
