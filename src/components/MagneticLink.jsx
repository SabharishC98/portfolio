import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Trionn-style magnetic element.
 * The element shifts toward the cursor within its bounding box.
 * 
 * Props:
 *  - children: content inside
 *  - className: class string
 *  - strength: how far it shifts (default 0.35)
 *  - as: element type ('a', 'button', 'div', etc.)
 *  - ...rest: forwarded to the outer element (href, onClick, etc.)
 */
const MagneticLink = ({
  children,
  className = '',
  strength = 0.35,
  as: Tag = 'div',
  ...rest
}) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
      className={`magnetic-wrap ${className}`}
      style={{ display: 'inline-block' }}
    >
      {typeof Tag === 'string' ? (
        <Tag {...rest}>{children}</Tag>
      ) : (
        <Tag {...rest}>{children}</Tag>
      )}
    </motion.div>
  );
};

export default MagneticLink;
