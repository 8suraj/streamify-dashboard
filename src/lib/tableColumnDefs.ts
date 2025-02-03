import { CustomColumnDef } from '../components/datagridTable/datagridTable';
import { ISongData } from './types/table';

export const songDataColumns: CustomColumnDef<ISongData>[] = [
	{
		header: 'Song Name',
		accessorKey: 'songName',
		meta: { filterVariant: '', align: 'left' },
	},
	{
		header: 'Artist',
		accessorKey: 'artist',
		meta: { filterVariant: '', align: 'left' },
	},
	{
		header: 'Date Streamed',
		accessorKey: 'dateStreamed',
		meta: { filterVariant: '', align: 'left' },
	},
	{
		header: 'Stream Count',
		accessorKey: 'streamCount',
		meta: { filterVariant: 'range', align: 'right' },
	},

	{
		header: 'User ID',
		accessorKey: 'userId',
		meta: { filterVariant: '', align: 'right' },
	},
];
