export interface AppHeaderAction {
  href: string;
  label: string;
}

export interface AppHeaderProps {
  title: string;
  count?: number;
  countSuffix?: string;
  action?: AppHeaderAction;
}
