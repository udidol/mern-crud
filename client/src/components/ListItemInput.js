import PropTypes from 'prop-types';

export default function ListItemInput( props ) {
	return (
		<input
			type="text"
			value={ props.value }
			onChange={ props.onChange }
			onBlur={ props.onBlur }
		/>
	);
}

ListItemInput.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired
};