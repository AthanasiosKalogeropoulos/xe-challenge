import React, { useState, useMemo } from "react";
import { Form, Input, AutoComplete, Button, InputNumber, message } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";

const { TextArea } = Input;

export default function PropertyForm() {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null); // will store full object with placeId
  // debounced search - useMemo to avoid recreation each render
  const fetchAreas = useMemo(
    () =>
      debounce(async (value) => {
        if (!value || value.length < 3) {
          setOptions([]);
          return;
        }
        setLoading(true);
        try {
          const res = await axios.get("/api/areas", {
            params: { input: value },
          });
          // map to AutoComplete options: value should be display string but we will attach placeId in data
          const opts = res.data.map((item) => ({
            value: `${item.mainText} ${
              item.secondaryText ? ` - ${item.secondaryText}` : ""
            }`,
            label: (
              <div>
                <div style={{ fontWeight: 600 }}>{item.mainText}</div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {item.secondaryText}
                </div>
              </div>
            ),
            item, // attach original
          }));
          setOptions(opts);
        } catch (err) {
          console.error(err);
          message.error("Σφάλμα στο autocomplete");
        } finally {
          setLoading(false);
        }
      }, 350),
    []
  );

  const onSelect = (value, option) => {
    // option.item contains original object with placeId
    setSelectedPlace(option.item);
  };

  const onFinish = async (values) => {
    if (!selectedPlace) {
      message.error("Παρακαλώ επίλεξε περιοχή από τις προτάσεις.");
      return;
    }
    const payload = {
      ...values,
      place_id: selectedPlace.placeId,
      place_main_text: selectedPlace.mainText,
      place_secondary_text: selectedPlace.secondaryText,
    };
    try {
      const res = await axios.post("/api/ads", payload);
      message.success("Η αγγελία αποθηκεύτηκε!");
      form.resetFields();
      console.log("saved", res.data);
    } catch (err) {
      console.error(err);
      message.error("Σφάλμα κατά την αποθήκευση");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Τίτλος"
        rules={[{ required: true, message: "Παρακαλώ εισάγετε τίτλο" }]}
      >
        <Input placeholder="Π.χ. Διαμέρισμα στο κέντρο της Αθήνας" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Περιγραφή"
        rules={[{ required: true, message: "Παρακαλώ εισάγετε περιγραφή" }]}
      >
        <TextArea rows={4} placeholder="Περιγράψτε το ακίνητο..." />
      </Form.Item>

      <Form.Item
        name="price"
        label="Τιμή"
        rules={[{ required: true, message: "Παρακαλώ εισάγετε τιμή" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="π.χ. 120000"
          min={0}
          step={1000}
        />
      </Form.Item>

      <Form.Item
        label="Περιοχή"
        rules={[{ required: true, message: "Παρακαλώ εισάγετε τοποθεσία" }]}
      >
        <AutoComplete
          options={options}
          onSearch={fetchAreas}
          onSelect={onSelect}
          notFoundContent={loading ? "Φόρτωση..." : "Δεν βρέθηκαν αποτελέσματα"}
          placeholder="Πληκτρολόγησε τουλάχιστον 3 χαρακτήρες"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Δημιούργησε Αγγελία
        </Button>
      </Form.Item>
    </Form>
  );
}
