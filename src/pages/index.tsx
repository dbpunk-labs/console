// @ts-nocheck
import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Modal from "react-modal";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

// const DynamicHeader = dynamic(
// 	() => import("./flexible").then(({ flexible }) => flexible),
// 	{ ssr: false },
// );

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		border: 0,
	},
};
Modal.setAppElement("#__next");
export default function Home() {
	const [playing, setPlaying] = useState(false);
	const [openVideo, setOpenVideo] = useState(false);
	const [stars, setStars] = useState(null);
	useEffect(() => {
		fetch("https://api.github.com/repos/dbpunk-labs/db3")
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setStars(res.stargazers_count);
			});
	}, []);

	function paly() {
		setPlaying(true);
		setOpenVideo(true);
	}

	return (
		<>
			<Head>
				<title>DB3</title>
				<meta name='description' content='DB3' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{/* <DynamicHeader /> */}
			<div className='container-center-horizontal'>
				<div className='home-container screen'>
					<div className='header'>
						<div className='header-left'>
							<img
								className='logo'
								src='/static/img/logo@2x.png'
								alt='logo'
							/>
							<div className='build'>Build</div>
							<div className='community'>Community</div>
						</div>
						<div className='header-right'>
							<div className='group-341'></div>
							<div className='github'>Github</div>
							<div className='github-star'>
								<img
									className='icon-star'
									src='/static/img/star@2x.png'
									alt='icon-star'
								/>
								<div className='stars'>{stars}</div>
							</div>
						</div>
					</div>
					<div className='hero'>
						<div className='overlap-group10'>
							<div className='db3-desc'>
								<div className='db3-info'>
									<h1 className='db3-network-is-an-op'>
										<div className='db3-title'>
											DB3 Network
										</div>
										<p className='desc'>
											is an open source
											decentralizedalternative to
											Firestore
										</p>
									</h1>
									<p className='db3-network-is-a-dec'>
										Db3 Network is a decentralized database
										network. All nodes are operated by
										miners. Developers can directly connect
										to the network to read and write data
										without a centralized server. DB3
										Network provides a very friendly
										Firestore compatible TypeScript data
										read and write interface, developers can
										easily access, from centralized to
										decentralized smooth switch
									</p>
									<div className='header-btn'>
										<a className='overlap-group2'>
											Start Build
										</a>
										<a className='db3-btn'>Claim Gitpoap</a>
									</div>
								</div>
								<div className='db3-process' onClick={paly}>
									<img
										className='process-img'
										src='/static/img/process.png'
									/>
									<img
										className='process-img-m'
										src='/static/img/process-m.png'
									/>

									<div className='play'>
										<img
											className='polygon-1'
											src='/static/img/polygon-1@2x.png'
											alt='Polygon 1'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='overlap-group11'>
						<div className='vs-firebase'>
							<div className='group-349'>
								<p className='boost-your-decentral'>
									Boost your decentralization process as
									usaual
								</p>
								<p className='the-way-you-use-db3'>
									The way you use DB3 is just same as Firebase
								</p>
							</div>
							<div className='view-1'>
								<div className='overlap-group-2'>
									<img
										className='comparison'
										src='/static/img/comparison.png'
									/>
									<img
										className='comparison-m'
										src='/static/img/comparison-m.png'
									/>
								</div>
							</div>
							<div className='group-351'>
								<img
									className='db3-code'
									src='/static/img/db3-code.png'
								/>
								<img
									className='db3-code-m'
									src='/static/img/db3-code-m.png'
								/>
							</div>
						</div>
						<div className='group-container'>
							<div className='group-62'>
								<div className='logodb'>
									<img
										className='black-s'
										src='/static/img/black-s@2x.png'
										alt='Black-S'
									/>
								</div>
								<div className='decentralized-database decentralized inter-medium-black-16px'>
									Decentralized Database
								</div>
								<div className='save-data-on-chain inter-normal-black-14px'>
									Save data on chain
								</div>
							</div>
							<div className='group-61'>
								<div className='logojs'>
									<img
										className='vector'
										src='/static/img/vector-3@2x.png'
										alt='Vector'
									/>
								</div>
								<div className='db3js inter-medium-black-16px'>
									DB3js
								</div>
								<div className='quickly-integrate-database-access inter-normal-black-14px'>
									Quickly integrate database access
								</div>
							</div>
							<div className='group-60'>
								<div className='logodms'>
									<img
										className='regular-s'
										src='/static/img/regular-s-2@2x.png'
										alt='Regular-S'
									/>
								</div>
								<div className='dms inter-medium-black-16px'>
									DMS
								</div>
								<div className='manage-data-access inter-normal-black-14px'>
									Manage data access
								</div>
							</div>
							<div className='group-59'>
								<div className='logo-browser logo-3'>
									<img
										className='regular-s-1'
										src='/static/img/regular-s-3@2x.png'
										alt='Regular-S'
									/>
								</div>
								<div className='browser-on-chain inter-medium-black-16px'>
									Browser on Chain
								</div>
								<p className='track-data-read-and-write inter-normal-black-14px'>
									Track data read and write
								</p>
							</div>
						</div>
					</div>
					<div className='how'>
						<p className='how-to-change-d-app-structure-with-db3 inter-semi-bold-black-26px'>
							How to change dAPP structure with DB3
						</p>
						<p className='make-apps-more-decen inter-normal-black-16px'>
							Make apps more decentralised without sacrificing the
							development experience, Blockchain and Database as
							back-end service for you dApps. DB3 allow you to
							quickly build a fully decentralized application
							instead of web2.5
						</p>

						<a className='db3-btn'>View Document</a>
					</div>
					<div className='group-40'>
						<div className='vs-before'>
							<div className='overlap-title'>
								<div className='before'>Before</div>
								<p className='need-to-rely-on-a-ce'>
									Need to rely on a centralized database and
									maintain your own servers prevents the core
									data portion of the application from being
									decentralized
								</p>
							</div>
							<img src='/static/img/before.png' width={636} />
						</div>
						<div className='vs-after'>
							<div className='overlap-title'>
								<div className='after'>After</div>
								<p className='instead-of-a-central'>
									Instead of a centralized database,Use a
									decentralized database, DB3, to make your
									application more censor-resistant
								</p>
							</div>
							<img src='/static/img/after.png' width={636} />
						</div>
					</div>
					<div className='database'>
						<div className='group-347'>
							<div className='decentralized-real-time-database inter-semi-bold-black-26px'>
								Decentralized real-time database
							</div>
							<p className='db3-is-a-decentraliz inter-normal-black-16px'>
								DB3 is a decentralized database network that
								anyone can use without permission, and it is
								very easy to control their own data, real-time
								data updates and query access
							</p>
						</div>
						<div className='view-container'>
							<div className='view'>
								<div className='rectangle-178 mutable'></div>
								<div className='mutable-document inter-medium-black-20px'>
									Mutable Document
								</div>
								<p className='the-data-stored-on-t inter-normal-black-14px'>
									The data stored on the db3 network are
									dynamic structured data that can be updated
									in real time
								</p>
							</div>
							<div className='view'>
								<div className='rectangle-178 ownership'></div>
								<div className='mutable-document inter-medium-black-20px'>
									Data Ownership
								</div>
								<p className='the-data-stored-on-t inter-normal-black-14px'>
									The data stored in DB3 Network is completely
									controlled by private key signature,No third
									party has control over the data.
								</p>
							</div>
							<div className='view'>
								<div className='rectangle-178 data-code'></div>
								<div className='mutable-document inter-medium-black-20px'>
									Data Programmable
								</div>
								<p className='the-data-stored-on-t inter-normal-black-14px'>
									Deploy complex data processing logic to the
									chain in a functional manner, which can make
									the data processing process open and
									transparent
								</p>
							</div>
							<div className='view'>
								<div className='rectangle-178 fast'></div>
								<div className='mutable-document-1 inter-medium-black-20px'>
									Blazed Fast Read&amp;Wirte
								</div>
								<p className='the-data-stored-on-t inter-normal-black-14px'>
									db3 can provide high-performance data read
									and write services without losing the
									consensus security of the blockchain
								</p>
							</div>
						</div>
					</div>
					<div className='products'>
						<p className='what-we-are-building-for-you inter-semi-bold-black-26px'>
							What we are building for you
						</p>
						<div className='group-345'>
							<div className='group-343'>
								<div className='overlap-group4-2'>
									<img
										className='vector-1'
										src='/static/img/vector-1.png'
										alt='Vector 1'
									/>
									<div className='group-23'>
										<div className='logojs-1'>
											<img
												className='vector-2'
												src='/static/img/vector-2@2x.png'
												alt='Vector'
											/>
										</div>
										<div className='overlap-group1-4'>
											<div className='overlap-group-7'>
												<div className='rectangle-30'></div>
												<img
													className='rectangle-1'
													src='/static/img/rectangle-1.png'
													alt='Rectangle 1'
												/>

												<img
													className='image-10'
													src='/static/img/image-10.png'
													alt='image 10'
												/>
											</div>
											<div className='db3js-1'>DB3js</div>

											<p className='all-db3js-sd-ks-are-c inter-semi-bold-black-20px'>
												All DB3js SDKs are carefully
												designed to make developers
												lives easier
											</p>
											<div className='db3js-desc'>
												<p>
													npm one-click installation
												</p>
												<p>
													Fully compatible with
													firestore&#39;s interface,
													seamlessly migrate
												</p>
												<p>
													Interacts with db3 network
													directly , and does not
													require an intermediate
													server
												</p>
												<p>
													Flexible definition of data
													query index index
												</p>
												<p>
													CRUD the data in the front
													end directly
												</p>
												<p>
													Customize data schemas and
													create data storage
													protocols quickly
												</p>
												<p>
													Fully compatible with
													Firebase interactive
													interface
												</p>
											</div>
											<a className='db3-btn'>
												Start Building with DB3js
											</a>
										</div>
									</div>
									<div className='group-22'>
										<div className='logodms-1'>
											<img
												className='regular-s-2'
												src='/static/img/regular-s@2x.png'
												alt='Regular-S'
											/>
										</div>
										<div className='flex-col'>
											<div className='dms-1'>DMS</div>
											<p className='data-management-for-developers inter-semi-bold-black-20px'>
												Data&nbsp;&nbsp;management for
												developers
											</p>
											<div className='dms-group inter-normal-black-14px'>
												<p>
													Manage the forms you create
													on the admin platform
													visually
												</p>
												<p>
													Check the access status of
													the statistics app
												</p>
												<p>
													Manage your own defined
													on-chain functions
												</p>
												<p>
													User address authorization
													management
												</p>
											</div>
											<div className='db3-btn'>
												Try Database
											</div>
										</div>
										<div className='overlap-group2-3'>
											<div className='rectangle-32'></div>
											<img
												className='rectangle-8'
												src='/static/img/rectangle-8.png'
												alt='Rectangle 8'
											/>
											<img
												className='image-11'
												src='/static/img/image-11.png'
												alt='image 11'
											/>
										</div>
									</div>
								</div>
								<div className='group-21'>
									<div className='logo-browser-1'>
										<img
											className='regular-s-3'
											src='/static/img/regular-s-1@2x.png'
											alt='Regular-S'
										/>
									</div>
									<div className='flex-col-1 flex-col-4'>
										<div className='browser-on-chain-1'>
											Browser on Chain
										</div>
										<p className='track-the-read-and-w inter-semi-bold-black-20px'>
											Track the read and write behavior of
											each data in time
										</p>
										<div className='browser-group inter-normal-black-14px'>
											<p>
												Display the data of the whole
												network
											</p>
											<p>Dashbopard</p>
											<p>Record for block and tx</p>
											<p>Validator information</p>
										</div>
										<a className='db3-btn'>Try Browser</a>
									</div>
									<div className='overlap-group3-2'>
										<div className='rectangle-33'></div>
										<img
											className='image-7'
											src='/static/img/image-7.png'
											alt='image 7'
										/>
										<img
											className='image-12'
											src='/static/img/image-12.png'
											alt='image 12'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='multi-chain-supportable'>
						<div className='overlap-group7-1'>
							<div className='multi-chain-supportable-1'>
								Multi-Chain Supportable
							</div>
							<p className='as-a-data-storage-ne inter-normal-black-16px'>
								As a data storage network, db3 relies on
								blockchain consensus to ensure the security of
								data reading and writing without permission or
								trust. But, db3 never intends to build from
								scratch, but to stand on the shoulders of giants
								and establish an organic link with the existing
								public chain ecology. DB3 uses existing public
								chains for token management and fee settlement,
								DB3 can and plans to combine with many public
								chains
							</p>
							<div className='image-container'>
								<img
									className='file-ethereum-logo-2014-1-1'
									src='/static/img/eth.png'
									alt='FileEthereum logo 2014 1'
								/>
								<img
									className='bnb-1'
									src='/static/img/bin.png'
									alt='BNB 1'
								/>
								<img
									className='mask-group'
									src='/static/img/mask-group@2x.png'
									alt='Mask group'
								/>
								<img
									className='image-28'
									src='/static/img/pol.png'
									alt='image 28'
								/>
								<img
									className='image-30'
									src='/static/img/arb.png'
									alt='image 30'
								/>
								<img
									className='image-31'
									src='/static/img/scroll.png'
									alt='image 31'
								/>
							</div>
						</div>
					</div>
					<div className='demo'>
						<p className='what-you-can-build-with-db3 inter-semi-bold-black-26px'>
							What you can build with DB3
						</p>
						<p className='projects-developed-b inter-normal-black-16px'>
							projects developed based on DB3, including
							information management tools, social, NFT, ZK-Prove,
							etc
						</p>
						<div className='card-container'>
							<div className='card-gamefi'>
								<img src='/static/img/gamefi.png' width={294} />
								<p className='todo-list'>GameFi</p>
							</div>
							<div className='card-social'>
								<img src='/static/img/social.png' width={294} />
								<p className='decentralized-social decentralized'>
									Decentralized social networking and forums
								</p>
							</div>
							<div className='cardnft'>
								<img
									className='nft-1'
									src='/static/img/nft-1@2x.png'
									alt='NFT 1'
								/>
								<div className='dynamic-nft'>Dynamic NFT</div>
							</div>
							<div className='card-more'>
								<div className='overlap-group6-1'>
									<div className='any-data-heavy-d-app'>
										<span className='span0-3'>
											Any
											<br />
										</span>
										<span className='span1-2'>
											Data-heavy dAPP
										</span>
									</div>
								</div>
								<div className='place'>More</div>
							</div>
						</div>
						<div className='db3-btn'>
							Check more&nbsp;&nbsp;Best practice in Community
						</div>
					</div>
					<div className='footer-group'>
						<div className='footer'>
							<div className='footer-left'>
								<img
									className='logo-f'
									src='/static/img/logo-f.png'
									alt='Union'
								/>
								<div className='group-17'>
									<img
										className='icon-twitter'
										src='/static/img/icon _twitter_.png'
										alt='icon &#34;github&#34;'
									/>
									<img
										className='icon-github'
										src='/static/img/icon _github_.png'
										alt='icon &#34;github&#34;'
									/>
									<img
										className='icon-youtube'
										src='/static/img/icon _youtube_.png'
										alt='icon-youtube'
									/>
									<img
										className='icon-discord'
										src='/static/img/icon _discord_.png'
										alt='icon &#34;discord&#34;'
									/>
								</div>
							</div>
							<div className='footer-right'>
								<div className='products-decentraliz'>
									<span className='inter-bold-black-18px'>
										Products
										<br />
									</span>
									<span className='span1-3 footer-link'>
										Decentralized Database
										<br />
										DB3js
										<br />
										Database management
										<br />
										Explorer
									</span>
								</div>
								<div className='developers-documents-github'>
									<span className='inter-bold-black-18px '>
										Developers
										<br />
									</span>
									<span className='span1-1 footer-link'>
										Documents
										<br />
										github
									</span>
								</div>
								<div className='community-forum-twitter-discord inter-bold-black-18px'>
									<span className='inter-bold-black-18px'>
										Community
										<br />
									</span>
									<span className='span1-1 footer-link'>
										Forum
										<br />
										Twitter
										<br />
										Discord
									</span>
								</div>
							</div>
						</div>
						<p className='copyright-db3-team'>
							Copyright @ DB3 Team | All Rights Reserved
						</p>
					</div>
				</div>
			</div>
			<Modal
				isOpen={openVideo}
				style={customStyles}
				onRequestClose={() => setOpenVideo(false)}
				contentLabel='See how DB3 works'
			>
				<ReactPlayer
					className='play-video'
					playing={playing}
					style={{
						display: openVideo ? "block" : "none",
					}}
					url='https://www.youtube.com/watch?v=dkKo9U_KJBc'
				/>
			</Modal>
		</>
	);
}
