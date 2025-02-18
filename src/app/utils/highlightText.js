import {COLORS} from './COLORS';

export const highlightText = (text) => {
  return text.split(/(\$[^$]+\$)/g).map((part, index) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      return (
        <span key={index} style={{color: COLORS.serviceColor}}>
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
};
