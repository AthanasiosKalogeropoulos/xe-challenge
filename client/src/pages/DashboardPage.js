import React, { useEffect, useState } from "react";
import { Layout, Button, message, Row, Col, Typography, Tooltip } from "antd";
import { PlusOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AdsList from "../components/AdsList";
import CreateAdModal from "../components/CreateAdModal";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await api.get("/api/me");
      setUser(res.data);
    } catch {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return null;

  const logout = () => {
    localStorage.removeItem("token");
    message.info("Αποσυνδέθηκες");
    navigate("/login");
  };

  const handleCreated = () => window.location.reload();

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#fffefb",
      }}
    >
      <Header
        style={{
          backgroundColor: "#f5a623",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <Title level={3} style={{ color: "white", margin: 0 }}>
          Καλώς ήρθες, {user.fullName}
        </Title>
        <div style={{ display: "flex", gap: 12 }}>
          <Tooltip title="Δημιουργία Αγγελίας">
            <Button
              icon={<PlusOutlined />}
              onClick={() => setModalOpen(true)}
              style={{
                backgroundColor: "white",
                color: "#f5a623",
                fontWeight: "bold",
              }}
            >
              Νέα Αγγελία
            </Button>
          </Tooltip>
          <Tooltip title="Αποσύνδεση">
            <Button
              icon={<LogoutOutlined />}
              onClick={logout}
              danger
              style={{ background: "white" }}
            >
              Έξοδος
            </Button>
          </Tooltip>
        </div>
      </Header>

      <Content
        style={{ padding: "32px 24px", maxWidth: 1200, margin: "0 auto" }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <AdsList />
          </Col>
        </Row>
      </Content>

      <CreateAdModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleCreated}
      />
    </Layout>
  );
}
