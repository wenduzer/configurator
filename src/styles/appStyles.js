export default theme => ({
	'@global': {
		'body': {
			'margin': 0,
			'padding': 0,
			'outline': 'none',
			'background': theme.palette.background.default,
		},
		'body, html, #root': {
			'width': '100%',
			'position': 'relative',
			'height': '100%',
			'overflowX': 'hidden',
			'overflowY': 'auto',
		},
	},
	'appRoot': {
		'width': '1200px',
		'margin': '64px auto',
		'@media (max-width: 1200px)': {
			'paddingTop': '56px',
			'width': '100%',
			'margin': 0,
		},
	},
});
