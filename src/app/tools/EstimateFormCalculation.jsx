import {
  Accordion,
  ActionIcon,
  Button,
  Card,
  Flex,
  Grid,
  GridCol,
  Loader,
  Popover,
  Select,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import React, { useEffect, useMemo } from "react";
import classes from "./EstimateForm.module.css";
import { COLORS } from '../utils/COLORS';
import useEstimationStore from "./estimationStore";
import { useCallback } from "react";
import { currencyFormat } from "./currencyFormat";
import { useQuery } from "@tanstack/react-query";
import { apiCallProtected } from "../api/api";
import { useShallow } from 'zustand/react/shallow'


const taxPercents = [
  {
    label: "",
    value: "0",
  },
  {
    label: "5",
    value: "5",
  },
  {
    label: "12",
    value: "12",
  },
  {
    label: "18",
    value: "18",
  },
];

function calculatePricing(
  containerList,
  chargesList,
  options = {},
  frightData
  //setforex
) {
  const chargeListCharge_name = chargesList
    ?.filter((item) => item.charge_type === "Freight Charge")
    .map((item) => item.charge_name);

  const filteredFrightData = frightData?.filter(
    (frightItem) =>
      chargeListCharge_name.includes(frightItem.charge_name) &&
      frightItem.charge_type === "Freight Charge"
  );

  //let forexUpdated = false;

  // const countValue = containerList
  //   ?.flatMap((item) => item.fields)
  //   .find(
  //     (field) => field.label === "Count" || field.label === "Container Count"
  //   )?.value;
  const countValue = containerList.reduce((acc, item) => {
    const count = item.fields.find((f) => f.label === "Count")?.value || 0;
    if (acc[item.size]) {
      acc[item.size].count += count;
    } else {
      acc[item.size] = { count: count };
    }

    return acc;
  }, {});

  chargesList.forEach((chargeItem) => {
    const matchingFrightItem = filteredFrightData.find(
      (frightItem) => frightItem.charge_name === chargeItem.charge_name
    );
    if (matchingFrightItem) {
      chargeItem.currency_amount = matchingFrightItem.amount;
    }
  });

  const { isCalculated = false, amountChanged = false } = options;

  let modifiedChargesList = [];
  let sizeTotals = {};
  let sizeAverages = {};

  containerList?.forEach((item) => {
    const size = item?.size;
    const sizeColumn = `s${size.toLowerCase()}`;
    const totalCount =
      item?.fields?.find(
        (field) => field.label === "Count" || field.label === "Container Count"
      ) || {};

    const result = Object.values(
      chargesList.reduce((acc, curr) => {
        // Create a unique key combining id and size
        const key = `${curr.id}_${curr.size}`;
        if (!acc[key]) {
          acc[key] = { ...curr };
        } else {
          acc[key].count += curr.count;
        }
        return acc;
      }, {})
    );
    const sizeCharges = result
      ?.filter((c) => {
        if (isCalculated) {
          return c.size === size;
        }
        return true;
      })
      .map((chargeItem) => {
        const matchingFrightData = filteredFrightData?.find(
          (freightItem) => freightItem.charge_name === chargeItem.charge_name
        );

        const unitPrice = matchingFrightData
          ? parseFloat(matchingFrightData.sell)
          : chargeItem[sizeColumn] !== undefined
            ? parseInt(chargeItem[sizeColumn])
            : 0;

        let units = parseInt(totalCount.value);
        if (chargeItem.amount_upto_container_count) {
          units = Math.ceil(units / chargeItem.amount_upto_container_count);
        }

        if (chargeItem.count !== undefined) {
          units = chargeItem.count;
        }

        let total_amount = unitPrice * units;

        if (
          chargeItem.charge_unit === "Per Contr" ||
          chargeItem.charge_unit === "Per Container" ||
          chargeItem.charge_unit === "per container"
        ) {
          if (matchingFrightData) {
            total_amount =
              units *
              parseFloat(matchingFrightData.sell) *
              matchingFrightData.amount;

            // if (typeof setforex === "function") {
            //   setforex((prevState) => ({
            //     ...prevState,
            //     currency: matchingFrightData?.name,
            //     amount: matchingFrightData?.sell,
            //   }));
            // }

            // forexUpdated = true;
          }
        } else if (
          chargeItem.charge_unit === "Per B/L" ||
          chargeItem.charge_unit === "Per DO"
        ) {
          units = chargeItem.count || 1;
          total_amount = units * unitPrice;
        }

        if (amountChanged && chargeItem.total_amount !== undefined) {
          total_amount = chargeItem.total_amount;
        }

        if (!sizeTotals[size]) {
          sizeTotals[size] = { totalAmount: 0 };
        }
        sizeTotals[size].totalAmount += total_amount;

        if (!sizeAverages[size]) {
          sizeAverages[size] = { unitprice: 0 };
        }
        sizeAverages[size].unitprice += unitPrice;

        return {
          ...chargeItem,
          count: units || "",
          size,
          unit_price: unitPrice,
          total_amount,
        };
      });

    modifiedChargesList = modifiedChargesList.concat(sizeCharges);
  });

  return {
    modifiedChargesList: modifiedChargesList.map((item) => ({
      ...item,
      total_amount: item.total_amount || 0,
    })),
    sizeAverages,
  };
}

function AccordionControl({ actionCallback, list, data, disabled, ...props }) {
  return (
    <Flex dir="row" align="center" bg={COLORS.white}>
      <Accordion.Control {...props} />

      {disabled ? null : (
        <Popover width={200} trapFocus position="left" withArrow shadow="md">
          <Popover.Target>
            <Button
              w={120}
              size="compact-xs"
              variant="subtle"
              onClick={actionCallback}
              leftSection={<IconPlus size={14} />}
            >
              Add
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Select
              size="xs"
              clearable
              searchable
              name={"selectedCharge"}
              label={
                <Text size="xs" fw={600} c={"gray"}>
                  Choose Charge Type
                </Text>
              }
              data={list || []}
              // value={selectedItem?.value}
              onChange={(_, option) => {
                // setSelectedItem(option);
                actionCallback(option);
              }}
            />
          </Popover.Dropdown>
        </Popover>
      )}
    </Flex>
  );
}

export const SummarySection = ({ accordion, includeTax, avarageAmount, disabled, quoteData, chargesList, chargesMasterList, gstIncluded, setAvarageAmount, loading }) => {
  // console.log("Avg amt:", avarageAmount);

  const estimateStore = useEstimationStore(
    useShallow((st) => ({
      list: st.list,
      summary: st.summary,
      totalAmount: st.totalAmount,
      saveSummary: st.saveSummary,
      resetData: st.resetData,
    }))
  );

  const totalCharges = useMemo(
    () =>
      estimateStore?.list?.reduce((temp, charge) => {
        const taxPercent = charge?.tax || 0;
        if (!temp[taxPercent]) {
          temp[taxPercent] = {
            list: [],
            total_amount: 0,
            tax_percent: taxPercent,
          };
        }
        temp[taxPercent]?.list?.push(charge);
        temp[taxPercent].total_amount += parseInt(charge?.total_amount);
        return temp;
      }, {}),
    [estimateStore?.list]
  );

  // const totalCharges = useMemo(
  //   () =>
  //     estimateStore?.list?.reduce((temp, charge) => {
  //       const taxPercent = charge?.tax || 0;
  //       const size = charge?.size || "default"; // Assuming size is part of charge

  //       if (!temp[size]) {
  //         temp[size] = {}; // Initialize size group
  //       }

  //       if (!temp[size][taxPercent]) {
  //         temp[size][taxPercent] = {
  //           list: [],
  //           total_amount: 0,
  //           tax_percent: taxPercent,
  //         };
  //       }

  //       temp[size][taxPercent]?.list?.push(charge);
  //       temp[size][taxPercent].total_amount +=
  //         parseInt(charge?.total_amount) || 0;

  //       return temp;
  //     }, {}),
  //   [estimateStore?.list]
  // );

  useEffect(() => {
    const taxKeys = Object?.keys(totalCharges);
    if (taxKeys?.length) {
      const estimationSummary = {
        total_amount: 0,
        total_with_tax: 0,
        tax: [],
      };
      taxKeys?.forEach((key) => {
        estimationSummary.total_amount += totalCharges[key]?.total_amount;
        if (key !== "0") {
          const taxAmount =
            (totalCharges[key]?.total_amount *
              parseInt(totalCharges[key]?.tax_percent)) /
            100;
          estimationSummary.tax.push({
            tax_percent: key,
            tax_amount: taxAmount,
          });
          estimationSummary.total_with_tax +=
            estimationSummary.total_amount + taxAmount;
        } else {
          estimationSummary.total_with_tax += estimationSummary.total_amount;
        }
      });
      estimateStore.saveSummary(estimationSummary);
    }
    //}, [totalCharges, avarageAmount]);
  }, [totalCharges, avarageAmount]);

  return (
    <Card shadow="sm" padding="lg" radius="md"  style={{ backgroundColor: COLORS.contactBackground }} ta={'center'}>
      <Grid>
        <Grid.Col>
          <EstimateFormCalculation
            quoteData={quoteData}
            chargesList={chargesList}
            chargesMasterList={chargesMasterList}
            gstIncluded={gstIncluded}
            accordion={accordion}
            setAvarageAmount={setAvarageAmount}
            loading={loading}
          />
        </Grid.Col>
        <Grid.Col>
          <Table withRowBorders={false}>
            <Table.Tbody>
              {includeTax && (
                <>
                  <Table.Tr>
                    <Table.Td align="right" px={4}>
                      <Text c={COLORS.primaryColor} size="sm" w={'100%'}>
                        Sub Total
                      </Text>
                    </Table.Td>
                    <Table.Td align="right" w={120} px={4}>
                      <TextInput
                        readOnly
                        value={currencyFormat(
                          parseInt(estimateStore.summary?.total_amount) || 0
                        )}
                        leftSection={<Text size="xs">₹</Text>}
                        styles={{ input: { textAlign: "right" } }}
                      />
                    </Table.Td>
                    <Table.Td px={4} w={30}></Table.Td>
                  </Table.Tr>
                  {estimateStore.summary?.tax?.map((item, i) => (
                    <Table.Tr key={i}>
                      <Table.Td align="right" px={4}>
                        <Text size="xs" fw={600}>
                          GST {item?.tax_percent}%
                        </Text>
                      </Table.Td>
                      <Table.Td align="right" w={120} px={4}>
                        <TextInput
                          size="xs"
                          readOnly
                          value={currencyFormat(parseInt(item?.tax_amount || 0))}
                          leftSection={<Text size="xs">₹</Text>}
                          styles={{ input: { textAlign: "right" } }}
                        />
                      </Table.Td>
                      <Table.Td px={4} w={30}></Table.Td>
                    </Table.Tr>
                  ))}
                  {/* <Table.Tr>
              <Table.Td align="right" px={4}>
                <Text size="xs" fw={600}>
                  GST Total
                </Text>
              </Table.Td>
              <Table.Td align="right" w={120} px={4}>
                <TextInput
                  size="xs"
                  readOnly
                  value={currencyFormat(
                    parseInt(estimateStore.summary?.tax_amount) || 0
                  )}
                  leftSection={<Text size="xs">₹</Text>}
                  styles={{ input: { textAlign: "right" } }}
                />
              </Table.Td>
              <Table.Td px={4} w={30}></Table.Td>
            </Table.Tr> */}
                </>
              )}
              <Table.Tr>
                <Table.Td align="right" px={4}>
                  <Text c={COLORS.primaryColor} size="sm" w={'100%'}>
                    Total Amount
                  </Text>
                </Table.Td>
                <Table.Td align="right" w={120} px={4}>
                  <TextInput
                    // size="xs"
                    readOnly
                    disabled={disabled}
                    value={
                      !accordion
                        ? 0
                        : currencyFormat(
                          parseInt(
                            includeTax
                              ? estimateStore.summary?.total_with_tax
                              : estimateStore.summary?.total_amount
                          ) || 0
                        )
                    }
                    leftSection={<Text size="xs">₹</Text>}
                    styles={{ input: { textAlign: "right" } }}
                  />
                </Table.Td>
                <Table.Td px={4} w={30}></Table.Td>
              </Table.Tr>
              {avarageAmount &&
                typeof avarageAmount === "object" &&
                !Array.isArray(avarageAmount) &&
                Object.entries(avarageAmount).map(([size, amount]) => (
                  <Table.Tr key={size}>
                    <Table.Td align="right" px={4}>
                      <Text size="xs" fw={600}>
                        Per Container Charges for {size}
                      </Text>
                    </Table.Td>
                    <Table.Td align="right" w={120} px={4}>
                      <TextInput
                        size="xs"
                        disabled={disabled}
                        leftSection={<Text size="xs">₹</Text>}
                        //value={!accordion ? currencyFormat(amount || 0) : currencyFormat(0)}
                        value={
                          !accordion
                            ? 0
                            : currencyFormat(parseFloat(amount.unitprice) || 0)
                        }
                        readOnly
                        styles={{ input: { textAlign: "right" } }}
                      />
                    </Table.Td>
                  </Table.Tr>
                ))}
            </Table.Tbody>
          </Table>
        </Grid.Col>
      </Grid>
    </Card>

  );
};

const ChargesTable = ({
  size,
  includeTax,
  chargesMasterList,
  containerList,
  frightData,
  totalCount,
  disabled,
}) => {
  const estimateStore = useEstimationStore((st) => ({
    list: st.list,
    saveList: st.saveList,
  }));

  const list = estimateStore?.list?.filter((charge) => {
    return charge.size === size;
  });

  const handleChargeListChange = (id, field, val) => {
    const itemIndex = estimateStore?.list?.findIndex((charge) => {
      return charge.id === id && charge.size == size;
    });
    if (itemIndex < 0) {
      return;
    }
    const d = [...estimateStore?.list];

    d[itemIndex][field] = val === "" ? "" : val;

    const result = calculatePricing(
      containerList,
      d,
      {
        isCalculated: true,
        amountChanged: field === "total_amount",
      },
      frightData?.data
    );

    const summedData = Object.values(
      result?.modifiedChargesList?.reduce((acc, curr) => {
        // Create a unique key combining id and size
        const key = `${curr.id}_${curr.size}`;
        if (!acc[key]) {
          acc[key] = { ...curr };
        } else {
          acc[key].count += curr.count;
        }
        return acc;
      }, {})
    );
    estimateStore.saveList(summedData);
  };

  const handleDelete = useCallback(
    (id) => {
      const remainingItems = estimateStore?.list?.filter((charge) => {
        return `${charge.id}_${charge.size}` !== `${id}_${size}`;
        // return (charge.id !== id && charge.size != size);
      });
      estimateStore.saveList(remainingItems);
    },
    [estimateStore?.list]
  );

  useEffect(() => {
    if (containerList && estimateStore?.list && frightData?.data) {
      const result = calculatePricing(
        containerList,
        estimateStore.list,
        { isCalculated: true },
        frightData.data
      );

      const summedData = Object.values(
        result?.modifiedChargesList?.reduce((acc, currentItem) => {
          const { id, count, ...rest } = currentItem;
          if (acc[id]) {
            acc[id].count += count;
          } else {
            acc[id] = { id, count, ...rest };
          }
          return acc;
        }, {})
      );

      estimateStore.saveList(summedData);
    }
  }, []);

  // REMOVE DUPLICATE ID

  const uniqueList = list.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (!existingItem) {
      acc.push(item);
    }
    return acc;
  }, []);

  return (
    <Table>
      <Table.Tbody>
        {uniqueList?.length === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={5} align="center">
              <Title size="md">No Carrier charge data</Title>
            </Table.Td>
          </Table.Tr>
        ) : (
          uniqueList?.map((item) => {
            const sameData = frightData?.data?.find(
              (charge) =>
                charge.charge_type === "Freight Charge" &&
                charge.charge_name === item.charge_name
            );

            return (
              <Table.Tr key={item?.id}>
                <Table.Td>
                  <Text size="xs">{item?.charge_name}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="xs">
                    {`₹ ${currencyFormat(item?.unit_price || 0)} / ${item?.charge_unit
                      }`}
                  </Text>
                </Table.Td>
                <Table.Td px={4} w={68}>
                  <TextInput
                    size="xs"
                    // ta={"center"}
                    w={60}
                    type="number"
                    disabled={disabled}
                    min={0}
                    max={9999}
                    value={parseInt(item?.count) || ""}
                    styles={{ input: { textAlign: "center" } }}
                    onChange={(e) => {
                      handleChargeListChange(
                        item?.id,
                        "count",
                        Number(e?.target?.value)
                      );
                    }}
                  />
                </Table.Td>
                {includeTax && (
                  <Table.Td px={4} w={72}>
                    <Select
                      size="xs"
                      data={taxPercents || []}
                      flex={1}
                      clearable
                      allowDeselect={false}
                      // defaultValue={taxPercents[0].value}
                      value={String(item?.tax)}
                      onChange={(val, opt) =>
                        handleChargeListChange(item?.id, "tax", parseInt(val))
                      }
                    />
                  </Table.Td>
                )}
                <Table.Td align="right" w={120} px={4}>
                  <TextInput
                    size="xs"
                    disabled={disabled}
                    value={currencyFormat(parseInt(item?.total_amount) || 0)}
                    leftSection={<Text size="xs">₹</Text>}
                    styles={{ input: { textAlign: "right" } }}
                    onChange={(e) => {
                      handleChargeListChange(
                        item?.id,
                        "total_amount",
                        Number(e?.target.value?.replace(/,/g, ""))
                      );
                    }}
                  />
                </Table.Td>
                <Table.Td align="right" px={4} w={30} valign="bottom">
                  <ActionIcon
                    color="red"
                    variant="light"
                    // size={"xs"}
                    onClick={() => {
                      handleDelete(item?.id);
                    }}
                  >
                    <IconTrash size={18} stroke={1.5} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            );
          })
        )}
      </Table.Tbody>
    </Table>
  );
};

