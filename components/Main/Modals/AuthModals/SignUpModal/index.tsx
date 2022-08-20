import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';

interface SignUpModalProps {

}

export const SignUpModal = (props: SignUpModalProps) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button variant="light" onClick={() => setShow(true)}>
                Пройти регистрацию
            </Button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="registrationModalLabel"
                id="registrationModal"
            >
                <Modal.Header closeButton>
                    <h5 className="modal-title" id="registrationModalLabel">Регистрация</h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="registration-modal">
                        <div className="registration-modal__form row gy-3">
                            <div className="col-12">
                                <input type="text"
                                       className="form-control form-control-ico form-control-user"
                                       placeholder="Имя"/>
                            </div>
                            <div className="col-12">
                                <input type="email"
                                       className="form-control form-control-ico form-control-email"
                                       placeholder="E-mail"/>
                            </div>
                            <div className="col-12">
                                <input type="password"
                                       className="form-control form-control-ico form-control-password"
                                       placeholder="Пароль"/>
                            </div>
                            <div className="col-12">
                                <input type="password"
                                       className="form-control form-control-ico form-control-password"
                                       placeholder="Повторите пароль"/>
                            </div>
                            <div className="col-12 d-grid">
                                <button className="btn btn-primary" type="button">Зарегистрироваться
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};