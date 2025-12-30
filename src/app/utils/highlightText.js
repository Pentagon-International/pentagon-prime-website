import { COLORS } from "./COLORS";
import { theme } from "./theme";

const styles = {
  "$": COLORS.serviceColor,
  "#": COLORS.portColor,
  "%": COLORS.vision,
  "@": COLORS.primaryColor,
  "!": theme.fontSizes.md,
  "*": "bold",
};

export const highlightText = (text) => {
  return text
    ?.split(/(\$[^$]+\$|#[^#]+#|%[^%]+%|@[^@]+@|![^!]+!|\*[^*]+\*)/g)    // Handle '!' as well
    ?.map((part, index) => {
      const match = part?.match(/^(\$|#|%|@|!|\*)(.+)\1$/); // Match wrapped content

      if (match) {
        const char = match[1]; // Extract special character
        const content = match[2]; // Extract text inside special characters

        // If '!', apply only fontSize but process content for nested % coloring
        if (char === "!") {
          return (
            <span key={index} style={{ fontSize: styles["!"] }}>
              {highlightText(content)} {/* Recursive call to handle nested % */}
            </span>
          );
        }
        if (char === "*") {
          return (
            <span key={index} style={{ fontWeight: styles["*"], color: "#0a0a0a"  }}>
              {highlightText(content)} {/* Recursive call to handle nested % */}
            </span>
          );
        }
        return (
          <span key={index} style={{ color: styles[char] }}>
            {content?.split(/(<br\s*\/?>)/gi).map((seg, i) =>
              /<br\s*\/?>/i.test(seg) ? <br key={`${index}-${i}`} /> : seg
            )}
          </span>
        );
      }

      // Process normal text and replace <br/> with JSX <br />
      return part?.split(/(<br\s*\/?>)/gi).map((seg, i) =>
        /<br\s*\/?>/i.test(seg) ? <br key={`${index}-${i}`} /> : seg
      );
    });
};



