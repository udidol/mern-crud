import { useState, useEffect } from 'react';
import config from './config';

import Checkbox from './components/Checkbox';
import AddItemModal from './components/AddItemModal';

export default function ShoppingList() {
	const [ items, setItems ] = useState( [] );
	const [ showAddItemModal, setShowAddItemModal ] = useState( false );

	useEffect( () => {
		const fetchList = async () => {
			await fetch( config.serverURL + '/api/list' )
				.then( res => res.json() )
				.then( data => setItems( data ) );
		};

		fetchList();
	}, [] );

	const deleteItem = async ( index, id ) => {
		await fetch( config.serverURL + '/api/delete-item', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( { id } )
		} );

		const newList = items.filter( ( listItem, i ) => i !== index );

		setItems( newList );
	};

	const addItem = async ( item ) => {
		await fetch( config.serverURL + '/api/add-item', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( { item } )
		} );

		setItems( [ ...items, item ] );
	};

	const updateItem = async ( index, item ) => {
		await fetch( config.serverURL + '/api/update-item', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( item )
		} );

		const newList = items.map( ( listItem, i ) => {
			if ( i === index ) {
				listItem = item;
			}

			return listItem;
		} );

		setItems( newList );
	};

	const checkItem = async ( index ) => {
		await updateItem( index, { ...items[ index ], checked: ! items[ index ].checked } );
	};

	const hideAddItemModal = ( e ) => {
		e.stopPropagation();

		setShowAddItemModal( false );
	};

	return (
		<>
			<div className="shopping-list">
				{ items.length
					?
					items.map( ( item, i ) => {
						return (
							<div className="shopping-list-item" key={ i }>
								<Checkbox checked={ item.checked } onChange={ () => checkItem( i ) } />
								{ item.name }
								<div className="shopping-list-item-delete" onClick={ () => deleteItem( i, item._id ) }>x</div>
							</div>
						); } )
					:
					<div className="shopping-list-item">No items</div> }
			</div>
			<div className="shopping-list-footer">
				<div className="shopping-list-add-item" onClick={ () => setShowAddItemModal( ! showAddItemModal ) }>Add Item</div>
			</div>
			{ showAddItemModal && <AddItemModal onSubmit={ addItem } hideModal={ hideAddItemModal }/> }
		</>
	);
}