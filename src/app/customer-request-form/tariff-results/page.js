"use client";

import { Box, Button, Flex, Table, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useCustomerRequestStore from "../../store/customerRequestStore";
import useTransportStore from "@/app/store/transportStore";
import getEmojiFlag from "@/app/utils/isoMap";

/* CbmCalc-style design */
const panelStyle = {
  background: "rgba(255,255,255,0.12)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: "22px",
  border: "1px solid rgba(255,255,255,.2)",
  boxShadow: "0 5px 5px rgba(0,0,0,.45)",
  overflow: "hidden",
  color: "#fff",
};
const contentStyle = { padding: "16px 32px" };

export default function TariffResultsPage() {
  const router = useRouter();
  const { seaPortMap, airPortMap } = useTransportStore();
  const { tariffResult, clearTariffResult } = useCustomerRequestStore();

  useEffect(() => {
    if (!tariffResult?.data?.length) {
      router.replace("/customer-request-form");
      return;
    }
  }, [tariffResult, router]);

  const handleBackToForm = () => {
    clearTariffResult();
    router.push("/customer-request-form");
  };

  const handleGoHome = () => {
    clearTariffResult();
    router.push("/");
  };

  if (!tariffResult?.data?.length) {
    return null;
  }

  const data = tariffResult.data;

  return (
    <Box
      component="div"
      style={{
        minHeight: "100vh",
        background:
          'linear-gradient(rgba(8,20,50,.55),rgba(8,20,50,.85)), url("https://images.unsplash.com/photo-1670121180583-39ab653a071c?w=1920")',
        backgroundSize: "cover",
        backgroundPosition: "top",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 40px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Box
        style={{
          width: "100%",
          maxWidth: "1400px",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        {/* <Flex mb="md" mt={70} justify="space-between" align="center">
          <Text
            component="h1"
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            Tariff charges
          </Text>
        </Flex> */}

        <Box mt={70} style={{ ...panelStyle, flex:1 }}>
          <Box style={contentStyle}>
            <Text
              component="h2"
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Tariff charges
            </Text>
            <Text
              size="sm"
              style={{
                marginTop: "2px",
                color: "rgba(255,255,255,.85)",
                fontSize: "12px",
              }}
            >
              The following tariff(s) match your route and service. Review the
              charges below.
            </Text>

            {data.map((item, index) => (
              <Box key={item.tariff_id ?? index} mb="xl" mt="lg">
                <Text
                  component="h3"
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {item.tariff_code}
                </Text>
                <Box
                  style={{
                    marginTop: "2px",
                    color: "rgba(255,255,255,.85)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {
                      <img
                        src={`https://flagcdn.com/${getEmojiFlag(seaPortMap[item.origin_code]?.country)}.svg`}
                        alt=""
                        style={{ width: 20 }}
                      />
                    }
                    <Text style={{ fontSize: "13px" }}>
                      {item.origin_name} ({item.origin_code})
                    </Text>
                  </Box>{" "}
                  <Text style={{ fontSize: "13px" }}>→ </Text>
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {
                      <img
                        src={`https://flagcdn.com/${getEmojiFlag(seaPortMap[item.destination_code]?.country)}.svg`}
                        alt=""
                        style={{ width: 20 }}
                      />
                    }
                    <Text style={{ fontSize: "13px" }}>
                      {item.destination_name} ({item.destination_code})
                    </Text>
                  </Box>
                </Box>
                <Text
                  style={{
                    marginTop: "2px",
                    color: "rgba(255,255,255,.75)",
                    fontSize: "12px",
                  }}
                >
                  Service -{" "}
                  <span style={{ fontWeight: 600 }}>{item.service}</span>
                </Text>
                <Text
                  style={{
                    marginTop: "2px",
                    color: "rgba(255,255,255,.75)",
                    fontSize: "12px",
                  }}
                >
                  Valid -{" "}
                  <span style={{ fontWeight: 600 }}>
                    {item.valid_from} to {item.valid_to}
                  </span>
                </Text>

                {item.tariff_charges?.length > 0 ? (
                  <Box
                    component="table"
                    style={{
                      width: "100%",
                      marginTop: "12px",
                      borderCollapse: "collapse",
                      fontSize: "14px",
                      color: "#fff",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 12px",
                            fontWeight: 600,
                            fontSize: "13px",
                            color: "rgba(255,255,255,.9)",
                            borderBottom: "1px solid rgba(255,255,255,.2)",
                          }}
                        >
                          Charge
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 12px",
                            fontWeight: 600,
                            fontSize: "13px",
                            color: "rgba(255,255,255,.9)",
                            borderBottom: "1px solid rgba(255,255,255,.2)",
                          }}
                        >
                          Unit
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 12px",
                            fontWeight: 600,
                            fontSize: "13px",
                            color: "rgba(255,255,255,.9)",
                            borderBottom: "1px solid rgba(255,255,255,.2)",
                          }}
                        >
                          Rate &#8377;
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 12px",
                            fontWeight: 600,
                            fontSize: "13px",
                            color: "rgba(255,255,255,.9)",
                            borderBottom: "1px solid rgba(255,255,255,.2)",
                          }}
                        >
                          Minimum
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 12px",
                            fontWeight: 600,
                            fontSize: "13px",
                            color: "rgba(255,255,255,.9)",
                            borderBottom: "1px solid rgba(255,255,255,.2)",
                          }}
                        >
                          Currency
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 12px",
                            fontWeight: 600,
                            fontSize: "13px",
                            maxWidth:"200px",
                            color: "rgba(255,255,255,.9)",
                            borderBottom: "1px solid rgba(255,255,255,.2)",
                          }}
                        >
                          Carrier
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.tariff_charges.map((charge, i) => (
                        <tr
                          key={i}
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,.1)",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 12px",
                              fontSize: "14px",
                              color: "rgba(255,255,255,.9)",
                            }}
                          >
                            {charge.charge_name}
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              fontSize: "14px",
                              color: "rgba(255,255,255,.9)",
                            }}
                          >
                            {charge.unit ?? "—"}
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              fontSize: "14px",
                              color: "rgba(255,255,255,.9)",
                            }}
                          >
                            {charge.rate ?? "—"}
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              fontSize: "14px",
                              color: "rgba(255,255,255,.9)",
                            }}
                          >
                            {charge.minimum ?? "—"}
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              fontSize: "14px",
                              color: "rgba(255,255,255,.9)",
                            }}
                          >
                            {charge.currency_code ?? "—"}
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              fontSize: "14px",
                              maxWidth:"200px",
                              color: "rgba(255,255,255,.9)",
                            }}
                          >
                            {charge.carrier_name}
                            {charge.carrier_code
                              ? ` (${charge.carrier_code})`
                              : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Box>
                ) : (
                  <Text
                    style={{
                      marginTop: "12px",
                      fontSize: "14px",
                      color: "rgba(255,255,255,.75)",
                    }}
                  >
                    No charges listed for this tariff.
                  </Text>
                )}
              </Box>
            ))}

            <Box
              mt="xl"
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                paddingTop: "8px",
              }}
            >
              <Button
                variant="filled"
                radius="md"
                size="md"
                onClick={handleBackToForm}
                styles={{
                  root: {
                    background: "linear-gradient(135deg,#00d2ff,#005bea)",
                    border: "none",
                  },
                  label: { fontSize: "14px", color: "#fff" },
                }}
              >
                Back to form
              </Button>
              <Button
                variant="default"
                radius="md"
                size="md"
                onClick={handleGoHome}
                styles={{
                  root: {
                    background: "rgba(255,255,255,.15)",
                    border: "1px solid rgba(255,255,255,.3)",
                    color: "#fff",
                  },
                  label: { fontSize: "14px" },
                }}
              >
                Go home
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
