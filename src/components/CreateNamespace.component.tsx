import { useAsyncFn } from "react-use"
import React, { memo, useState , useMemo} from "react";
import { Form, Space, Typography, Divider, Input, Button, Switch } from "antd";
import { DB3, sign, getATestStaticKeypair } from "db3js";

const { Title } = Typography;

const CreateNamespace: React.FC<{}> = memo((props) => {
	const db3_instance = useMemo(() => new DB3("http://127.0.0.1:26659"), []);
	const [nsPublic, setNsPublic] = useState<boolean>(false);
    const [hash, createNamespace] = useAsyncFn(async values => {
		async function getSign() {
			const [sk, public_key] = await getATestStaticKeypair();
			async function _sign(data: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
				return [await sign(data, sk), public_key];
			} 
			return _sign;
		};
        const _sign = await getSign();
		const result = await db3_instance.createSimpleNs(values, _sign);
		return result;
	}, []);

	function onFinish(values: any) {
		createNamespace(values);
	}

	function onChangeNsPublic(checked: boolean) {
		setNsPublic(checked);
	}

	return (
		<div className='create-namespace'>
			<Title level={5} style={{ textAlign: "center" }}>
				Create New Name Space
			</Title>
			<Divider></Divider>
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				onFinish={onFinish}
				autoComplete='off'
				style={{ width: 500 }}
			>
				<Form.Item
					label='Name'
					name='name'
					rules={[
						{
							required: true,
							message: "Please input your namespace name!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Description'
					name='desc'
					rules={[
						{
							required: true,
							message: "Please input your description!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item label='Public' name='nsPublic'>
					<Switch onChange={onChangeNsPublic} />
				</Form.Item>
				{nsPublic && (
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Form.Item
							label='Fee'
							name='fee'
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
						>
							<Switch />
						</Form.Item>
						<Form.Item
							label='currency'
							name='ecr20Token'
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							rules={[
								{
									required: true,
									message: "Please input your currency!",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label='unit'
							name='price'
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							rules={[
								{
									required: true,
									message: "Please input your unit!",
								},
							]}
						>
							<Input />
						</Form.Item>
                        <Form.Item
							label='querys'
							name='queryCount'
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							rules={[
								{
									required: true,
									message: "Please input your query count",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Form.Item>
				)}

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit'>
						Save
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
});
export default CreateNamespace;
