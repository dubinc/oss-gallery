import { cn } from "@dub/utils";
import { cva } from "class-variance-authority";
import { RouteType } from "next/dist/lib/load-custom-routes";
import Link, { LinkProps } from "next/link";

export const buttonLinkVariants = cva(
  "flex items-center space-x-1 rounded-lg border text-sm px-2 py-1 transition-all hover:ring-4 hover:ring-gray-200",
  {
    variants: {
      variant: {
        primary: "border-black bg-black text-white hover:bg-gray-800",
        secondary:
          "border-gray-200 bg-white hover:border-gray-600 hover:text-gray-800 text-gray-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonLinkProps extends LinkProps<RouteType> {
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
}

export default function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      target={href.toString().startsWith("http") ? "_blank" : undefined}
      className={cn(buttonLinkVariants({ variant, className }))}
      {...props}
    >
      {children}
    </Link>
  );
}
