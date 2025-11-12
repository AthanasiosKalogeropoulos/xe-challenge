import React, { useEffect, useState } from "react";
import {
  Card,
  List,
  message,
  Empty,
  Popconfirm,
  Button,
  Space,
  Typography,
  Tag,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "../api";
import EditAdModal from "./EditAdModal";

const { Text, Title } = Typography;

export default function AdsList() {
  const [ads, setAds] = useState([]);
  const [editAd, setEditAd] = useState(null);

  const fetchAds = async () => {
    try {
      const res = await api.get("/api/ads");
      setAds(res.data);
    } catch {
      message.error("Αποτυχία φόρτωσης αγγελιών");
    }
  };

  const deleteAd = async (id) => {
    try {
      await api.delete(`/api/ads/${id}`);
      message.success("Η αγγελία διαγράφηκε");
      fetchAds();
    } catch {
      message.error("Αποτυχία διαγραφής");
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div style={{ marginTop: 32 }}>
      {ads.length === 0 ? (
        <Empty
          description="Δεν υπάρχουν αγγελίες"
          style={{ padding: "80px 0" }}
        />
      ) : (
        <List
          grid={{
            gutter: 24,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 2,
          }}
          dataSource={ads}
          renderItem={(ad) => (
            <List.Item style={{ width: "100%" }}>
              <Card
                hoverable
                style={{
                  width: "100% !important",
                  height: 250, // σταθερό ύψος για όλα τα cards
                  borderRadius: 14,
                  border: "none",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(0,0,0,0.06)")
                }
                title={
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#1f1f1f",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {ad.title}
                    <Tag color="#f5a623">
                      {ad.price ? `${ad.price} €` : "Χωρίς τιμή"}
                    </Tag>
                  </div>
                }
                actions={[
                  <Button
                    type="text"
                    key="edit"
                    icon={<EditOutlined />}
                    onClick={() => setEditAd(ad)}
                    style={{ color: "#f5a623" }}
                  >
                    Επεξεργασία
                  </Button>,
                  <Popconfirm
                    title="Διαγραφή Αγγελίας"
                    description="Είσαι σίγουρος ότι θέλεις να τη διαγράψεις;"
                    onConfirm={() => deleteAd(ad.id)}
                    okText="Ναι"
                    cancelText="Όχι"
                  >
                    <Button type="text" danger icon={<DeleteOutlined />}>
                      Διαγραφή
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <div style={{ flexGrow: 1, overflow: "hidden" }}>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: 14,
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ad.description || "(Χωρίς περιγραφή)"}
                  </Text>

                  <div style={{ marginTop: 8 }}>
                    <Text strong style={{ color: "#1f1f1f" }}>
                      Περιοχή:
                    </Text>{" "}
                    <Text>{ad.place_main_text || "-"}</Text>
                  </div>

                  {ad.place_secondary_text && (
                    <Text
                      type="secondary"
                      style={{
                        fontSize: 13,
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {ad.place_secondary_text}
                    </Text>
                  )}
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
      {editAd && (
        <EditAdModal
          open={!!editAd}
          onClose={() => setEditAd(null)}
          ad={editAd}
          onUpdated={fetchAds}
        />
      )}
    </div>
  );
}
