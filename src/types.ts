export interface User {
    id: number;
    name: string;
    email: string;
    logo : string
  }
  
  export interface ChipInputProps {
    users: User[];
  }
  
  export interface ChipProps {
    label: string;
    logo: string;
    onRemove: () => void;
    isHighlighted?: boolean;
  }
  