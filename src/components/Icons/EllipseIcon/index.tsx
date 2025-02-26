interface EllipseIconProps {
  color?: string;
}

export const EllipseIcon = ({ color = '#05C168' }: EllipseIconProps) => (
  <svg width="4" height="4" viewBox="0 0 4 4" fill="none">
    <circle cx="2.4375" cy="1.59375" r="1.5" fill={color} />
  </svg>
);
