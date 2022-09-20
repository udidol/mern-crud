import { useState } from 'react';
import PropTypes from 'prop-types';

export default function AddItemModal( { onSubmit, hideModal } ) {
	const [ item, setItem ] = useState( '' );

	const handleSubmit = ( e ) => {
		const itemToAdd = {
			name: item,
			checked: false,
		};

		e.preventDefault();
		setItem( '' );
		onSubmit( itemToAdd );
		hideModal( e );
	};

	return (
		<div className="modal-background" onClick={ hideModal }>
			<div className="modal-content" onClick={ e => e.stopPropagation() }>
				<form onSubmit={ handleSubmit }>
					<input
						type="text"
						placeholder="Item"
						value={ item }
						onChange={ ( e ) => setItem( e.target.value ) }
					/>
					<button type="submit">Add</button>
				</form>
			</div>
			<div className="close-modal" onClick={ hideModal }>x</div>
		</div>
	);
}

AddItemModal.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	hideModal: PropTypes.func.isRequired
};