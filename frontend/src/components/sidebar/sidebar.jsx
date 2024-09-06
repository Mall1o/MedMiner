import React from 'react';
import './sidebar.css';
import { FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="avatar-section">
                <img src='/assets/images/avatars/avatar_2.jpg' alt="Avatar" className="avatar" />
                <span className="avatar-text">Dottore</span>
            </div>
            <div className="menu-section">
                <a href="#" className="menu-item active">Dashboard</a>
                <a href="#" className="menu-item">
                    Pazienti
                    <span className="badge">+3</span>
                </a>
                <a href="#" className="menu-item">Altre pagine boh</a>
            </div>
            <div className="logout-section">
                <a href="#" className="menu-item logout-item">
                    <FaSignOutAlt className="logout-icon" />
                    Logout
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
