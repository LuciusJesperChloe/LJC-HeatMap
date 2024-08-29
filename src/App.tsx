import React from "react";
import "./App.css";
import RcegPage from "./pages/rceg/RcegPage";

import {
  HeatMapOutlined,
  HomeFilled,
  InteractionOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import GenLJCHMap from "./pages/genLJCHMap/GenLJCHMap";
import InterpLJCHMap from "./pages/interpLJCHMap/InterpLJCHMap";
import FooterContent from "./components/FooterContent";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
// import Calculations from "./pages/calculations/Calculations";
// import Reserchers from "./pages/reserchers/Reserchers";

const { Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = React.useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  document.title = "LJC Heatmap";

  const items: MenuProps["items"] = [
    {
      key: "home",
      icon: <HeatMapOutlined />,
      label: <Link to="/">Granger Causality</Link>,
    },
    // {
    //   key: "gljch",
    //   icon: <HeatMapOutlined />,
    //   label: <Link to="/generating-LJC-eatmaps">Generating LJC Heatmaps</Link>,
    // },
    // {
    //   key: "interpreting-ljc-heat-map",
    //   icon: <InteractionOutlined />,
    //   label: (
    //     <Link to="/interpreting-ljc-heat-map">Interpreting LJC Heatmap</Link>
    //   ),
    // },
  ];

  return (
    <BrowserRouter>
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
              {/* <BrowserRouter basename="/"> */}
              <Routes>
                <Route path="/" element={<RcegPage />} />
                <Route
                  path="/generating-LJC-eatmaps"
                  element={<GenLJCHMap />}
                />
                <Route
                  path="/interpreting-ljc-heat-map"
                  element={<InterpLJCHMap />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              {/* </BrowserRouter> */}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              backgroundColor: "#3A3A3A",
              color: "#FFFFFF",
            }}
          >
            <FooterContent />
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
