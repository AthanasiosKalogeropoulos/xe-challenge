import {
  Form,
  Input,
  Button,
  Card,
  message,
  Alert,
  Flex,
  Typography,
} from "antd";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();
  const [errors422, setErrors422] = useState([]);
  const [error400, setError400] = useState(false);

  const hasError = (property) =>
    errors422.some((item) => item.field === property);

  const getErrorMsg = (property) =>
    errors422.find((item) => item.field === property)?.message || "";

  const onFinish = async (values) => {
    setErrors422([]);
    setError400(false);
    try {
      const res = await api.post("/api/login", values);
      localStorage.setItem("token", res.data.token);
      message.success("Καλώς ήρθες!");
      navigate("/dashboard");
    } catch (error) {
      switch (error.status) {
        case 422:
          setErrors422(error.response.data.errors);
          break;
        case 400:
          setError400(true);
          break;
        default:
          message.warning("Κάτι πήγε στραβά");
          break;
      }
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff8e1 0%, #f5a62322 100%)",
        padding: 16,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          border: "none",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ color: "#f5a623", marginBottom: 4 }}>
            Καλώς ήρθες!
          </Title>
          <Text type="secondary">Συνδέσου για να συνεχίσεις</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label={<strong>Email</strong>}
            validateStatus={hasError("email") ? "error" : ""}
            help={getErrorMsg("email")}
          >
            <Input
              size="large"
              placeholder="π.χ. user@xe.gr"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<strong>Κωδικός</strong>}
            validateStatus={hasError("password") ? "error" : ""}
            help={getErrorMsg("password")}
          >
            <Input.Password
              size="large"
              placeholder="********"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          {error400 && (
            <Form.Item>
              <Alert message="Λάθος στοιχεία σύνδεσης" type="error" showIcon />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{
                borderRadius: 10,
                backgroundColor: "#f5a623",
                border: "none",
              }}
            >
              Σύνδεση
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}
