import type { ReactNode } from "react";
export function SectionWrapper({ children, id }: { children: ReactNode; id?: string }) {
 return <section id={id} className="container-taalem py-8 md:py-12">{children}</section>;
}
