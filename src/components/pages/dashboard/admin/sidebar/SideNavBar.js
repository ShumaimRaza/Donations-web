import React, {useState} from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
    MDBRipple,
    MDBBadge,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';

import "./SideNavBar.css"
import {useAuth} from "../../../../../context/AuthContext";
import {useLocation, useNavigate, useNavigation} from "react-router-dom";

export default function SideNavBar() {
    const [showShow, setShowShow] = useState(true);
    const {pathname} = useLocation();
    const {currentUser, logout} = useAuth();
    const toggleShow = () => setShowShow(!showShow);


    const isActive = (linkPath) => {
        return pathname === linkPath;
    };

    function isManager() {
        return currentUser.role === "Manager"
    }

    function isNGO() {
        return currentUser.role === "NGO"
    }

    return (
        <>
            <link
                href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
                rel="stylesheet"
            />
            <MDBCollapse show={showShow} tag="nav" className="d-lg-block bg-white sidebar collapse" >
                <div className="position-sticky">
                    <MDBListGroup flush className="mx-3" style={{marginTop: "50px"}}>
                        <MDBRipple rippleTag='span'>
                            <MDBListGroupItem tag='a' href='/dashboard' action
                                              className='border-0 border-bottom rounded rounded'>
                                <MDBIcon fas icon="tachometer-alt me-3 p-3"/>
                                Main Dashboard
                            </MDBListGroupItem>
                        </MDBRipple>

                        <MDBRipple rippleTag='span'>
                            <MDBListGroupItem tag='a' href={'/dashboard'} active={isActive("/dashboard")} action
                                              className='border-0 border-bottom rounded'>
                                <MDBIcon fas icon="calendar me-3 p-3"/>
                                Analytics
                            </MDBListGroupItem>
                        </MDBRipple>

                        {isManager() && <MDBRipple rippleTag='span'>
                            <MDBListGroupItem tag='a' href='/dashboard/ngos' active={isActive("/dashboard/ngos")} action
                                              className='border-0 border-bottom rounded' aria-current='true'>
                                <MDBIcon fas icon="chart-area me-3 p-3"/>
                                NGOs
                            </MDBListGroupItem>
                        </MDBRipple>}

                        <MDBRipple rippleTag='span'>
                            <MDBListGroupItem tag='a'
                                              href={isManager() ? '/dashboard/campaigns' : '/dashboard/my/campaigns'}
                                              active={isActive("/dashboard/campaigns")} action
                                              className='border-0 border-bottom rounded'>
                                <MDBIcon fas icon="lock me-3 p-3"/>
                                Campaigns
                            </MDBListGroupItem>
                        </MDBRipple>

                        {isManager() && <>

                            <MDBRipple rippleTag='span'>
                                <MDBListGroupItem tag='a' href='/dashboard/add-ngo'
                                                  active={isActive("/dashboard/add-ngo")}
                                                  action
                                                  className='border-0 border-bottom rounded'>
                                    <MDBIcon fas icon="chart-line me-3 p-3"/>
                                    Approve NGO
                                </MDBListGroupItem>
                            </MDBRipple>
                            <MDBRipple rippleTag='span'>
                                <MDBListGroupItem tag='a' href={'/dashboard/donations'}
                                                  active={isActive("/dashboard/donations")} action
                                                  className='border-0 rounded'>
                                    <MDBIcon fas icon="money-bill me-3 p-3"/>
                                    Donations
                                </MDBListGroupItem>
                            </MDBRipple>
                        </>
                        }

                        {isNGO() && <MDBRipple rippleTag='span'>
                            <MDBListGroupItem tag='a' href='/dashboard/create/campaign'
                                              active={isActive("/dashboard/create/campaign")}
                                              action
                                              className='border-0 border-bottom rounded'>
                                <MDBIcon fas icon="chart-line me-3 p-3"/>
                                New Campaign
                            </MDBListGroupItem>
                        </MDBRipple>
                        }
                    </MDBListGroup>
                </div>
            </MDBCollapse>

            <MDBNavbar expand='lg' light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarNav className="d-flex flex-row align-items-center w-auto">
                        <MDBNavbarToggler
                            type='button'
                            aria-label='Toggle navigation'
                            onClick={toggleShow}
                        >
                            <MDBIcon icon='bars' fas/>
                        </MDBNavbarToggler>
                        <MDBNavbarBrand href='#'>
                            {/*Add logo here*/}
                        </MDBNavbarBrand>
                    </MDBNavbarNav>
                    
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}