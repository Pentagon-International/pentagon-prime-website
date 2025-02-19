import { COLORS } from '@/app/utils/COLORS';
import Images from '@/app/utils/image';

export const styles = {
  heroContainer: {
    backgroundImage: `url(${Images.hero})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    top: 0,
    left: 0,
  },
  overlayContainer: {
    position: 'relative',
    width: '100%',
    height: 'auto',
  },
  overlayImage: {
    position: 'absolute',
    top: '-50px',
    left: '75%',
    transform: 'translateX(-50%)',
    width: '50%',
    objectFit: 'cover',
    zIndex: 1,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  title: {
    textTransform: 'uppercase',
    position: 'relative',
    zIndex: 3,
    maxWidth: 900,
    textWrap: 'balance'
  },
  text: {
    position: 'relative',
    zIndex: 3,
    maxWidth: 500,
    textWrap: 'balance'
  },
  transportOptions: {
    padding: '15px',
    border: `1px solid ${COLORS.portColor}`,
    borderRadius: '15px',
    backgroundColor: COLORS.portColor,
    width: 'fit-content',
    borderRadius: '0 15px 15px 15px',
  },
  actionButton: {
    backgroundColor: COLORS.secondaryColor,
    borderColor: COLORS.secondaryColor,
  },
  groupstyle: {
    backgroundColor: COLORS.secondaryColor,
    padding: '8px',
    borderRadius: '10px',
  },
};
