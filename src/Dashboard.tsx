import React, { useContext, useEffect } from 'react'
import { Navbar, NavbarText, Nav, Button } from 'reactstrap';
import { useHistory } from 'react-router';
import userContext from './userContext';
import { getUser } from './api';
import { deleteAllCookies } from './util/cookie';


const Dashboard = () => {
    const userCtx = useContext(userContext);
    const history = useHistory();

    useEffect(() => {
        getUser().then(userFromAPI => {
            userCtx?.setUser(userFromAPI);
        });
    }, [userCtx]);

    const logout = () => {
        deleteAllCookies();
        history.push('/');
    }

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <Nav>
                    <NavbarText className="p-2">
                        {userCtx?.user.firstName}
                    </NavbarText>
                    <NavbarText className="p-2">
                        {userCtx?.user.lastName}
                    </NavbarText>
                </Nav>
                <Button onClick={logout} color="danger">Log Out</Button>
            </Navbar>
        </div>
    )
}

export default Dashboard;