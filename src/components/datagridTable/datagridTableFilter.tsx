import { useEffect, useState, ChangeEvent } from 'react';
import { Column } from '@tanstack/react-table';

interface DataGridTableFilterProps<T> {
	column: Column<T, unknown>;
}

export function DataGridTableFilter<T>({
	column,
}: DataGridTableFilterProps<T>) {
	const columnFilterValue = column.getFilterValue() as string | number[];
	const { filterVariant } =
		(column.columnDef.meta as { filterVariant?: string }) ?? {};

	return filterVariant === 'range' ? (
		<div className='datagridTable-filter'>
			<h2 className='text-left text-white'>Filter</h2>
			<div className='datagridTable-filter-range'>
				<DebouncedInput
					className='datagridTable-filter-input'
					type='number'
					value={(columnFilterValue as number[])?.[0] ?? ''}
					onChange={(value) =>
						column.setFilterValue((old: number[] | undefined) => [
							value,
							old?.[1],
						])
					}
					placeholder='Min'
				/>
				<DebouncedInput
					className='datagridTable-filter-input'
					type='number'
					value={(columnFilterValue as number[])?.[1] ?? ''}
					onChange={(value) =>
						column.setFilterValue((old: number[] | undefined) => [
							old?.[0],
							value,
						])
					}
					placeholder='Max'
				/>
			</div>
		</div>
	) : (
		<>
			<DebouncedInput
				className='datagridTable-filter-input'
				type='text'
				value={(columnFilterValue as string) ?? ''}
				onChange={(value) => column.setFilterValue(value || undefined)}
				placeholder={`Search... `}
				list={column.id + 'list'}
			/>
		</>
	);
}

interface DebouncedInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
}

export function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	className = '',
	...props
}: DebouncedInputProps) {
	const [value, setValue] = useState<string | number>(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value, onChange, debounce]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue =
			props.type === 'number' ? Number(e.target.value) || 0 : e.target.value;
		setValue(inputValue);
	};

	return (
		<input
			{...props}
			value={value}
			onChange={handleChange}
			className={className}
		/>
	);
}
