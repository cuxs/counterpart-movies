import { Movie } from "@/App"
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { useMovies } from "../hooks/useMovies"
import { DataTablePagination } from "./pagination"
import { Skeleton } from "./ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const movieColumns: ColumnDef<Movie>[] = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'year', header: 'Year' },
  { accessorKey: 'genre', header: "Genre" },
]

export function MoviesTable<TData, TValue>({
}) {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: moviesData, loading } = useMovies<TData>(pagination)

  const data = useMemo(() => {
    return moviesData && typeof moviesData === 'object' && 'results' in moviesData && Array.isArray(moviesData.results) ? moviesData.results : [];
  }, [moviesData]);

  const rowCount = useMemo<number | undefined>(() => {
    return moviesData && typeof moviesData === 'object' && 'count' in moviesData ? moviesData.count as number | undefined : undefined;
  }, [moviesData]);


  const table = useReactTable({
    rowCount,
    data,
    columns: movieColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      setPagination(old => {
        const newPaginationValue = updater instanceof Function ? updater(old) : updater;
        return newPaginationValue;
      });
    }
  })
  return (
    <div className="flex flex-col gap-5 rounded-md border m-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        {loading ? <TableBody>
          <TableCell>
            <Skeleton className="w-32 h-8 mb-4" />
            <Skeleton className="w-32 h-8 mb-4" />
            <Skeleton className="w-32 h-8 mb-4" />
            <Skeleton className="w-32 h-8 mb-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-32 h-8 mb-4" />
            <Skeleton className="w-32 h-8 mb-4" />
            <Skeleton className="w-32 h-8 mb-4" />
            <Skeleton className="w-32 h-8 mb-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-32 h-8 mb-4" />
            <Skeleton className="w-32 h-8 mb-4" />
            <Skeleton className="w-32 h-8 mb-4" />
            <Skeleton className="w-32 h-8 mb-4" />
          </TableCell>
        </TableBody>
          : <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>}
      </Table>
      <DataTablePagination table={table} />
    </div>
  )
}