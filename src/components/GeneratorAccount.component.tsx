import React, { memo, useMemo, useState } from "react";
import { Button, Form, Input, Space, Typography, Upload } from "antd";
import { useRecoilState } from "recoil";

import { ownerAddressAtom, publicKeyAtom, secretAtom } from "../state";
import { useNavigate } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { getAddress, getATestStaticKeypair } from "db3js";
import { encode, decode } from "uint8-to-base64";
import "../styles/account.scss";

const { Text } = Typography;

const GeneratorAccount: React.FC<{}> = memo((props) => {
	const [ownerAddress, setOwnerAddress] = useRecoilState(ownerAddressAtom);
	const [secret, setSecret] = useRecoilState(secretAtom);
	const [publickey, setPublicKey] = useRecoilState(publicKeyAtom);
	const [visibleAccountInfo, setVisibleAccountInfo] = useState(false);
	const [generatorAccountState, generatorAccountFn] = useAsyncFn(async () => {
		const [sk, pk] = await getATestStaticKeypair();
		const address = await getAddress(pk);
		setOwnerAddress(address);
		setSecret(encode(sk));
		setPublicKey(encode(pk));
		setVisibleAccountInfo(true);
	}, []);
	function downloadAccount() {
		const blob = new Blob([JSON.stringify("keyringJSON")], {
			type: "application/octet-stream;charset=utf-8",
		});
		const jsonurl = URL.createObjectURL(blob);
		window.open(jsonurl);
	}
	function importAccount({ file }) {
		const reader = new FileReader();
		reader.onload = function (evt) {
			// const keyringJson = JSON.parse(evt.target.result);
			// const restoredPair = keyring.createFromJson(keyringJson);
			// keyring.addPair(restoredPair, "12345678");
			// db3.setCurrentAccount(keyring.getPair(keyringJson.address));
			// setOwnerAddress(keyringJson.address);
			navigate("/authorization");
		};
		reader.readAsText(file.originFileObj);
		return Promise.resolve();
	}
	const navigate = useNavigate();
	const uploadUrl = URL.createObjectURL(
		new Blob([], { type: "application/json" }),
	);
	return (
		<div className='generator-account'>
			<div className='account-container'>
				{!visibleAccountInfo && (
					<>
						<p style={{ marginBottom: 30 }}>
							Hi, welcom to user DB3.network{" "}
						</p>
						<Button
							type='primary'
							onClick={() => generatorAccountFn()}
							loading={generatorAccountState.loading}
						>
							Gennerator DB3 account
						</Button>
						<div style={{ textAlign: "right", marginTop: 30 }}>
							<Button type='link'>
								I’ve already have accout
							</Button>
						</div>
						{/* <Upload
							action={uploadUrl}
							showUploadList={false}
							onChange={importAccount}
						>
							<Button>Choose Account</Button>
						</Upload> */}
					</>
				)}
				{visibleAccountInfo && (
					<Form
						style={{ width: 400 }}
						name='basic'
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 18 }}
						initialValues={{ remember: true }}
						autoComplete='off'
					>
						<Form.Item label='Account'>
							<Text copyable>{ownerAddress}</Text>
						</Form.Item>
						<Form.Item label='Secret'>
							<Text copyable>{secret}</Text>
						</Form.Item>
						<Form.Item label='Public Key'>
							<Text copyable>{publickey}</Text>
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 4, span: 20 }}>
							<Text type='secondary'>
								<p>
									Please paste and save them, you’ll need them
									later
								</p>
								Please contact us for some test TOKEN:
								dev@db3.network
							</Text>
							<Text></Text>
						</Form.Item>
						<Form.Item
							wrapperCol={{ offset: 4, span: 20 }}
						></Form.Item>
						<Form.Item
							wrapperCol={{ offset: 6, span: 18 }}
							style={{ textAlign: "right" }}
						>
							<Button
								type='primary'
								onClick={() => navigate("/namespace")}
							>
								Connect
							</Button>
						</Form.Item>
					</Form>
				)}
			</div>
		</div>
	);
});
export default GeneratorAccount;
