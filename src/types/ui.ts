export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  id?: string;
  className?: string;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaPressed?: boolean;
  dataTestid?: string;
}

export interface IconButtonProps extends ButtonProps {
  iconLeft?: string;
  iconRight?: string;
}

export interface InputProps {
  modelValue?: string | number;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  id?: string;
  className?: string;
  ariaLabel?: string;
  ariaDescribedby?: string;
  ariaInvalid?: boolean;
  dataTestid?: string;
  autocomplete?: string;
}
