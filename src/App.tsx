import { useState } from 'react'
import { Layout, Spin } from 'antd'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import GeneratorAccount from './components/GeneratorAccount.component'
import NamespaceList from './components/NamespaceList.component'
import CreateNamespace from './components/CreateNamespace.component'
import NamespaceDetail from './components/NamespaceDetail.component'

import './App.scss'

const { Header, Content, Footer } = Layout

function App() {
    return (
        <Layout className="layout" style={{ height: '100%' }}>
            <Header className="header">
                <div className="logo">DB3</div>
            </Header>
            <Content className="container">
                <Router>
                    <Routes>
                        <Route path="/" element={<GeneratorAccount />}></Route>
                        <Route path="/namespace" element={<NamespaceList />}></Route>
                        <Route path="/namespace/post" element={<CreateNamespace />}></Route>
                        <Route path="/namespace/:name" element={<NamespaceDetail />}></Route>
                    </Routes>
                </Router>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>合约地址</Footer> */}
        </Layout>
    )
}

export default App
