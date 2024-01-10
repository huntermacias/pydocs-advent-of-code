import * as React from "react";
import { cn } from "@/lib/utils";

// Main Table Component
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-x-auto shadow-lg shadow-[#5651e5]/50">
      <table
        ref={ref}
        className={cn("w-full text-sm text-gray-300 bg-[#0d0d0d] table-auto border border-[#2e2e2e] rounded-xl", className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

// Table Header Section
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("text-[#7f7fff] bg-[#121212] border-b border-[#343434]", className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

// Table Body Section
const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("divide-y divide-[#343434]", className)} {...props} />
  )
);
TableBody.displayName = "TableBody";

// Table Row
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "transition duration-300 ease-in-out hover:bg-[#1a1a1a] hover:text-[#a3bffa]",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

// Table Header Cell
const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "px-6 py-3 text-left align-middle font-semibold border-b border-[#343434]",
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

// Table Cell
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("px-6 py-3 align-middle", className)}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

// Table Caption
const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn("py-4 text-2xl font-bold tracking-wider text-[#dab6ff] bg-[#111111] rounded-t-xl", className)}
      {...props}
    />
  )
);
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};