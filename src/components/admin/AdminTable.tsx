import type { ReactNode } from "react";

/**
 * Shared admin table primitives. Compose them like a normal table — they bake
 * in the standardized chrome (card-panel wrapper, neutral uppercase header,
 * border separators, cell padding, row hover, numeric alignment) so every
 * admin list looks identical.
 *
 *   <AdminTable minWidth="min-w-[640px]">
 *     <AdminThead>
 *       <AdminTh>Name</AdminTh>
 *       <AdminTh align="right">Total</AdminTh>
 *     </AdminThead>
 *     <AdminTbody>
 *       {rows.length === 0 ? (
 *         <AdminTableEmpty colSpan={2}>No rows.</AdminTableEmpty>
 *       ) : rows.map((r) => (
 *         <AdminTr key={r.id}>
 *           <AdminTd className="font-medium text-neutral-900">{r.name}</AdminTd>
 *           <AdminTd numeric>{r.total}</AdminTd>
 *         </AdminTr>
 *       ))}
 *     </AdminTbody>
 *   </AdminTable>
 */

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function AdminTable({
  minWidth,
  children,
}: {
  minWidth?: string;
  children: ReactNode;
}) {
  return (
    <div className="card-panel overflow-x-auto">
      <table className={cx("w-full text-left text-sm", minWidth)}>{children}</table>
    </div>
  );
}

export function AdminThead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-border bg-neutral-50">
      <tr>{children}</tr>
    </thead>
  );
}

export function AdminTh({
  children,
  align = "left",
  className,
}: {
  children?: ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <th
      className={cx(
        "px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </th>
  );
}

export function AdminTbody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

export function AdminTr({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <tr className={cx("hover:bg-neutral-50", className)}>{children}</tr>;
}

export function AdminTd({
  children,
  numeric = false,
  className,
}: {
  children?: ReactNode;
  numeric?: boolean;
  className?: string;
}) {
  return (
    <td className={cx("px-4 py-3", numeric && "text-right tabular-nums", className)}>
      {children}
    </td>
  );
}

export function AdminTableEmpty({
  colSpan,
  children,
}: {
  colSpan: number;
  children: ReactNode;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-12 text-center text-muted">
        {children}
      </td>
    </tr>
  );
}
