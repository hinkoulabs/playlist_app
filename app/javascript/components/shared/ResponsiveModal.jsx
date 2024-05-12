import React from 'react';
import {Modal} from 'react-bootstrap';

const ResponsiveModal = ({show, onHide, title, header, children}) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" className="responsive-modal">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body-header">
                    {header}
                </div>
                <div className="modal-body-description">
                    { children }
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ResponsiveModal;