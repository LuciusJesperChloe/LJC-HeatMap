import React from "react";
import "./App.css";
import RcegPage from "./pages/rceg/RcegPage";

import {
  HeatMapOutlined,
  CalculatorOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calculations from "./pages/calculations/Calculations";
import Reserchers from "./pages/reserchers/Reserchers";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Interpreting LJC Heatmap", "1", <HeatMapOutlined />),
  getItem("Calculations", "2", <CalculatorOutlined />),
  getItem("Researchers", "3", <UserOutlined />),
];

function App() {
  const [collapsed, setCollapsed] = React.useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // return <RcegPage />;
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#1E1E1E" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: "#1E1E1E" }}
        theme="dark"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ backgroundColor: "#1E1E1E" }}
        />
      </Sider>
      <Layout
        style={{ backgroundColor: "#1E1E1E", borderLeft: "solid 1px gray" }}
      >
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "0 16px", backgroundColor: "#1E1E1E" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>LLC Heat MAP</Breadcrumb.Item>
            <Breadcrumb.Item>Generate</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              backgroundColor: "#1E1E1E",
            }}
          >
            <BrowserRouter basename="/">
              <Routes>
                <Route path="/" element={<RcegPage />} />
                <Route path="/calculations" element={<Calculations />} />
                <Route path="/reserchers" element={<Reserchers />} />
              </Routes>
            </BrowserRouter>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#3A3A3A",
            color: "#FFFFFF",
          }}
        >
          Heat MAP Generator ©{new Date().getFullYear()} Created by ~Lucius J
          Chloe
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
