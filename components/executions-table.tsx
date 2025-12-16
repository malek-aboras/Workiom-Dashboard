"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
  ColumnDef,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  Search,
  Filter,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { AutomationExecution, AutomationStatus } from "@/lib/types";
import * as XLSX from "xlsx";

interface ExecutionsTableProps {
  data: AutomationExecution[];
}

export default function ExecutionsTable({ data }: ExecutionsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "automationExecutionDateTime", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // Filter states
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // Get unique values for filters
  const uniqueApps = useMemo(
    () => Array.from(new Set(data.map((d) => d.automationAppName))).sort(),
    [data]
  );

  const uniqueLists = useMemo(
    () => Array.from(new Set(data.map((d) => d.automationListName))).sort(),
    [data]
  );

  // Apply custom filters
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // App filter
      if (selectedApps.length > 0 && !selectedApps.includes(row.automationAppName)) {
        return false;
      }

      // List filter
      if (selectedLists.length > 0 && !selectedLists.includes(row.automationListName)) {
        return false;
      }

      // Status filter
      if (selectedStatus !== "all" && row.automationStatus !== selectedStatus) {
        return false;
      }

      // Date range filter
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        if (row.automationExecutionDateTime < fromDate) {
          return false;
        }
      }

      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (row.automationExecutionDateTime > toDate) {
          return false;
        }
      }

      return true;
    });
  }, [data, selectedApps, selectedLists, selectedStatus, dateFrom, dateTo]);

  const columns = useMemo<ColumnDef<AutomationExecution>[]>(
    () => [
      {
        accessorKey: "automationId",
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1 font-semibold hover:text-primary"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Automation ID
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 opacity-50" />
              )}
            </button>
          );
        },
        cell: ({ row }) => (
          <span className="font-mono text-sm">{row.original.automationId}</span>
        ),
      },
      {
        accessorKey: "automationName",
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1 font-semibold hover:text-primary"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Automation Name
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 opacity-50" />
              )}
            </button>
          );
        },
      },
      {
        accessorKey: "automationAppName",
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1 font-semibold hover:text-primary"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              App Name
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 opacity-50" />
              )}
            </button>
          );
        },
      },
      {
        accessorKey: "automationListName",
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1 font-semibold hover:text-primary"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              List Name
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 opacity-50" />
              )}
            </button>
          );
        },
      },
      {
        accessorKey: "automationExecutionDateTime",
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1 font-semibold hover:text-primary"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Execution Date & Time
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 opacity-50" />
              )}
            </button>
          );
        },
        cell: ({ row }) => {
          return format(
            row.original.automationExecutionDateTime,
            "MMM dd, yyyy HH:mm:ss"
          );
        },
        sortingFn: (rowA, rowB) => {
          const dateA = rowA.original.automationExecutionDateTime.getTime();
          const dateB = rowB.original.automationExecutionDateTime.getTime();
          return dateA - dateB;
        },
      },
      {
        accessorKey: "automationStatus",
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1 font-semibold hover:text-primary"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Status
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 opacity-50" />
              )}
            </button>
          );
        },
        cell: ({ row }) => {
          const status = row.original.automationStatus;
          const variant =
            status === "Success"
              ? "success"
              : status === "Failed"
              ? "error"
              : "warning";
          return <Badge variant={variant}>{status}</Badge>;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 100,
      },
    },
  });

  const handleExport = () => {
    const exportData = table.getFilteredRowModel().rows.map((row) => ({
      "Automation ID": row.original.automationId,
      "Automation Name": row.original.automationName,
      "App Name": row.original.automationAppName,
      "List Name": row.original.automationListName,
      "Execution Date & Time": format(
        row.original.automationExecutionDateTime,
        "yyyy-MM-dd HH:mm:ss"
      ),
      Status: row.original.automationStatus,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Automation Executions");

    const dateRange =
      dateFrom && dateTo
        ? `${dateFrom}_to_${dateTo}`
        : format(new Date(), "yyyy-MM-dd");
    XLSX.writeFile(workbook, `automation_executions_${dateRange}.xlsx`);
  };

  const clearFilters = () => {
    setSelectedApps([]);
    setSelectedLists([]);
    setSelectedStatus("all");
    setDateFrom("");
    setDateTo("");
    setGlobalFilter("");
  };

  const activeFiltersCount =
    selectedApps.length +
    selectedLists.length +
    (selectedStatus !== "all" ? 1 : 0) +
    (dateFrom ? 1 : 0) +
    (dateTo ? 1 : 0);

  const toggleAppFilter = (app: string) => {
    setSelectedApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  };

  const toggleListFilter = (list: string) => {
    setSelectedLists((prev) =>
      prev.includes(list) ? prev.filter((l) => l !== list) : [...prev, list]
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Detailed Execution Records</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Showing {table.getFilteredRowModel().rows.length.toLocaleString()} of{" "}
              {data.length.toLocaleString()} executions
            </p>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export to Excel
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary">{activeFiltersCount} active</Badge>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search all fields..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Date From */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Date From
              </label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            {/* Date To */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Date To
              </label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Status
              </label>
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Success with Warning">Success with Warning</option>
              </Select>
            </div>
          </div>

          {/* Multi-select filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Apps */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-2 block">
                Applications ({selectedApps.length} selected)
              </label>
              <div className="border border-gray-200 rounded-lg p-3 max-h-40 overflow-y-auto">
                <div className="space-y-2">
                  {uniqueApps.map((app) => (
                    <label
                      key={app}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedApps.includes(app)}
                        onChange={() => toggleAppFilter(app)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{app}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Lists */}
            <div>
              <label className="text-xs font-medium text-gray-700 mb-2 block">
                Lists ({selectedLists.length} selected)
              </label>
              <div className="border border-gray-200 rounded-lg p-3 max-h-40 overflow-y-auto">
                <div className="space-y-2">
                  {uniqueLists.map((list) => (
                    <label
                      key={list}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLists.includes(list)}
                        onChange={() => toggleListFilter(list)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{list}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()} (
            {table.getFilteredRowModel().rows.length.toLocaleString()} total records)
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
