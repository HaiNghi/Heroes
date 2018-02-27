import variable from './../variables/platform';

export default (variables = variable) => {
	const rightTheme = {
		'NativeBase.Button': {
			alignSelf: null,
		},
		flex: 0.5,
		alignSelf: 'center',
		alignItems: 'flex-end',
	};

	return rightTheme;
};
