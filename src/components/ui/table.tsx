import * as React from "react";
import { cn } from "@/lib/utils";

// Main Table Component
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-x-auto shadow-lg shadow-indigo-400">
      <table
        ref={ref}
        className={cn("w-full text-sm bg-gray-950 text-[#D4D4D4] table-auto border-2 border-indigo-600", className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

// Table Header Section
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("text-[#9CDCFE]", className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

// Table Body Section
const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn(className)} {...props} />
  )
);
TableBody.displayName = "TableBody";

// Table Row
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-cyan-600/20 transition duration-300 ease-in-out hover:bg-[#142a39] hover:text-white",
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
        "px-4 py-2 text-left align-middle font-semibold border-b border-gray-700",
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
      className={cn("px-4 py-2 align-middle", className)}
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
      className={cn("py-2 text-xl tracking-wider font-medium text-indigo-600", className)}
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
