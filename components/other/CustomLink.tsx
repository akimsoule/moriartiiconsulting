"use client";
import React from "react";
import Link from "next/link";

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
  
  // force refresh on link click
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("/")) {
      e.preventDefault();
      window.location.href = href; // Force a full page reload
    }
  };


  return (
    <Link href={href} className={className} {...rest} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default CustomLink;
