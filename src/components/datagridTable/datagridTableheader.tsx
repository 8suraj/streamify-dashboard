import { Column, HeaderGroup, Table } from '@tanstack/react-table';
import { DataGridTableFilter } from './datagridTableFilter';
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '../modal/Popover';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { flexRender } from '@tanstack/react-table';
import { SortIcon } from '../interactiveIcons/sortIcon';

interface DataGridTableHeaderProps<T> {
	table: Table<T>;
	getAlignmentClass: (align?: 'left' | 'right' | 'center') => string;
	isSortingEnabled: boolean;
	isFilterEnabled: boolean;
}

export default function DataGridTableHeader<T>({
	table,
	getAlignmentClass,
	isSortingEnabled,
	isFilterEnabled,
}: DataGridTableHeaderProps<T>) {
	const getPinnedColumnClass = (column: Column<T, unknown>) =>
		column.getIsPinned() ? 'datagridTable-pinnedColumn' : '';

	return (
		<thead>
			{table.getHeaderGroups().map((headerGroup: HeaderGroup<T>) => (
				<tr key={headerGroup.id}>
					{headerGroup.headers.map((header) => {
						const align = header.column.columnDef.meta?.align || 'left';
						const alignmentClass = getAlignmentClass(align);

						return (
							<th
								key={header.id}
								className={`${alignmentClass} cursor-pointer ${getPinnedColumnClass(
									header.column
								)}`}
							>
								<Popover>
									<div
										className={
											align === 'left' ? 'justify-start' : 'justify-end'
										}
									>
										<PopoverTrigger asChild>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
										</PopoverTrigger>
										{header.column.getCanSort() && (
											<SortIcon
												onClick={header.column.getToggleSortingHandler()}
												sortOrder={header.column.getIsSorted()}
											/>
										)}
									</div>

									{isSortingEnabled && (
										<PopoverContent>
											<div className='datagridTable-popover'>
												{isFilterEnabled && (
													<DataGridTableFilter column={header.column} />
												)}
												<PopoverClose
													className='datagridTable-popover-option'
													onClick={() => {
														header.column.clearSorting();
														if (Array.isArray(header.column.getFilterValue())) {
															header.column.setFilterValue([]);
														} else {
															header.column.setFilterValue('');
														}
													}}
												>
													<XMarkIcon className='size-6' /> Clear
												</PopoverClose>
											</div>
										</PopoverContent>
									)}
								</Popover>
							</th>
						);
					})}
				</tr>
			))}
		</thead>
	);
}
