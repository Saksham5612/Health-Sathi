import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useHealth } from '../../context/HealthContext';
import './UserMenu.css';

const UserMenu = () => {
  const { state, actions } = useHealth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    actions.toggleUserProfile(true);
    setShowDropdown(false);
  };

  const handleMenuToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  return (
    <div className="user-menu-container">
      <Dropdown show={showDropdown} onToggle={handleMenuToggle}>
        <Dropdown.Toggle 
          as="div" 
          className="user-avatar-container"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img 
            src={state.userProfile.photoUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="User Avatar" 
            className="user-avatar"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu className="user-dropdown-menu">
          <Dropdown.Item onClick={handleProfileClick}>
            <i className="fas fa-user"></i> Your Profile
          </Dropdown.Item>
          <Dropdown.Item>
            <i className="fas fa-file-upload"></i> Your Document
          </Dropdown.Item>
          <Dropdown.Item>
            <i className="fas fa-file-upload"></i> Upload Your Document
          </Dropdown.Item>
          <Dropdown.Item>
            <i className="fas fa-robot"></i> AI Insights
          </Dropdown.Item>
          <Dropdown.Item>
            <i className="fas fa-stethoscope"></i> Nearby Doctor
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <i className="fas fa-cog"></i> Settings
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserMenu;