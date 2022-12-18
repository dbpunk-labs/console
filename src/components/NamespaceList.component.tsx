import React, { memo, useEffect, useMemo } from "react";
import { DB3, sign } from "db3js";
import { useRecoilValue } from "recoil";
import { publicKeyAtom, secretAtom } from "../state";
import { useAsyncFn } from "react-use";
import { Card, Space, Typography, Divider } from "antd";
import { DollarOutlined, PlusOutlined, TableOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/namespaceList.scss";

const { Title } = Typography;

const NamespaceList: React.FC<{}> = memo((props) => {
	const sk = useRecoilValue(secretAtom);
	const pk = useRecoilValue(publicKeyAtom);
	const db3_instance = useMemo(() => new DB3("http://127.0.0.1:26659"), []);
	const [nsState, getNs] = useAsyncFn<() => Promise<[any]>>(async () => {
		return [{ name: "mytwitter" }];
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
						<p>desc</p>
						<div className='ns-meta-data'>
							<Space>
								<span>
									<TableOutlined /> 10
								</span>
								<span>
									<DollarOutlined /> 0.1
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
