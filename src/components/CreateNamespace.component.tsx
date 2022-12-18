import React, { memo, useState } from "react";
import { Form, Space, Typography, Divider, Input, Button, Switch } from "antd";

const { Title } = Typography;

const CreateNamespace: React.FC<{}> = memo((props) => {
	const [nsPublic, setNsPublic] = useState<boolean>(false);
	function onFinish(values: any) {
		console.log(values);
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
					name='description'
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
							name='currency'
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
							name='unit'
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
