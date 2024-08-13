"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";

const generateBreadcrumbs = (pathname: string) => {
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const displayName = segment.charAt(0).toUpperCase() + segment.slice(1);

    return { href, displayName };
  });
};

const Breadcrumb = () => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  if (pathname === "/") {
    return null;
  }

  return (
    <Breadcrumbs className="py-4">
      <BreadcrumbItem key={1000}>
        <Link href="/">Home</Link>
      </BreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem key={index}>
          <Link href={breadcrumb.href}>{breadcrumb.displayName}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
