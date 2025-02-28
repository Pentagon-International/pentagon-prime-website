import { COLORS } from "./COLORS";

const styles = {
  "$": COLORS.serviceColor,
  "#": COLORS.portColor,
  "%": COLORS.vision,
  "@": COLORS.primaryColor
};

export const highlightText = (text) => {
  return text
    ?.split(/(\$[^$]+\$|#[^#]+#|%[^%]+%|@[^@]+@)/g) // Split special character blocks
    ?.map((part, index) => {
      const match = part?.match(/^(\$|#|%|@)(.+)\1$/); // Check if it's inside special characters

      if (match) {
        const char = match[1]; // Extract special character
        const content = match[2]; // Extract text inside special characters

        return (
          <span key={index} style={{
            color: styles[char],
          }}>
            {content?.split(/(<br\s*\/?>)/gi).map((seg, i) =>
              /<br\s*\/?>/i.test(seg) ? <br key={`${index}-${i}`} /> : seg
            )}
          </span >
        );
      }

      // Process normal text and replace <br/> with JSX <br />
      return part?.split(/(<br\s*\/?>)/gi).map((seg, i) =>
        /<br\s*\/?>/i.test(seg) ? <br key={`${index}-${i}`} /> : seg
      );
    });
};



