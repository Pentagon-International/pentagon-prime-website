'use client';

import { Title, Card, Image } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../utils/COLORS';
import Images from '../utils/image';

const MilestoneTimeline = ({ milestones }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(
    milestones[0] || null
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const svg = document.getElementById('timelineSvg');
    const path = svg.querySelector('path');
    const pathLength = path.getTotalLength();

    milestones.forEach((milestone, index) => {
      const adjustedIndex = index + 1;
      const totalMilestones = milestones.length + 1;
      const position = path.getPointAtLength(
        (pathLength / totalMilestones) * adjustedIndex
      );

      // Active background circle
      const activeCircle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      activeCircle.setAttribute('cx', position.x);
      activeCircle.setAttribute('cy', position.y);
      activeCircle.setAttribute('r', 10);
      activeCircle.setAttribute(
        'stroke',
        index === activeIndex ? '#0EC9F2' : '#5F62E9'
      );
      activeCircle.setAttribute('fill', 'transparent');
      activeCircle.setAttribute('class', `active-circle-${index}`);
      svg.appendChild(activeCircle);

      // Main milestone circle
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      circle.setAttribute('cx', position.x);
      circle.setAttribute('cy', position.y);
      circle.setAttribute('r', 6);
      circle.setAttribute(
        'fill',
        index === activeIndex ? '#0EC9F2' : '#5F62E9'
      );
      circle.style.cursor = 'pointer';
      circle.addEventListener('click', () => {
        setSelectedMilestone(milestone);
        setActiveIndex(index);
      });
      svg.appendChild(circle);

      // Milestone title
      const yearText = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      yearText.setAttribute('x', position.x - 10);
      yearText.setAttribute('y', position.y - 30);
      yearText.setAttribute('font-size', '24');
      yearText.setAttribute('fill', COLORS.textColor);
      yearText.setAttribute('font-weight', 600);
      yearText.setAttribute('dominant-baseline', 'middle');
      yearText.setAttribute('text-anchor', 'start');
      yearText.textContent = milestone.fields.year;
      yearText.style.cursor = 'pointer';
      yearText.addEventListener('click', () => {
        setSelectedMilestone(milestone);
        setActiveIndex(index);
      });
      svg.appendChild(yearText);
    });
  }, [milestones, activeIndex]);

  useEffect(() => {
    // Update active circle border and color
    milestones.forEach((_, index) => {
      const activeCircle = document.querySelector(`.active-circle-${index}`);
      if (activeCircle) {
        activeCircle.setAttribute(
          'stroke',
          index === activeIndex ? '#0EC9F2' : '#5F62E9'
        );
      }
      const circle = document.querySelector(
        `.active-circle-${index}`
      ).nextSibling;
      if (circle) {
        circle.setAttribute(
          'fill',
          index === activeIndex ? '#0EC9F2' : '#5F62E9'
        );
      }
    });
  }, [activeIndex, milestones]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        width="1194"
        height="488"
        viewBox="0 0 1194 488"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="timelineSvg"
      >
        <path
          d="M1.00025 486.603L73.9988 464.689L219.499 453.606L342.999 407.606L451.499 350.606L556.999 301.106L656.499 229.106L781.499 204.106L857.499 127.606L975.499 88.6057L1076 39.1056L1193 1.10559"
          stroke="#ABABAB"
          strokeDasharray="5 5"
        />
      </svg>
      {selectedMilestone && (
        <Card
          shadow="sm"
          padding="md"
          radius="md"
          bg={'#0EC9F21A'}
          style={{
            position: 'absolute',
            top: 280,
            right: 20,
            padding: '20px 30px',
            width: '40%',
            marginTop: '10px',
            borderRadius: '8px',
          }}
        >
          <Title size={'md'} order={3}>{selectedMilestone.fields.year}</Title>
          <ul style={{ color: COLORS.textColor, marginTop: '20px' }}>
            {selectedMilestone.fields.description?.content.map(
              (item, index) => {
                if (item.nodeType === 'unordered-list') {
                  return (
                    <ul key={index}>
                      {item.content.map((listItem, i) => {
                        const text =
                          listItem.content[0]?.content[0]?.value ||
                          'No description available';
                        return <li style={{ fontSize: '16px' }} key={`${index}-${i}`}>{text}</li>;
                      })}
                    </ul>
                  );
                }
                return null;
              }
            )}
          </ul>
        </Card>
      )}

      <Image
        src={Images.arrow}
        w={20}
        h={20}
        alt="arrow"
        style={{ position: 'absolute', top: 265, right: -10 }}
      />
    </div>
  );
};

export default MilestoneTimeline;
