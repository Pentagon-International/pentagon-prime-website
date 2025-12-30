/**
 * Centralized Typography System
 * 
 * This file defines all font sizes used across the website.
 * Use these constants instead of hardcoded values for easy maintenance.
 * 
 * Usage:
 * - In JS/JSX: import { TYPOGRAPHY } from '@/app/utils/TYPOGRAPHY';
 *   Then use: fontSize: TYPOGRAPHY.body.normal
 * - In CSS: Use CSS variables like var(--fs-body-normal)
 */

export const TYPOGRAPHY = {
  // Headings
  h1: {
    mobile: '32px',
    desktop: '48px',
  },
  h2: {
    mobile: '28px',
    desktop: '40px',
  },
  h3: {
    mobile: '24px',
    desktop: '34px',
  },
  h4: {
    mobile: '20px',
    desktop: '28px',
  },
  h5: {
    mobile: '18px',
    desktop: '24px',
  },
  h6: {
    mobile: '16px',
    desktop: '20px',
  },

  // Body text
  body: {
    large: '18px',
    normal: '16px',
    small: '14px',
    xsmall: '12px',
  },

  // Captions and helper text
  caption: {
    large: '15px',
    normal: '14px',
    small: '12px',
  },

  // Buttons
  button: {
    large: '16px',
    normal: '14px',
    small: '12px',
  },

  // Labels
  label: {
    large: '16px',
    normal: '14px',
    small: '12px',
  },

  // Inputs
  input: {
    large: '18px',
    normal: '16px',
    small: '14px',
  },

  // Special sizes (for specific use cases)
  special: {
    hero: {
      mobile: '32px',
      desktop: '48px',
    },
    sectionTitle: {
      mobile: '20px',
      desktop: '28px',
    },
  },
};

/**
 * Get responsive font size
 * @param {string} sizeKey - Key from TYPOGRAPHY object (e.g., 'h1', 'body.normal')
 * @param {boolean} isMobile - Whether to return mobile or desktop size
 * @returns {string} Font size value
 */
export const getFontSize = (sizeKey, isMobile = false) => {
  const keys = sizeKey.split('.');
  let value = TYPOGRAPHY;
  
  for (const key of keys) {
    value = value[key];
    if (!value) {
      console.warn(`Typography key "${sizeKey}" not found`);
      return '16px'; // fallback
    }
  }
  
  // If the value is an object with mobile/desktop, return appropriate one
  if (typeof value === 'object' && (value.mobile || value.desktop)) {
    return isMobile ? value.mobile : value.desktop;
  }
  
  // Otherwise return the value directly
  return value;
};

