import React from 'react';
import {
	TextField as MuiTextField,
} from '@material-ui/core';

export default ({
	label,
	id,
	field,
	multiline = false,
}) => (
	<MuiTextField
		fullWidth
		multiline={multiline}
		{...field}
		id={id}
		label={label}
	/>
);
