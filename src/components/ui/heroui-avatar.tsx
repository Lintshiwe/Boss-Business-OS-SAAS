"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

type AvatarSize = "sm" | "md" | "lg";
type AvatarColor = "default" | "accent" | "success" | "warning" | "danger";
type AvatarVariant = "default" | "soft";

type AvatarContextValue = {
  color: AvatarColor;
  size: AvatarSize;
  variant: AvatarVariant;
};

const AvatarContext = React.createContext<AvatarContextValue>({
  color: "default",
  size: "md",
  variant: "default",
});

const colorClassMap: Record<AvatarColor, string> = {
  default: "text-gray-600",
  accent: "text-sky-700",
  success: "text-sky-600",
  warning: "text-gray-600",
  danger: "text-red-700",
};

const softColorClassMap: Record<AvatarColor, string> = {
  default: "bg-gray-100 text-gray-700",
  accent: "bg-sky-100 text-sky-700",
  success: "bg-sky-50 text-sky-600",
  warning: "bg-gray-100 text-gray-600",
  danger: "bg-red-100 text-red-700",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface AvatarRootProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>, "color"> {
  color?: AvatarColor;
  size?: AvatarSize;
  variant?: AvatarVariant;
}

function AvatarRoot({
  children,
  className,
  color = "default",
  size = "md",
  variant = "soft",
  ...props
}: AvatarRootProps) {
  return (
    <AvatarContext.Provider value={{ color, size, variant }}>
      <AvatarPrimitive.Root
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden",
          size === "sm" && "size-8 rounded-full",
          size === "md" && "size-10 rounded-full",
          size === "lg" && "size-12 rounded-full",
          variant === "soft" && softColorClassMap[color],
          variant === "default" && "bg-gray-100",
          className,
        )}
        {...props}
      >
        {children}
      </AvatarPrimitive.Root>
    </AvatarContext.Provider>
  );
}

interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {}

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      className={cn(
        "absolute inset-0 aspect-square size-full object-cover opacity-100 transition-opacity duration-200 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

interface AvatarFallbackProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>, "color"> {
  color?: AvatarColor;
}

function AvatarFallback({ className, color, ...props }: AvatarFallbackProps) {
  const context = React.useContext(AvatarContext);
  const resolvedColor = color ?? context.color;

  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex size-full items-center justify-center text-sm font-medium",
        context.size === "lg" && "text-base",
        context.variant === "soft"
          ? softColorClassMap[resolvedColor]
          : colorClassMap[resolvedColor],
        className,
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export { Avatar, AvatarRoot, AvatarImage, AvatarFallback };
export type { AvatarRootProps, AvatarImageProps, AvatarFallbackProps };
