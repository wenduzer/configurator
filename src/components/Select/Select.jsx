import React from 'react';
import {
	FormControl,
	MenuItem,
	InputLabel,
	Select as MuiSelect,
} from '@material-ui/core';

export default ({
	id,
	data,
	label,
	field,
	multiple,
}) => (
	<FormControl fullWidth>
		<InputLabel shrink={!!field.value} htmlFor={id}>{label}</InputLabel>
		<MuiSelect
			{...field}
			fullWidth
			id={id}
			multiple={multiple}
		>
			{data.map((item, key) => (
				<MenuItem value={item.id} key={key}>{item.text}</MenuItem>
			))}
		</MuiSelect>
	</FormControl>
);