export const EstimateFormCalculation = ({
  estimationId,
  quoteData,
  chargesList,
  chargesMasterList,
  gstIncluded,
  disabled,
  accordion,
  // setforex,
  setAvarageAmount,
  loading,
}) => {
  const estimateCallback = useEstimationStore((st) => ({
    list: st.list,
    saveList: st.saveList,
    saveSummary: st.saveSummary,
    reset: st.resetData,
  }));

  const { data: frightData = [] } = useQuery({
    queryKey: ["chargeTable"],
    queryFn: () => apiCallProtected.get("/master/estimate/chargeTable"),
    refetchOnWindowFocus: false,
  });

  const quotationData = quoteData?.container_details?.list
    ? quoteData?.container_details?.list
    : quoteData?.list;

  useEffect(() => {
    // debugger;
    if (
      quotationData &&
      chargesList?.length &&
      frightData?.data?.data?.length > 0
    ) {
      const updateChargesList = chargesList?.map((item) => {
        return {
          ...item,
          currency_amount: 0,
        };
      });

      let data = calculatePricing(
        quotationData,
        updateChargesList,
        {},
        frightData?.data?.data
        // setforex
      );

      estimateCallback.saveList(data.modifiedChargesList);
      setAvarageAmount(data.sizeAverages);
    }
  }, [
    quoteData,
    chargesList,
    frightData,
    setAvarageAmount,
    accordion,
    quotationData,
  ]);

  return (
    <Grid>
      <GridCol bg={COLORS.contactBackground} style={{ borderRadius: 8 }} c={'white'} h={'50vh'}>
        <Table withRowBorders={false}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th px={4} py={0}>
                <Text size="sm" fw={600}>
                  Charges
                </Text>
              </Table.Th>
              <Table.Th px={4} py={0} w={62}>
                <Text size="sm" fw={600}>
                  Units
                </Text>
              </Table.Th>
              {gstIncluded && (
                <Table.Th px={4} py={0} w={68}>
                  <Text size="sm" fw={600}>
                    Tax %
                  </Text>
                </Table.Th>
              )}
              <Table.Th px={4} py={0} w={120}>
                <Text size="sm" fw={600}>
                  Price
                </Text>
              </Table.Th>
              <Table.Th px={4} py={0} w={30}></Table.Th>
            </Table.Tr>
          </Table.Thead>
        </Table>

        {quotationData?.map((item) => {
          const size = item?.size;
          const totalCount =
            item?.fields?.find(
              (field) =>
                field.label === "Count" || field.label === "Container Count"
            ) || {};

          return (
            <Accordion
              key={size}
              chevron={<IconPlus size={12} />}
              chevronPosition="left"
              classNames={classes}
            >
              <Accordion.Item value={`item-${size}`}>
                <AccordionControl
                  data={item}
                  list={chargesMasterList?.map((item) => ({
                    ...item,
                    label: item.charge_name,
                    value: item.charge_name,
                  }))}
                  actionCallback={(selectedChargeItem) => {
                    estimateCallback.saveList([
                      ...estimateCallback.list,
                      {
                        ...selectedChargeItem,
                        size: item?.size,
                        count: totalCount?.value,
                        total_amount:
                          parseInt(totalCount?.value || 0) *
                          parseInt(
                            selectedChargeItem?.[`s${size.toLowerCase()}`] || 0
                          ),
                      },
                    ]);
                  }}
                >
                  {item?.size} x {totalCount?.value}
                </AccordionControl>

                <Accordion.Panel>
                  {loading ? (
                    <Loader size={"lg"} color={COLORS.primaryColor} />
                  ) : accordion ? (
                    <ChargesTable
                      size={size}
                      chargesMasterList={chargesMasterList}
                      containerList={quotationData}
                      includeTax={gstIncluded}
                      frightData={frightData?.data}
                      accordion={accordion}
                      totalCount={totalCount?.value}
                      disabled={disabled}
                    />
                  ) : null}
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          );
        })}

        {/* <Modal opened={opened} onClose={close} title="Add Charges">
        
      </Modal> */}
      </GridCol>
    </Grid>
  );
};
