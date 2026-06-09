"use client";

import { Box, Container, Text } from "@mantine/core";
import {
  IconArrowsExchange,
  IconBuildingBank,
  IconCode,
  IconShieldCheck,
  IconShip,
  IconTruck,
  IconWorld,
} from "@tabler/icons-react";
import { COLORS } from "@/app/utils/COLORS";

const LEFT_CARDS = [
  { title: "API", subtitle: "Seamless system integration", icon: IconCode },
  { title: "EDI", subtitle: "Automated data exchange", icon: IconArrowsExchange },
  { title: "Customs Systems", subtitle: "Global compliance connectivity", icon: IconShieldCheck },
  { title: "Carrier Portals", subtitle: "Real-time carrier collaboration", icon: IconWorld },
];

const RIGHT_CARDS = [
  { title: "Shipping Lines", subtitle: "Direct line connectivity", icon: IconShip },
  { title: "Banks / Trade Finance", subtitle: "Secure financial workflows", icon: IconBuildingBank },
  { title: "Customs (ICEGATE)", subtitle: "Regulatory filing integration", icon: IconShieldCheck },
  { title: "Logistics Partners", subtitle: "End-to-end supply chain visibility", icon: IconTruck },
];

const PentagonPrimeImageSection = () => {
  return (
    <Container fluid px="2%" py={24} bg={COLORS.backgroundColor}>
      <Box className="pp-network-shell" mx="auto">
        <svg
          className="pp-lines"
          viewBox="0 0 1500 560"
          aria-hidden="true"
          focusable="false"
        >
          {[94, 214, 334, 454].map((y) => (
            <g key={`left-${y}`}>
              <path
                d={`M 455 ${y} C 560 ${y}, 620 280, 670 280`}
                fill="none"
                stroke="#2d8bcf"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d={`M 455 ${y} C 560 ${y}, 620 280, 670 280`}
                fill="none"
                stroke="#5ce2ff"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
          ))}
          {[94, 214, 334, 454].map((y) => (
            <g key={`right-${y}`}>
              <path
                d={`M 1045 ${y} C 940 ${y}, 880 280, 830 280`}
                fill="none"
                stroke="#2d8bcf"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d={`M 1045 ${y} C 940 ${y}, 880 280, 830 280`}
                fill="none"
                stroke="#5ce2ff"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
          ))}
        </svg>

        <Box className="pp-col pp-left">
          {LEFT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
            <Box key={card.title} className="pp-card">
              <Box className="pp-icon-wrap">
                <Icon size={30} stroke={1.7} />
              </Box>
              <Box className="pp-copy-wrap">
                <Text className="pp-card-title">{card.title}</Text>
                <Text className="pp-card-subtitle">{card.subtitle}</Text>
              </Box>
            </Box>
            );
          })}
        </Box>

        <Box className="pp-center-wrap">
          <Box className="pp-hex">
            <Text className="pp-hex-text">Pentagon Prime</Text>
          </Box>
        </Box>

        <Box className="pp-col pp-right">
          {RIGHT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
            <Box key={card.title} className="pp-card">
              <Box className="pp-icon-wrap">
                <Icon size={30} stroke={1.7} />
              </Box>
              <Box className="pp-copy-wrap">
                <Text className="pp-card-title">{card.title}</Text>
                <Text className="pp-card-subtitle">{card.subtitle}</Text>
              </Box>
            </Box>
            );
          })}
        </Box>
      </Box>

      <style>{`
        .pp-network-shell {
          position: relative;
          width: min(1500px, 92vw);
          min-height: 560px;
          border-radius: 18px;
          padding: 24px 2%;
          background: linear-gradient(180deg, #f9fcff 0%, #ffffff 100%);
          border: 1px solid rgba(14, 114, 190, 0.2);
          box-shadow: 0 16px 35px rgba(4, 42, 87, 0.08);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 20px;
          overflow: hidden;
        }

        .pp-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .pp-col {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .pp-left {
          align-items: flex-start;
        }

        .pp-right {
          align-items: flex-end;
        }

        .pp-card {
          width: min(430px, 100%);
          border-radius: 14px;
          padding: 14px 16px;
          background: linear-gradient(150deg, #011844 0%, #011236 60%, #000d2a 100%);
          border: 1px solid rgba(61, 225, 255, 0.42);
          color: #ffffff;
          display: grid;
          grid-template-columns: 70px 1fr;
          align-items: center;
          gap: 14px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          transform-origin: center;
          cursor: default;
          box-shadow: inset 0 0 0 1px rgba(9, 88, 173, 0.36);
        }

        .pp-card:hover {
          transform: scale(1.06);
          border-color: rgba(101, 233, 255, 0.75);
          box-shadow: 0 0 0 2px rgba(75, 214, 255, 0.25), 0 0 24px rgba(33, 183, 255, 0.45);
        }

        .pp-icon-wrap {
          width: 62px;
          height: 62px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2ef1ff;
          border: 1px solid rgba(61, 225, 255, 0.65);
          background: linear-gradient(145deg, rgba(4, 45, 106, 0.95) 0%, rgba(1, 27, 72, 0.96) 100%);
          box-shadow: inset 0 0 0 1px rgba(81, 244, 255, 0.2), 0 0 14px rgba(61, 225, 255, 0.2);
        }

        .pp-copy-wrap {
          min-width: 0;
        }

        .pp-card-title {
          font-size: clamp(16px, 1.12vw, 22px);
          font-weight: 700;
          line-height: 1.2;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .pp-card-subtitle {
          font-size: clamp(12px, 0.84vw, 15px);
          line-height: 1.4;
          color: rgba(233, 245, 255, 0.92);
        }

        .pp-center-wrap {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
        }

        .pp-hex {
          width: clamp(240px, 24vw, 340px);
          aspect-ratio: 1.24 / 1;
          clip-path: polygon(25% 7%, 75% 7%, 93% 50%, 75% 93%, 25% 93%, 7% 50%);
          background: radial-gradient(circle at 30% 20%, #0a2f7f 0%, #022766 38%, #01163f 100%);
          border: 2px solid rgba(120, 240, 255, 0.9);
          box-shadow:
            0 0 0 6px rgba(10, 105, 177, 0.22),
            0 0 24px rgba(29, 190, 255, 0.55),
            0 0 52px rgba(29, 190, 255, 0.38),
            inset 0 0 0 1px rgba(115, 248, 255, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          position: relative;
        }

        .pp-hex::before {
          content: "";
          position: absolute;
          inset: 12px;
          clip-path: inherit;
          border: 1px solid rgba(118, 246, 255, 0.45);
          box-shadow: 0 0 18px rgba(59, 222, 255, 0.25);
          pointer-events: none;
        }

        .pp-hex-text {
          text-align: center;
          color: #ffffff;
          font-size: clamp(30px, 3.1vw, 52px);
          font-weight: 800;
          letter-spacing: 0.01em;
          line-height: 1.1;
          text-shadow: 0 4px 14px rgba(0, 0, 0, 0.42);
        }

        @media (max-width: 1024px) {
          .pp-network-shell {
            min-height: auto;
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 18px;
          }

          .pp-lines {
            display: none;
          }

          .pp-col,
          .pp-left,
          .pp-right {
            align-items: stretch;
          }

          .pp-center-wrap {
            order: -1;
            margin-bottom: 6px;
          }

          .pp-card {
            width: 100%;
          }
        }
      `}</style>
    </Container>
  );
};

export default PentagonPrimeImageSection;
