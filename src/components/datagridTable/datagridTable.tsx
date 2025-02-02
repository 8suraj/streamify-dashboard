import { useEffect, useRef, useState } from 'react';
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	SortingState,
	getPaginationRowModel,
	getFilteredRowModel,
	ColumnFiltersState,
	ColumnDef,
} from '@tanstack/react-table';
import DataGridTableHeader from './datagridTableheader';
import Pagination from '@mui/material/Pagination';

export type CustomColumnDef<T> = ColumnDef<T, unknown> & {
	meta: {
		align: 'left' | 'right' | 'center';
		label?: string;
		filterVariant?: string;
	};
};
export default function DatagridTable<T>({
	data,
	columns,
	stickyHeader = false,
	isSortingEnabled = false,
	isFilterEnabled = false,
	isPaginationEnabled = false,
}: {
	data: T[];
	columns: CustomColumnDef<T>[];
	stickyHeader?: boolean;
	isSortingEnabled?: boolean;
	isFilterEnabled?: boolean;
	isPaginationEnabled?: boolean;
}) {
	const [page, setPage] = useState(1);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	// const [itemCount, setItemCount] = useState(itemsTodisplay);
	// Automatically add selection column if row selection is enabled

	const table = useReactTable<T>({
		data,
		columns: columns,
		state: { sorting, columnFilters },
		enableColumnFilters: isFilterEnabled,
		enableSorting: isSortingEnabled,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getPaginationRowModel: isPaginationEnabled
			? getPaginationRowModel()
			: undefined,
		onSortingChange: setSorting,
	});

	const getIsHeaderSticky = () =>
		`${stickyHeader ? 'datagridTable-pin-rows' : ''} datagridTable`;

	const getAlignmentClass = (align?: 'left' | 'right' | 'center') => {
		switch (align) {
			case 'right':
				return 'text-right';
			case 'center':
				return 'text-center';
			case 'left':
			default:
				return 'text-left';
		}
	};

	const tableRef = useRef<HTMLSpanElement>(null);

	const handleScroll = () => {
		if (tableRef.current) {
			tableRef.current.scrollIntoView({
				block: 'start',
			});
		}
	};
	useEffect(() => {
		table.setPageSize(10);
	}, []);
	return (
		<>
			<div className='datagridTable-container'>
				<table className={getIsHeaderSticky()}>
					<DataGridTableHeader
						table={table}
						getAlignmentClass={getAlignmentClass}
						isSortingEnabled={isSortingEnabled}
						isFilterEnabled={isFilterEnabled}
					/>
					<tbody>
						<span ref={tableRef} />
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => {
									const align = cell.column.columnDef.meta?.align || 'left';
									const alignmentClass = getAlignmentClass(align);

									return (
										<td key={cell.id} className={alignmentClass}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{isPaginationEnabled ? (
				<div className='datagridTable-pagination'>
					<div className=' datagridTable-pagination-itemcount'>
						<span>{table?.getFilteredRowModel()?.rows?.length} </span>
						of <span>{table?.getFilteredRowModel()?.rows?.length}</span> items
					</div>
					<Pagination
						count={table.getPageCount()}
						page={page}
						onChange={(_event, value) => {
							table.setPageIndex(value - 1);
							handleScroll();
							setPage(value);
						}}
						sx={{
							'& .MuiPaginationItem-root': {
								color: '#000',
							},
							'& .MuiPaginationItem-page.Mui-selected': {
								backgroundColor: '#ee5d19',
								color: '#000',
							},
							'& .MuiPaginationItem-page:hover': {
								backgroundColor: '#000',
							},
							'& .MuiPaginationItem-ellipsis': {
								color: '#000',
							},
						}}
					/>
				</div>
			) : null}
		</>
	);
}
