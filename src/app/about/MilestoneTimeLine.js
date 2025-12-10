"use client";

import { Title, Card, Box, ActionIcon, Image } from "@mantine/core";
import React, { useEffect, useState, useRef } from "react";
import { COLORS } from "../utils/COLORS";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Images from "../utils/image";

const MilestoneTimeline = ({ milestones }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(
    milestones[0] || null
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineSvgRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const [circlePositions, setCirclePositions] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (milestones.length > 0) {
      setSelectedMilestone(milestones[0]);
      setActiveIndex(0);
    }
  }, [milestones]);

  // Draw timeline path and circles
  useEffect(() => {
    const svg = document.getElementById("timelineSvg");
    if (!svg) return;

    const path = svg.querySelector("path");
    if (!path) return;

    const pathLength = path.getTotalLength();
    const positions = [];

    while (svg.lastChild && svg.lastChild.tagName !== "path") {
      svg.removeChild(svg.lastChild);
    }

    milestones.forEach((milestone, index) => {
      const adjustedIndex = index + 1;
      const total = milestones.length + 1;
      const pos = path.getPointAtLength((pathLength / total) * adjustedIndex);
      positions.push({ x: pos.x, y: pos.y });

      const outer = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      outer.setAttribute("cx", pos.x);
      outer.setAttribute("cy", pos.y);
      outer.setAttribute("r", 10);
      outer.setAttribute(
        "stroke",
        index === activeIndex ? "#0EC9F2" : "#5F62E9"
      );
      outer.setAttribute("fill", "transparent");
      outer.setAttribute("class", `active-circle-${index}`);
      svg.appendChild(outer);

      const inner = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      inner.setAttribute("cx", pos.x);
      inner.setAttribute("cy", pos.y);
      inner.setAttribute("r", 6);
      inner.setAttribute("fill", index === activeIndex ? "#0EC9F2" : "#5F62E9");
      inner.setAttribute("class", `milestone-circle-${index}`);
      inner.style.cursor = "pointer";
      inner.addEventListener("click", () => {
        setSelectedMilestone(milestone);
        setActiveIndex(index);
      });
      svg.appendChild(inner);

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", pos.x - 25);
      text.setAttribute("y", Math.max(15, pos.y - 25));
      text.setAttribute("font-size", isMobile ? "14" : "18");
      text.setAttribute("fill", COLORS.textColor);
      text.setAttribute("font-weight", 600);
      text.style.cursor = "pointer";
      text.textContent = milestone.fields.year;
      text.addEventListener("click", () => {
        setSelectedMilestone(milestone);
        setActiveIndex(index);
      });
      svg.appendChild(text);
    });

    setCirclePositions(positions);
  }, [milestones, activeIndex, isMobile]);

  // Update active state
  useEffect(() => {
    milestones.forEach((_, index) => {
      const outer = document.querySelector(`.active-circle-${index}`);
      const inner = document.querySelector(`.milestone-circle-${index}`);

      if (outer) {
        outer.setAttribute(
          "stroke",
          index === activeIndex ? "#0EC9F2" : "#5F62E9"
        );
      }
      if (inner) {
        inner.setAttribute(
          "fill",
          index === activeIndex ? "#0EC9F2" : "#5F62E9"
        );
      }
    });

    if (isMobile && timelineContainerRef.current) {
      const activeCircle = document.querySelector(
        `.active-circle-${activeIndex}`
      );
      if (activeCircle) {
        const cx = parseFloat(activeCircle.getAttribute("cx"));
        const containerWidth = timelineContainerRef.current.clientWidth;
        const scrollTo = cx - containerWidth / 2;
        timelineContainerRef.current.scrollTo({
          left: scrollTo,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex, milestones, isMobile]);

  const handleNext = () => {
    if (activeIndex < milestones.length - 1) {
      setActiveIndex(activeIndex + 1);
      setSelectedMilestone(milestones[activeIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setSelectedMilestone(milestones[activeIndex - 1]);
    }
  };

  // --- ✅ compute card position (SVG -> container coordinates) ---
  const computeCardPosition = () => {
    const svg = timelineSvgRef.current;
    const container = timelineContainerRef.current;
    const pos = circlePositions[activeIndex];

    let cardLeft = 0;
    let cardTop = 0;

    if (!svg || !container || !pos) return { cardLeft, cardTop };

    try {
      const pt = svg.createSVGPoint();
      pt.x = pos.x;
      pt.y = pos.y;

      const screenPt = pt.matrixTransform(svg.getScreenCTM());
      const containerRect = container.getBoundingClientRect();

      cardLeft = screenPt.x - containerRect.left + container.scrollLeft;
      cardTop = screenPt.y - containerRect.top + container.scrollTop;

      const verticalGap = 10; 
      const cardHeight = 180; 
      const cardWidth = 350;

      cardTop = cardTop + verticalGap;

      const year = selectedMilestone?.fields?.year;
      if ([2022, 2023, 2024, 2025].includes(year)) {
        cardLeft = cardLeft - cardWidth - 10;
      } else {
        cardLeft = cardLeft + 10;
      }

      const maxLeft = container.scrollWidth - cardWidth - 8;
      if (cardLeft < 8) cardLeft = 8;
      if (cardLeft > maxLeft) cardLeft = maxLeft;
    } catch (e) {
      console.warn("Position calc fallback:", e);
      cardLeft = (pos?.x || 0) + 20;
      cardTop = (pos?.y || 0) + 25;
    }

    return { cardLeft, cardTop };
  };

  const { cardLeft, cardTop } = computeCardPosition();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: isMobile ? "auto" : "75vh",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={timelineContainerRef}
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          width: "100%",
          height: isMobile ? "550px" : "650px",
          paddingBottom: isMobile ? "60px" : "100px",
          position: "relative",
        }}
      >
        {/* ✅ Responsive SVG timeline */}
        <svg
          viewBox="0 -50 1240 550"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="timelineSvg"
          ref={timelineSvgRef}
          style={{
            width: "100%",
            height: "100%",
            minWidth: isMobile ? "100%" : "1200px",
            minHeight: isMobile ? "450px" : "490px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <path
            d="M1.00025 486.603L73.9988 464.689L219.499 453.606L342.999 407.606L451.499 350.606L556.999 301.106L656.499 229.106L781.499 204.106L857.499 127.606L975.499 88.6057L1076 39.1056L1193 1.10559"
            stroke="#ABABAB"
            strokeDasharray="5 5"
            strokeWidth="2"
          />
        </svg>

        {/* ✅ Desktop Detail Card */}
        {!isMobile && selectedMilestone && circlePositions[activeIndex] && (
          <Card
            shadow="sm"
            padding="md"
            radius="md"
            bg={"#e6f9fe"}
            style={{
              overflow: "visible",
              zIndex: 10,
              width: "350px",
              borderRadius: "8px",
              position: "absolute",
              transition: "all 0.3s ease",
              top: cardTop,
              left: cardLeft,
            }}
          >
            <Title size={"md"} order={3}>
              {selectedMilestone.fields.year}
            </Title>

            <div style={{ color: COLORS.textColor }}>
              {selectedMilestone.fields.description?.content.map(
                (item, index) => {
                  if (item.nodeType === "unordered-list") {
                    return (
                      <ul
                        key={index}
                        style={{ paddingLeft: "20px", margin: "10px 0" }}
                      >
                        {item.content.map((listItem, i) => {
                          const text =
                            listItem.content[0]?.content[0]?.value ||
                            "No description available";
                          return (
                            <li
                              key={`${index}-${i}`}
                              style={{
                                fontSize: "16px",
                                listStyleType: "disc",
                                marginBottom: "8px",
                              }}
                            >
                              {text}
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }
                  if (item.nodeType === "paragraph") {
                    return (
                      <p
                        key={index}
                        style={{ fontSize: "16px", marginBottom: "10px" }}
                      >
                        {item.content[0]?.value || ""}
                      </p>
                    );
                  }
                  return null;
                }
              )}
            </div>
          </Card>
        )}
      </div>

      {/* ✅ Mobile View Below Timeline */}
      {isMobile && selectedMilestone && (
        <Card
          shadow="sm"
          padding="md"
          radius="md"
          bg={"#0EC9F21A"}
          style={{
            overflow: "visible",
            width: "90%",
            marginTop: "20px",
            padding: "20px 30px",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "-30px",
              transform: "translateY(-50%)",
              backgroundColor: "transparent",
              zIndex: 10,
            }}
          >
            <ActionIcon
              variant="outline"
              radius="xl"
              size="sm"
              disabled={activeIndex === 0}
              onClick={handlePrev}
            >
              <IconChevronLeft size={20} />
            </ActionIcon>
          </div>

          <Title size={"md"} order={3}>
            {selectedMilestone.fields.year}
          </Title>

          <div style={{ color: COLORS.textColor, marginTop: "20px" }}>
            {selectedMilestone.fields.description?.content.map(
              (item, index) => {
                if (item.nodeType === "unordered-list") {
                  return (
                    <ul
                      key={index}
                      style={{ paddingLeft: "20px", margin: "10px 0" }}
                    >
                      {item.content.map((listItem, i) => {
                        const text =
                          listItem.content[0]?.content[0]?.value ||
                          "No description available";
                        return (
                          <li
                            key={`${index}-${i}`}
                            style={{
                              fontSize: "16px",
                              listStyleType: "disc",
                              marginBottom: "8px",
                            }}
                          >
                            {text}
                          </li>
                        );
                      })}
                    </ul>
                  );
                }
                if (item.nodeType === "paragraph") {
                  return (
                    <p
                      key={index}
                      style={{ fontSize: "16px", marginBottom: "10px" }}
                    >
                      {item.content[0]?.value || ""}
                    </p>
                  );
                }
                return null;
              }
            )}
          </div>

          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "-30px",
              transform: "translateY(-50%)",
              backgroundColor: "transparent",
              zIndex: 10,
            }}
          >
            <ActionIcon
              variant="outline"
              radius="xl"
              size="sm"
              disabled={activeIndex === milestones.length - 1}
              onClick={handleNext}
            >
              <IconChevronRight size={20} />
            </ActionIcon>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MilestoneTimeline;
