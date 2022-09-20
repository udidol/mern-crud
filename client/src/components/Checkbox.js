import PropTypes from 'prop-types';

export default function Checkbox( props ) {
	const { checked, onChange } = props;

	return (
		<input
			className="checkbox"
			type="checkbox"
			checked={ checked }
			onChange={ onChange }
		/>
	);
}

Checkbox.propTypes = {
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired
};