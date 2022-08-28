import React from 'react';
import Head from 'next/head';
import {Footer, Header} from '../../components/Main';
import {Accordion, Button, Card, Tab, Tabs} from 'react-bootstrap';

const Account = () => {
    return (
        <>
            <Head>
                <title>Аккаунт | KinoUz</title>
            </Head>
            <Header/>
            <main className="content">
                <div className="container">
                    <nav>
                        <Tabs
                            variant="pills"
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3 mynav"
                        >
                            <Tab eventKey="profile" title="Аккаунт и профили">
                                <div role="tabpanel" aria-labelledby="profile">
                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                         aria-labelledby="nav-home-tab">
                                        <div className="account-editing">
                                            <div className="input-group input-group-btn input-group-left-text mb-2">
                                                <span className="input-group-text">E-mail:</span>
                                                <input type="email" className="form-control"
                                                       value="arkein_gg@gmail.com"/>
                                                <button className="btn btn-edit btn-icon" type="button">изменить<span
                                                    className="icon icon-edit"></span></button>
                                            </div>
                                            <div className="input-group input-group-btn input-group-left-text mb-2">
                                                <span className="input-group-text">Пароль:</span>
                                                <input type="password" className="form-control" value="*************"/>
                                                <button className="btn btn-edit btn-icon" type="button">изменить<span
                                                    className="icon icon-edit"></span></button>
                                            </div>
                                            <div className="input-group input-group-btn input-group-left-text mb-4">
                                    <span className="input-group-text">Способы оплаты: <img src="img/dist/humo-logo.png"
                                                                                            alt="humo"/></span>
                                                <input type="email" className="form-control" value="**** **** 1212"/>
                                                <button className="btn btn-edit btn-icon" type="button"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#paymentModal">изменить<span
                                                    className="icon icon-edit"></span></button>
                                            </div>
                                            <div className="account-editing__balance">
                                                <span className="account-editing__balance-title">Баланс: </span>
                                                <span className="account-editing__balance-total">152 000</span>
                                                <span className="account-editing__balance-subscription">(стоимость абонненской платы 15 000 сум/месяц)</span>
                                            </div>
                                        </div>
                                        <h2 className="page-title fw-normal mb-35">Профили:</h2>
                                        <div className="profiles">
                                            <Accordion defaultActiveKey="0">
                                                <Accordion.Item className="profiles__item" eventKey="0">
                                                    <Accordion.Header>
                                                        <h2 className="profiles__header accordion-header flex-fill">
                                                            <div className="d-flex align-items-center pe-3">
                                                                <div className="profiles__profile accordion-profile">
                                                                    <div className="accordion-profile__ava">A</div>
                                                                    <div className="accordion-profile__text">
                                                                        <div className="accordion-profile__name">Arkein
                                                                        </div>
                                                                        <div className="accordion-profile__desc">без
                                                                            ворастных
                                                                            ограничений
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="profiles__editing">Редактировать</div>
                                                            </div>
                                                        </h2>
                                                    </Accordion.Header>
                                                    <Accordion.Body className="profiles__collapse">
                                                        <div className="profiles__body">
                                                            <div className="input-group input-group-btn mb-2">
                                                                <input type="email"
                                                                       className="form-control form-control-ico form-control-email"
                                                                       value="arkein_gg@gmail.com"/>
                                                                <button className="btn btn-edit btn-icon"
                                                                        type="button">изменить<span
                                                                    className="icon icon-edit"></span></button>
                                                            </div>
                                                            <div className="input-group input-group-radio mb-2">
                                                                <input type="text"
                                                                       className="form-control form-control-ico form-control-restrictions"
                                                                       value="Возрастные ограничения"/>
                                                                <input type="radio" className="btn-check" name="options"
                                                                       id="option1" autoComplete="off"/>
                                                                <label className="btn"
                                                                       htmlFor="option1">Применить</label>
                                                                <input type="radio" className="btn-check" name="options"
                                                                       id="option2" autoComplete="off" checked/>
                                                                <label className="btn" htmlFor="option2">Не
                                                                    применять</label>
                                                            </div>
                                                            <div className="input-group input-group-btn mb-2">
                                                                <input type="password"
                                                                       className="form-control form-control-ico form-control-password"
                                                                       value="" placeholder="**********"/>
                                                            </div>

                                                            <div className="input-group input-group-radio">
                                                                <button type="submit"
                                                                        className="btn btn-secondary rounded-pill btn-icon-left"><span
                                                                    className="icon icon-delete"></span>Удалить профиль
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>
                                                        <h2 className="profiles__header accordion-header flex-fill">
                                                            <div className="d-flex align-items-center pe-3">
                                                                <div className="profiles__profile accordion-profile">
                                                                    <div className="accordion-profile__ava">A</div>
                                                                    <div className="accordion-profile__text">
                                                                        <div className="accordion-profile__name">Arkein
                                                                        </div>
                                                                        <div className="accordion-profile__desc">без
                                                                            ворастных
                                                                            ограничений
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="profiles__editing">Редактировать</div>
                                                            </div>
                                                        </h2>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <div className="profiles__collapse">
                                                            <div className="profiles__body">
                                                                <div className="input-group input-group-btn mb-2">
                                                                    <input type="email"
                                                                           className="form-control form-control-ico form-control-email"
                                                                           value="arkein_gg@gmail.com"/>
                                                                    <button className="btn btn-edit btn-icon"
                                                                            type="button">изменить<span
                                                                        className="icon icon-edit"></span></button>
                                                                </div>
                                                                <div className="input-group input-group-radio mb-4">
                                                                    <input type="text"
                                                                           className="form-control form-control-ico form-control-restrictions"
                                                                           value="Возрастные ограничения"/>
                                                                    <input type="radio" className="btn-check"
                                                                           name="options1"
                                                                           id="option11" autoComplete="off"/>
                                                                    <label className="btn"
                                                                           htmlFor="option11">Применить</label>
                                                                    <input type="radio" className="btn-check"
                                                                           name="options1"
                                                                           id="option12" checked autoComplete="off"/>
                                                                    <label className="btn" htmlFor="option12">Не
                                                                        применять</label>
                                                                </div>
                                                                <button type="submit"
                                                                        className="btn btn-secondary rounded-pill btn-icon-left"><span
                                                                    className="icon icon-delete"></span>Удалить профиль
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>

                                        <div className="add-new-profile">
                                            <button className="btn btn-add mb-4" type="button"><span
                                                className="ico-plus"></span>Добавить
                                                профиль
                                            </button>
                                            <div className="content-blue-body">
                                                <div className="mb-2">
                                                    <input type="text"
                                                           className="form-control form-control-ico form-control-user"
                                                           placeholder="Имя"/>
                                                </div>
                                                <div className="mb-2">
                                                    <input type="email"
                                                           className="form-control form-control-ico form-control-email"
                                                           placeholder="E-mail"/>
                                                </div>
                                                <div className="input-group input-group-radio mb-4">
                                                    <input type="text"
                                                           className="form-control form-control-ico form-control-restrictions"
                                                           value="Возрастные ограничения"/>
                                                    <input type="radio" className="btn-check" name="options2"
                                                           id="option21"
                                                           autoComplete="off"/>
                                                    <label className="btn" htmlFor="option21">Применить</label>
                                                    <input type="radio" className="btn-check" name="options2"
                                                           id="option22"
                                                           checked autoComplete="off"/>
                                                    <label className="btn" htmlFor="option22">Не применять</label>
                                                </div>
                                                <div className="row g-3">
                                                    <div className="col-auto">
                                                        <button type="submit"
                                                                className="btn btn-secondary rounded-pill btn-icon-left">
                                                            <span className="icon icon-cancel"></span>Отмена
                                                        </button>
                                                    </div>
                                                    <div className="col-auto">
                                                        <button type="submit"
                                                                className="btn btn-primary rounded-pill btn-icon-left">
                                                            <span className="icon icon-check_circle"></span>Создать
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="nav-profile" role="tabpanel"
                                         aria-labelledby="nav-profile-tab">
                                        <p>Placeholder content for the tab panel. This one relates to the profile tab.
                                            You got
                                            the
                                            finest architecture. Passport stamps, she's cosmopolitan. Fine, fresh,
                                            fierce, we
                                            got it
                                            on lock. Never planned that one day I'd be losing you. She eats your heart
                                            out. Your
                                            kiss is cosmic, every move is magic. I mean the ones, I mean like she's the
                                            one.
                                            Greetings loved ones let's take a journey. Just own the night like the 4th
                                            of July!
                                            But
                                            you'd rather get wasted.</p>
                                    </div>
                                    <div className="tab-pane fade" id="nav-contact" role="tabpanel"
                                         aria-labelledby="nav-contact-tab">
                                        <p>Placeholder content for the tab panel. This one relates to the contact tab.
                                            Her love
                                            is
                                            like a drug. All my girls vintage Chanel baby. Got a motel and built a fort
                                            out of
                                            sheets. 'Cause she's the muse and the artist. (This is how we do) So you
                                            wanna play
                                            with
                                            magic. So just be sure before you give it all to me. I'm walking, I'm
                                            walking on air
                                            (tonight). Skip the talk, heard it all, time to walk the walk. Catch her if
                                            you can.
                                            Stinging like a bee I earned my stripes.</p>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="payment" title="Оплата">
                                <div role="tabpanel" aria-labelledby="payment">
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="nav mynav mb-3" id="nav-tab1" role="tablist">
                                            <div className="alert alert-primary alert-dismissible fade show"
                                                 role="alert">
                                                При оплате седства попадают на баланс аккаунта после чего Вы можете
                                                приобрести
                                                подписку.
                                                <button type="button" className="btn-close" data-bs-dismiss="alert"
                                                        aria-label="Close"></button>
                                            </div>
                                            <a className="active btn btn-primary" id="click" data-bs-toggle="tab"
                                               href="#nav-click"
                                               role="tab" aria-controls="nav-click" aria-selected="true"
                                               style={{background: 'none', border: 'none'}}>
                                                <img src="/img/images/click.png"
                                                     style={{maxHeight: '50px', width: '100%'}}/>
                                            </a>
                                            <a className="btn btn-primary" id="nav-payme-tab" data-bs-toggle="tab"
                                               href="#nav-payme"
                                               role="tab" aria-controls="nav-payme" aria-selected="false"
                                               style={{background: 'none', border: 'none'}}>
                                                <img src="img/images/payme.png"
                                                     style={{maxHeight: '50px', width: '100%'}}/>
                                            </a>
                                        </div>
                                        <div className="tab-pane fade show active" id="nav-click" role="tabpanel"
                                             aria-labelledby="nav-click-tab">
                                            <br/>
                                            <form action="/" method="post" className="forms">
                                                <input className="form-control form-control" type="" name="" value=""
                                                       placeholder="введите сумму для оплаты"/>
                                                <button type="submit" className="btn btn-primary">Оплатить</button>
                                            </form>
                                        </div>
                                        <div className="tab-pane fade" id="nav-payme" role="tabpanel"
                                             aria-labelledby="nav-payme-tab">
                                            <br/>
                                            <form action="/" method="post" className="forms">
                                                <input className="form-control form-control" type="" name="" value=""
                                                       placeholder="введите сумму для оплаты"/>
                                                <button type="submit" className="btn btn-primary">Оплатить</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="history" title="История платежей">
                                <div role="tabpanel" aria-labelledby="history">
                                    <div className="tab-content" id="nav-tabContent">
                                        <div className="alert alert-success" role="alert">
                                            <h6 className="alert-heading">02.08.2022г.</h6>
                                            <p>пополнение аккаунта на 30 000 сум.</p>
                                            <hr/>
                                            <p className="mb-0"><b>Тариф: </b>Зарубежное кино - 30 000 сум.</p>
                                        </div>
                                        <div className="alert alert-success" role="alert">
                                            <h6 className="alert-heading">02.08.2022г.</h6>
                                            <p>пополнение аккаунта на 20 000 сум.</p>
                                            <hr/>
                                            <p className="mb-0"><b>Тариф: </b>Мультсериалы - 30 000 сум.</p>
                                        </div>
                                        <div className="alert alert-success" role="alert">
                                            <h6 className="alert-heading">02.08.2022г.</h6>
                                            <p>пополнение аккаунта на 30 000 сум.</p>
                                            <hr/>
                                            <p className="mb-0"><b>Тариф: </b>Амедиатека - 30 000 сум.</p>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="subscriptions" title="Мои подписки">
                                <div id="nav-4" role="tabpanel" aria-labelledby="subscriptions">
                                    <Card
                                        style={{background: 'url(http://155822.selcdn.ru/upload-8bfeca17cf9a3316f68775e6b5e44259/iblock/c7e/750x485.jpeg) 0 0 no-repeat;'}}
                                    >
                                        <Card.Header>
                                            30 дней за 17000 сум
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>Мультсериалы</Card.Title>
                                            <Card.Text>Мировые хиты и блокбастеры производства HBO, CBS и
                                                других
                                                от
                                                сервиса Amediateka.ru</Card.Text>
                                            <a href="#" className="btn btn-primary me-1">Купить</a>
                                            <Button variant='primary' disabled>Активный</Button>
                                        </Card.Body>
                                        <Card.Footer>
                                            до 02.08.2022г.
                                        </Card.Footer>
                                    </Card>
                                    <Card
                                        style={{background: 'url(http://155822.selcdn.ru/upload-8bfeca17cf9a3316f68775e6b5e44259/iblock/c7e/750x485.jpeg) 0 0 no-repeat;'}}
                                    >
                                        <Card.Header>
                                            30 дней за 17000 сум
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>Amediateka</Card.Title>
                                            <Card.Text>Мировые хиты и блокбастеры производства HBO, CBS и
                                                других
                                                от
                                                сервиса Amediateka.ru</Card.Text>
                                            <a href="#" className="btn btn-primary me-1">Купить</a>
                                            <Button variant='primary' disabled>Активный</Button>
                                        </Card.Body>
                                        <Card.Footer>
                                            до 02.08.2022г.
                                        </Card.Footer>
                                    </Card>
                                    <Card
                                        style={{background: 'url(https://www.apple.com/tv-pr/articles/2022/03/apple-original-films-to-premiere-exhilarating-slate-of-new-films-from-award-winning-storytellers-in-2022-and-beyond/images/big-image/big-image-01/030822_Apple_Original_Films_Premiere_New_Films_in_2022_Argylle_big_image_post.jpg.large.jpg) 0 0 no-repeat;'}}
                                    >
                                        <Card.Header className="card-header">
                                            30 дней за 17000 сум
                                        </Card.Header>
                                        <Card.Body className="card-body">
                                            <Card.Title>Amediateka</Card.Title>
                                            <Card.Text>Мировые хиты и блокбастеры производства HBO, CBS и
                                                других
                                                от
                                                сервиса Amediateka.ru</Card.Text>
                                            <a href="#" className="btn btn-primary me-1">Купить</a>
                                            <Button variant='primary' disabled>Активный</Button>
                                        </Card.Body>
                                        <Card.Footer>
                                            до 02.08.2022г.
                                        </Card.Footer>
                                    </Card>

                                </div>
                            </Tab>
                        </Tabs>
                    </nav>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Account