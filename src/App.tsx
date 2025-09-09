import React, { createContext, useState } from "react";

import { HeatMapOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigProvider, Layout, Menu, theme } from "antd";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import GenLJCHMap from "./pages/genLJCHMap/GenLJCHMap";
import RcegPage2 from "./pages/rceg/RcegPage2";
import InterpLJCHMap from "./pages/interpLJCHMap/InterpLJCHMap";
import FooterContent from "./components/FooterContent";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Tvte, {
  TColorChangePorps,
} from "./pages/time-varying-transfer-entropy/Tvte";
import "./App.css";
import { LJCDataContext } from "./context/LJCDataContext";
import {
  T_AVG_DATA_SET_MAP,
  T_sectionColors,
} from "./pages/time-varying-transfer-entropy/useCSVData";
import Resources from "./pages/Resources/Resources";
import Researche from "./pages/Research/Researche";

const { Content, Footer, Sider } = Layout;

// type TVTEContextType = {
//   colorSettings: TColorChangePorps[];
//   setColorSettings: React.Dispatch<React.SetStateAction<TColorChangePorps[]>>;
//   variableNames: {
//     var1: string;
//     var2: string;
//   };
//   setVariableNames: React.Dispatch<
//     React.SetStateAction<{
//       var1: string;
//       var2: string;
//     }>
//   >;
// };

// export const LJCDataContext = createContext<{
//   tvte: TVTEContextType;
// }>({
//   tvte: {
//     colorSettings: [],
//     setColorSettings: () => {},
//     variableNames: {
//       var1: "",
//       var2: "",
//     },
//     setVariableNames: () => {},
//   },
// });

const detaultTVTEColorSettings = [
  {
    index: 0,
    pvalMin: 0.01,
    pvalMax: 0.0,
    TE_Min: 1.0,
    TE_Max: 0.6666,
    hexColor: "#BC0000",
  },
  {
    index: 1,
    pvalMin: 0.01,
    pvalMax: 0.0,
    TE_Min: 0.6666, // parseFloat((2 / 3).toFixed(4)),
    TE_Max: 0.3333,
    hexColor: "#DA0000",
  },
  {
    index: 2,
    pvalMin: 0.01,
    pvalMax: 0.0,
    TE_Min: 0.3333,
    TE_Max: 0.0,
    hexColor: "#F60000",
  },
  {
    index: 3,
    pvalMin: 0.05,
    pvalMax: 0.01,
    TE_Min: 1.0,
    TE_Max: 0.6666,
    hexColor: "#F26A0E",
  },
  {
    index: 4,
    pvalMin: 0.05,
    pvalMax: 0.01,
    TE_Min: 0.6666,
    TE_Max: 0.3333,
    hexColor: "#FF9933",
  },
  {
    index: 5,
    pvalMin: 0.05,
    pvalMax: 0.01,
    TE_Min: 0.3333,
    TE_Max: 0.0,
    hexColor: "#FFC000",
  },
  {
    index: 6,
    pvalMin: 0.1,
    pvalMax: 0.05,
    TE_Min: 1.0,
    TE_Max: 0.6666,
    hexColor: "#D7D200",
  },
  {
    index: 7,
    pvalMin: 0.1,
    pvalMax: 0.05,
    TE_Min: 0.6666,
    TE_Max: 0.3333,
    hexColor: "#FAF400",
  },
  {
    index: 8,
    pvalMin: 0.1,
    pvalMax: 0.05,
    TE_Min: 0.3333,
    TE_Max: 0.0,
    hexColor: "#FFFF00",
  },
  {
    index: 9,
    pvalMin: 0.2,
    pvalMax: 0.1,
    TE_Min: 1.0,
    TE_Max: 0.6666,
    hexColor: "#009A46",
  },
  {
    index: 10,
    pvalMin: 0.2,
    pvalMax: 0.1,
    TE_Min: 0.6666,
    TE_Max: 0.3333,
    hexColor: "#00B050",
  },
  {
    index: 11,
    pvalMin: 0.2,
    pvalMax: 0.1,
    TE_Min: 0.3333,
    TE_Max: 0.0,
    hexColor: "#00C85A",
  },
  {
    index: 12,
    pvalMin: 1,
    pvalMax: 0.2,
    TE_Min: 0.6666,
    TE_Max: 1.0,
    hexColor: "#0400B7",
  },
  {
    index: 13,
    pvalMin: 1,
    pvalMax: 0.2,
    TE_Min: 0.3333,
    TE_Max: 1.0,
    hexColor: "#0400B7",
  },
  {
    index: 14,
    pvalMin: 1,
    pvalMax: 0.2,
    TE_Min: 0.3333,
    TE_Max: 0.0,
    hexColor: "#0400B7",
  },
];

