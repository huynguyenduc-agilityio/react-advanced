import { NavLink } from './NavLink';

type TNavItemProps = {
  subTitle: string;
  url: string;
};

export const NavItem = ({ subTitle, url }: TNavItemProps) => {
  return <NavLink title={subTitle} destination={url} />;
};
