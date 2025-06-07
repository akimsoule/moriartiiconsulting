"use client";
import React from "react";
import Link from "next/link";

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  className = "",
  children,
  ...rest
}) => {

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
};

export default CustomLink;