function App() {
  const [collapsed, setCollapsed] = React.useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  document.title = "LJC Heatmap";

  const [colorSettings, setColorSettings] = useState<TColorChangePorps[]>(
    detaultTVTEColorSettings
  );
  const [variableNames, setVariableNames] = useState<{
    var1: string;
    var2: string;
  }>({
    var1: "X",
    var2: "Y",
  });

  const [startYearFreq, setStartYearFreq] = useState(0);
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);
  const [tvteExcelRawData, setTvteExcelRawData] = useState<string[][]>([]);
  const [tvteWindowsSizes, setTvteWindowsSizes] = useState<number[]>([]);
  const [sectionColors, setSectionColors] = useState<T_sectionColors>({});
  const [unitRootAcceptanceRate, setUnitRootAcceptanceRate] =
    useState<number>(0.1);

  const setColorCondtionsDefault = () => {
    setColorSettings(detaultTVTEColorSettings);
    setUnitRootAcceptanceRate(0.1);
    setVariableNames({
      var1: "X",
      var2: "Y",
    });
  };

  const defaultContextValue = {
    tvte: {
      colorSettings,
      setColorSettings,
      variableNames,
      setVariableNames,
      setColorCondtionsDefault,
      tvteExcelRawData,
      tvteWindowsSizes,
      setTvteExcelRawData,
      setTvteWindowsSizes,
      sectionColors,
      setSectionColors,
      unitRootAcceptanceRate,
      setUnitRootAcceptanceRate,
      startYearFreq,
      setStartYearFreq,
      startYear,
      setStartYear,
      endYear,
      setEndYear,
    },
  };

  const items: MenuProps["items"] = [
    {
      key: "home",
      icon: <HeatMapOutlined />,
      label: <Link to="/granger-causality-heatmap">Granger Causality</Link>,
    },
    {
      key: "teh",
      icon: <HeatMapOutlined />,
      label: (
        <Link to="/transfer-entropy-heatmap">Transfer Entropy Heatmap</Link>
      ),
    },
    // {
    //   key: "gljch",
    //   icon: <HeatMapOutlined />,
    //   label: <Link to="/g2">Map 2</Link>,
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
          // onCollapse={(value) => setCollapsed(value)}

          trigger={null} // hide default trigger
          onMouseEnter={() => setCollapsed(false)} // expand on hover
          onMouseLeave={() => setCollapsed(true)} // collapse when mouse leaves
          style={{ backgroundColor: "#1E1E1E" }}
          theme="dark"
        >
          <div className="demo-logo-vertical" />
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  darkItemBg: "#2C2C2C",
                  darkItemSelectedBg: "#2C2C2C",
                  darkItemHoverBg: "#2C2C2C",
                },
              },
            }}
          >
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
              style={{ backgroundColor: "#1E1E1E" }}
            />
          </ConfigProvider>
        </Sider>
        <Layout
          style={{ backgroundColor: "#1E1E1E", borderLeft: "solid 1px gray" }}
        >
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: "0 16px", backgroundColor: "#1E1E1E" }}>
            <LJCDataContext.Provider value={defaultContextValue}>
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
                  {/* <Route path="/" element={<RcegPage />} /> */}
                  <Route
                    path="/generating-LJC-eatmaps"
                    element={<GenLJCHMap />}
                  />
                  <Route
                    path="/granger-causality-heatmap"
                    element={<RcegPage2 />}
                  />
                  <Route
                    path="/interpreting-ljc-heat-map"
                    element={<InterpLJCHMap />}
                  />
                  <Route path="/transfer-entropy-heatmap" element={<Tvte />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/research" element={<Researche />} />
                  <Route path="/resources" element={<Resources />} />
                </Routes>
                {/* </BrowserRouter> */}
              </div>
            </LJCDataContext.Provider>
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
