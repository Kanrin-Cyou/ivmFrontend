import React from 'react';
import './CollectionItem.style.scss';

const CollectionItem = ({id,category,description,price,title,image}) => (
    <div className='collection-item flex-fill'>
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item category">{category}</li>
                <li className="list-group-item title">{title}</li>
                {/* <li className="list-group-item description">{description}</li> */}
                <li className="list-group-item price">{price}</li>
            </ul>
    </div>
);

export default CollectionItem;